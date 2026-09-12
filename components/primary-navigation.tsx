"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, BookOpen, NotebookPen, Award, Trophy } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { exploreRoutes } from "@/data/site";
import { useEffect, useRef } from "react";

const icons = { book: BookOpen, notebook: NotebookPen, award: Award, trophy: Trophy };
const destinations = [
  { href: "/", label: "About Me", icon: House },
  ...exploreRoutes.map((route) => ({ href: route.href, label: route.label, icon: icons[route.icon] })),
];

export function PrimaryNavigation() {
  const pathname = usePathname();
  const { language, translate } = useLanguage();
  const navigation = useRef<HTMLElement>(null);
  const normalized = `${pathname.replace(/\/$/, "")}/`;
  useEffect(() => {
    const container = navigation.current;
    const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
    if (container && active && container.scrollWidth > container.clientWidth) {
      container.scrollLeft += active.getBoundingClientRect().left - container.getBoundingClientRect().left - (container.clientWidth - active.clientWidth) / 2;
    }
  }, [pathname, language]);
  return (
    <nav ref={navigation} className="primary-navigation" aria-label={language === "zh" ? "主导航" : "Main navigation"}>
      {destinations.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? normalized === "/" : normalized.startsWith(href) || (href === "/blog/" && normalized.startsWith("/notes/"));
        return <Link key={href} href={href} aria-current={active ? "page" : undefined}><Icon aria-hidden="true" /><span>{translate(label)}</span></Link>;
      })}
    </nav>
  );
}
