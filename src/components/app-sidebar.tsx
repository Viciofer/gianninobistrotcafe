import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Mail } from "lucide-react";
import logoGiannino from "@/assets/logo-giannino.png";
import { fetchSections, sectionIcon, sectionUrl, type SectionRow } from "@/lib/catalog";
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
} from "@/components/ui/sidebar";

const DEFAULT_SECTIONS: SectionRow[] = [
  { id: "menu", slug: "menu", title: "Menù", icon: "UtensilsCrossed", builtin: true, sort_order: 1, visible: true },
  { id: "caffetteria", slug: "caffetteria", title: "Caffetteria", icon: "Coffee", builtin: true, sort_order: 2, visible: true },
  { id: "drink", slug: "drink", title: "Drink List", icon: "Martini", builtin: true, sort_order: 3, visible: true },
  { id: "vini", slug: "vini", title: "Carta dei Vini", icon: "Wine", builtin: true, sort_order: 4, visible: true },
];

export function AppSidebar() {
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });
  const [sections, setSections] = useState<SectionRow[]>(DEFAULT_SECTIONS);

  useEffect(() => {
    const load = () => fetchSections().then(setSections).catch(() => {});
    load();
    window.addEventListener("sections-changed", load);
    return () => window.removeEventListener("sections-changed", load);
  }, []);

  const items = [
    { title: "Home", url: "/", icon: Home },
    ...sections.map((s) => ({ title: s.title, url: sectionUrl(s), icon: sectionIcon(s.icon) })),
    { title: "Contatti", url: "/contatti", icon: Mail },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-6 py-8 border-b border-sidebar-border">
        <div className="flex flex-col items-center">
          <img
            src={logoGiannino}
            alt="Giannino Bistrot Cafè"
            className="w-[125px] h-[125px] rounded-full object-cover group-data-[collapsible=icon]:size-8"
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
    </Sidebar>
  );
}