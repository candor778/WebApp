import { createClient } from "@/lib/supabase/server"

/**
 * Generates a unique project ID in the format PRJ-<YEAR>-<N>
 * Uses Supabase to handle concurrent inserts safely
 */
export async function generateUniqueProjectId(maxRetries = 10): Promise<string> {
  const currentYear = new Date().getFullYear()
  const prefix = `PRJ-${currentYear}-`
  const supabase = await createClient()

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Find the highest sequence number for this year
      const { data: latestProject } = await supabase
        .from("projects")
        .select("project_id")
        .like("project_id", `${prefix}%`)
        .order("project_id", { ascending: false })
        .limit(1)
        .single()

      let nextSeq = 1
      if (latestProject) {
        // Extract the sequence number from project_id (e.g., "PRJ-2025-5" -> 5)
        const match = latestProject.project_id.match(/PRJ-\d+-(\d+)/)
        if (match) {
          nextSeq = Number.parseInt(match[1], 10) + 1
        }
      }

      const projectId = `${prefix}${nextSeq}`

      // Check if this project_id already exists (race condition check)
      const { data: existing } = await supabase.from("projects").select("id").eq("project_id", projectId).single()

      if (!existing) {
        return projectId
      }

      // If collision detected, wait with exponential backoff and retry
      await new Promise((resolve) => setTimeout(resolve, Math.min(50 * Math.pow(2, attempt), 1000)))
    } catch (error) {
      // On error, wait and retry
      await new Promise((resolve) => setTimeout(resolve, Math.min(50 * Math.pow(2, attempt), 1000)))
    }
  }

  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `PRJ-${currentYear}-T${timestamp}-${randomSuffix}`
}
