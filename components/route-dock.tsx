import { T } from "@/components/language-provider";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, NotebookPen, Trophy } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { exploreRoutes } from "@/data/site";

const icons = {
  book: BookOpen,
  trophy: Trophy,
  award: Award,
  notebook: NotebookPen,
};

export function RouteDock() {
  return (
    <Reveal className="route-dock" delay={0.22}>
      {exploreRoutes.map((route) => {
        const Icon = icons[route.icon];
        return (
          <Link href={route.href} key={route.href} className="route-button">
            <span className="route-index">{route.index}</span>
            <Icon aria-hidden="true" />
            <span className="route-copy">
              <strong><T>{route.label}</T></strong>
              <small><T>{route.description}</T></small>
            </span>
            <ArrowUpRight className="route-arrow" aria-hidden="true" />
          </Link>
        );
      })}
    </Reveal>
  );
}
