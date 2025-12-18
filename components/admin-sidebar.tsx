"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Loader2,
  User,
} from "lucide-react";
import Logo from "@/public/assets/candor-logo-transparent.png";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Image from "next/image";

interface AdminSidebarProps {
  userEmail: string;
  isAdmin: boolean;
}

export function AdminSidebar({ userEmail, isAdmin }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { setOpenMobile, isMobile } = useSidebar();

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
  ];

  const adminItems = isAdmin
    ? [
        {
          title: "User Management",
          href: "/dashboard/users",
          icon: Settings,
        },
      ]
    : [];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      // Use window.location for full page reload to clear all state
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  };

  return (
    <Sidebar style={{ backgroundColor: "#1b3750" }}>
      <SidebarHeader
        className="border-b border-white/10 px-6 py-4"
        style={{ backgroundColor: "#1b3750" }}
      >
        <Image
          src={Logo}
          alt="Candor Logo"
          width={170}
          height={60}
          className="object-contain w-full"
          priority
        />
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: "#1b3750" }}>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                    className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white"
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={handleLinkClick}
                    >
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

      <SidebarFooter
        className="border-t border-white/10"
        style={{ backgroundColor: "#1b3750" }}
      >
        {adminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/70">
              Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white"
                    >
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={handleLinkClick}
                      >
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

        <div className="px-2 py-2">
          <div className="flex items-center gap-0.5 text-white/80 rounded-md hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-full  text-white">
              <User className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-white truncate">
              {userEmail}
            </p>
          </div>

          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            variant="ghost"
            className="w-full justify-start text-white hover:text-white hover:bg-white/10"
          >
            {isSigningOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
