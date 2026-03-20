export type DeviceType = "DESKTOP" | "MOBILE" | "TABLET"
export type BrowserName = "CHROME" | "SAFARI" | "FIREFOX" | "EDGE" | "OTHER"
export type ResponseStatus = "STARTED" | "COMPLETED" | "TERMINATED" | "QUOTA FULL" | "QUALITY_TERMINATED"

export interface Project {
  id: string
  project_id: string
  title: string
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Response {
  id: string
  project_id: string
  user_id: string
  ip_address: string | null
  user_agent: string | null
  device_type: DeviceType | null
  browser_name: BrowserName | null
  status: ResponseStatus
  created_at: string
  completed_at: string | null
}

export interface ResponseWithProject extends Response {
  projects: Project
}

export interface GeoData {
  country: string | null
  country_code: string | null
  city: string | null
  state: string | null
  latitude: number | null
  longitude: number | null
  isp: string | null
  timezone: string | null
}

export const EMPTY_GEO: GeoData = {
  country: null,
  country_code: null,
  city: null,
  state: null,
  latitude: null,
  longitude: null,
  isp: null,
  timezone: null,
}

// Helper to parse device type from user agent
export function parseDeviceType(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase()
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "TABLET"
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent,
    )
  ) {
    return "MOBILE"
  }
  return "DESKTOP"
}

// Helper to parse browser name from user agent
export function parseBrowserName(userAgent: string): BrowserName {
  const ua = userAgent.toLowerCase()
  if (ua.includes("edg")) return "EDGE"
  if (ua.includes("chrome")) return "CHROME"
  if (ua.includes("safari") && !ua.includes("chrome")) return "SAFARI"
  if (ua.includes("firefox")) return "FIREFOX"
  return "OTHER"
}

// Helper to get IP address from headers
export function getIpAddress(headers: Headers): string {
  const vercelForwardedFor = headers.get("x-vercel-forwarded-for")
  if (vercelForwardedFor) return vercelForwardedFor.split(",")[0].trim()

  const cfConnectingIp = headers.get("cf-connecting-ip")
  if (cfConnectingIp) return cfConnectingIp

  const xRealIp = headers.get("x-real-ip")
  if (xRealIp) return xRealIp

  const xForwardedFor = headers.get("x-forwarded-for")
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim()

  return "127.0.0.1"
}

export async function getGeoData(ip: string): Promise<GeoData> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2000)

  try {
    const res = await fetch(
      `https://api.ipgeolocation.io/v3/ipgeo?apiKey=${process.env.IPGEO_API_KEY}&ip=${ip}`,
      { signal: controller.signal }
    )

    if (!res.ok) return EMPTY_GEO

    const data = await res.json()

    return {
      country: data?.location?.country_name ?? null,
      country_code: data?.location?.country_code2 ?? null,
      city: data?.location?.city ?? null,
      state: data?.location?.state_prov ?? null,
      latitude: data?.location?.latitude ? parseFloat(data.location.latitude) : null,
      longitude: data?.location?.longitude ? parseFloat(data.location.longitude) : null,
      isp: data?.asn?.organization ?? null,
      timezone: data?.time_zone?.name ?? null,
    }
  } catch (error) {
    console.error("Geo fetch failed:", error)
    return EMPTY_GEO
  } finally {
    clearTimeout(timer)
  }
}