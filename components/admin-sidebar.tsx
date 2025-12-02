"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface AdminSidebarProps {
  userEmail: string
  isAdmin: boolean
}

export function AdminSidebar({ userEmail, isAdmin }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { setOpenMobile, isMobile } = useSidebar()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Respondents",
      href: "/respondents",
      icon: Users,
    },
  ]

  const adminItems = isAdmin
    ? [
        {
          title: "User Management",
          href: "/dashboard/users",
          icon: Settings,
        },
      ]
    : []

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      // Use window.location for full page reload to clear all state
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Sign out error:", error)
      setIsSigningOut(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Response Tracker</h2>
        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  >
                    <Link href={item.href} prefetch={true} onClick={handleLinkClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        {adminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href} prefetch={true} onClick={handleLinkClick}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <Button
          variant="ghost"
          className="w-full justify-start p-2"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {isSigningOut ? "Signing out..." : "Sign out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}