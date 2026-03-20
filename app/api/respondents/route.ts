import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// Whitelist of columns the geo filter is allowed to target.
// This prevents arbitrary column injection from query params.
const ALLOWED_GEO_FIELDS = new Set([
  "country",
  "country_code",
  "city",
  "state",
]);

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = Number.parseInt(searchParams.get("offset") || "0");
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");
    const geoField = searchParams.get("geoField"); // e.g. "country", "country_code", "state", "city"
    const geoValue = searchParams.get("geoValue");

    const adminClient = getSupabaseAdmin();

    // Build query
    let query = adminClient.from("responses").select(
      `
        id,
        project_id,
        user_id,
        ip_address,
        user_agent,
        device_type,
        browser_name,
        status,
        created_at,
        completed_at,
        country,
        country_code,
        city,
        state,
        latitude,
        longitude,
        isp,
        timezone,
        projects!inner(id, project_id, title)
      `,
      { count: "exact" },
    );

    if (projectId && projectId !== "all") {
      query = query.eq("project_id", projectId);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (userId) {
      query = query.like("user_id", `%${userId}%`);
    }

    // Geo filter — only applied when both params are present and the field is whitelisted
    if (geoField && geoValue && ALLOWED_GEO_FIELDS.has(geoField)) {
      query = query.ilike(geoField, `%${geoValue}%`);
    }

    query = query
      .order("created_at", { ascending: true })
      .range(offset, offset + limit - 1);

    const { data: responses, error, count } = await query;

    if (error) {
      console.error("Error fetching respondents:", error);
      return NextResponse.json(
        { error: "Failed to fetch respondents" },
        { status: 500 },
      );
    }

    const respondents = (responses || []).map((response: any) => ({
      id: response.id,
      surveyId: response.project_id,
      projectId: response.projects.project_id,
      projectTitle: response.projects.title,
      userId: response.user_id,
      ipAddress: response.ip_address,
      deviceType: response.device_type,
      browserName: response.browser_name,
      status: response.status,
      createdAt: response.created_at,
      completedAt: response.completed_at,
      // 🌍 GEO DATA
      country: response.country || "Unknown",
      countryCode: response.country_code || "Unknown",
      city: response.city || "Unknown",
      state: response.state || "Unknown",
      latitude: response.latitude || "Unknown",
      longitude: response.longitude || "Unknown",
      isp: response.isp || "Unknown",
      timezone: response.timezone || "Unknown",
      // Backward compat
      respondentName: response.user_id,
      respondentEmail: null,
      respondentPhone: "N/A",
      answerCount: 0,
    }));

    return NextResponse.json({
      respondents,
      pagination: {
        total: count || 0,
        offset,
        limit,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching respondents:", error);
    return NextResponse.json(
      { error: "Failed to fetch respondents" },
      { status: 500 },
    );
  }
}