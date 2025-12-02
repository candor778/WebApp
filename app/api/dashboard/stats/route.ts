// app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/dashboard-stats";

export async function GET() {
  try {
    const data = await getDashboardStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
