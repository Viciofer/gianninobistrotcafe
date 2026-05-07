import { Link, useRouterState } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Coffee, Wine, Martini, Mail, Lock } from "lucide-react";
import logoGiannino from "@/assets/logo-giannino.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Menù", url: "/menu", icon: UtensilsCrossed },
  { title: "Caffetteria", url: "/caffetteria", icon: Coffee },
  { title: "Drink List", url: "/drink", icon: Martini },
  { title: "Carta dei Vini", url: "/vini", icon: Wine },
  { title: "Contatti", url: "/contatti", icon: Mail },
  { title: "Admin", url: "/admin", icon: Lock },
];

export function AppSidebar() {
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-6 py-8 border-b border-sidebar-border">
        <div className="flex flex-col items-center">
          <img
            src={logoGiannino}
            alt="Giannino Bistrot Cafè"
            className="size-20 rounded-full object-cover group-data-[collapsible=icon]:size-8"
          />
          <span className="mt-3 text-[10px] tracking-[0.25em] text-sidebar-foreground/60 uppercase group-data-[collapsible=icon]:hidden">
            Est. 1974
          </span>
          <h1 className="font-serif text-xl text-sidebar-foreground mt-1 group-data-[collapsible=icon]:hidden text-center leading-tight">
            Giannino<br />
            <span className="text-sm text-sidebar-foreground/70">Bistrot · Cafè</span>
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-[0.25em] text-sidebar-foreground/50 uppercase px-3 mb-2">
            Navigazione
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const active = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="h-11 px-3 text-sm tracking-wider uppercase data-[active=true]:bg-sidebar-accent data-[active=true]:text-accent data-[active=true]:border-l-2 data-[active=true]:border-accent rounded-none"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border px-6 py-5">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-sidebar-foreground/60 group-data-[collapsible=icon]:justify-center">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--candle)]" />
          <span className="group-data-[collapsible=icon]:hidden">Servizio attivo</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}