// app/api/projects/[id]/respondents/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const ALLOWED_GEO_FIELDS = new Set(["country", "country_code", "city", "state"]);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: projectId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const offset   = Number.parseInt(searchParams.get("offset") || "0");
    const limit    = Number.parseInt(searchParams.get("limit")  || "50");
    const status   = searchParams.get("status");
    const userId   = searchParams.get("userId");
    const geoField = searchParams.get("geoField"); // e.g. "country", "country_code", "state", "city"
    const geoValue = searchParams.get("geoValue");

    const adminClient = getSupabaseAdmin();

    // Verify project exists
    const { data: project, error: projectError } = await adminClient
      .from("projects")
      .select("id, project_id, title")
      .eq("id", projectId)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Build query — note the comma after completed_at (was missing before)
    let query = adminClient
      .from("responses")
      .select(
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
        timezone
        `,
        { count: "exact" },
      )
      .eq("project_id", projectId);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // userId — case-SENSITIVE partial match
    if (userId && userId.trim()) {
      query = query.like("user_id", `%${userId.trim()}%`);
    }

    // Geo filter — case-INSENSITIVE (ilike), whitelisted columns only
    if (geoField && geoValue && ALLOWED_GEO_FIELDS.has(geoField)) {
      query = query.ilike(geoField, `%${geoValue.trim()}%`);
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
      id:          response.id,
      projectId:   project.project_id,
      userId:      response.user_id,
      ipAddress:   response.ip_address,
      deviceType:  response.device_type,
      browserName: response.browser_name,
      status:      response.status,
      createdAt:   response.created_at,
      completedAt: response.completed_at,
      // 🌍 GEO DATA
      country:     response.country      ?? "Unknown",
      countryCode: response.country_code ?? "Unknown",
      city:        response.city         ?? "Unknown",
      state:       response.state        ?? "Unknown",
      latitude:    response.latitude     ?? "Unknown",
      longitude:   response.longitude    ?? "Unknown",
      isp:         response.isp          ?? "Unknown",
      timezone:    response.timezone     ?? "Unknown",
      // Backward compat
      respondentName:  response.user_id,
      respondentEmail: null,
      respondentPhone: "N/A",
    }));

    return NextResponse.json({
      respondents,
      pagination: {
        total:   count || 0,
        offset,
        limit,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching project respondents:", error);
    return NextResponse.json(
      { error: "Failed to fetch respondents" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id || id.trim() === "") {
      return NextResponse.json(
        { error: "Invalid respondent ID" },
        { status: 400 },
      );
    }

    const adminClient = getSupabaseAdmin();

    const { data: respondent, error: fetchError } = await adminClient
      .from("responses")
      .select("id, user_id, project_id")
      .eq("id", id)
      .single();

    if (fetchError || !respondent) {
      return NextResponse.json(
        { error: "Respondent not found" },
        { status: 404 },
      );
    }

    const { error: deleteError } = await adminClient
      .from("responses")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting respondent:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete respondent", details: deleteError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Respondent deleted successfully", deletedId: id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete respondent error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}