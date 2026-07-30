import Image from "next/image";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GitHubStars } from "@/components/github-stars";
import type {
  FeaturedPublication,
  PublicationNode,
  PublicationSeries,
  StandardPublication,
} from "@/data/publications";

function formatAuthors(authors: string) {
  return authors.split(/(Zixuan Jiang\*?)/g).map((part, index) =>
    part.startsWith("Zixuan Jiang") ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

function countPapers(items: PublicationNode[]): number {
  return items.reduce(
    (total, item) => total + (item.kind === "series" ? countPapers(item.items) : 1),
    0,
  );
}

function ResourceLinks({ resources }: { resources: { label: string; href: string }[] }) {
  return (
    <div className="resource-links">
      {resources.map((resource) => (
        <span className="resource-entry" key={resource.href}>
          <a href={resource.href} target="_blank" rel="noreferrer">
            {resource.label}<ArrowUpRight aria-hidden="true" />
          </a>
          {resource.href.startsWith("https://github.com/") ? <GitHubStars repositoryUrl={resource.href} /> : null}
        </span>
      ))}
    </div>
  );
}

function FeaturedPaper({ paper }: { paper: FeaturedPublication }) {
  return (
    <article className="featured-paper">
      <div className="featured-visual">
        <span className="venue-chip">{paper.venue} {paper.year}</span>
        <Image
          src={paper.image}
          alt={paper.imageAlt}
          width={1400}
          height={900}
          sizes="(max-width: 900px) 100vw, 45vw"
        />
      </div>
      <div className="featured-copy">
        <p className="paper-type">Featured work</p>
        <h3><a href={paper.href} target="_blank" rel="noreferrer">{paper.title}</a></h3>
        <p className="paper-authors">{formatAuthors(paper.authors)}</p>
        <ResourceLinks resources={paper.resources} />
        <ul className="paper-highlights">
          {paper.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        {paper.media?.length ? (
          <div className="media-row">
            <span>Media</span>
            {paper.media.map((item) => (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>{item.label}</a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function StandardPaper({ paper }: { paper: StandardPublication }) {
  return (
    <article className="standard-paper">
      <div className="standard-venue">
        <span>{paper.venue}</span>
        <time>{paper.year}</time>
      </div>
      <div className="standard-copy">
        <h3><a href={paper.href} target="_blank" rel="noreferrer">{paper.title}</a></h3>
        <p>{formatAuthors(paper.authors)}</p>
        {paper.resources?.length ? <ResourceLinks resources={paper.resources} /> : null}
      </div>
      <a className="paper-open" href={paper.href} target="_blank" rel="noreferrer" aria-label={`Open ${paper.title}`}>
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}

function Series({ series, depth }: { series: PublicationSeries; depth: number }) {
  const paperCount = countPapers(series.items);
  return (
    <section className="publication-series" data-depth={depth} aria-labelledby={`${series.id}-title`}>
      <header className="series-header">
        <div>
          <p>{series.eyebrow}</p>
          <h2 id={`${series.id}-title`}>{series.title}</h2>
          <span>{series.description}</span>
        </div>
        <div className="series-count"><Layers3 aria-hidden="true" /><strong>{paperCount}</strong><span>papers</span></div>
      </header>
      <div className="series-items">
        {series.items.map((item) => <PublicationNodeView node={item} depth={depth + 1} key={item.id} />)}
      </div>
    </section>
  );
}

function PublicationNodeView({ node, depth }: { node: PublicationNode; depth: number }) {
  if (node.kind === "series") return <Series series={node} depth={depth} />;
  if (node.kind === "featured") return <FeaturedPaper paper={node} />;
  return <StandardPaper paper={node} />;
}

export function PublicationTree({ nodes }: { nodes: PublicationNode[] }) {
  return (
    <div className="publication-tree">
      {nodes.map((node, index) => (
        <Reveal key={node.id} delay={index * 0.06}>
          <PublicationNodeView node={node} depth={0} />
        </Reveal>
      ))}
    </div>
  );
}
