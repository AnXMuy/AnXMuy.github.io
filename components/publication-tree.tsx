import { T } from "@/components/language-provider";
import { ZoomableImage as Image } from "@/components/zoomable-image";
import { ArrowUpRight, FileText, Github, Globe, Layers3 } from "lucide-react";
import { SeriesReader } from "@/components/series-reader";
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
            {resource.href.startsWith("https://github.com/") ? <Github aria-hidden="true" /> : resource.label === "Paper" ? <FileText aria-hidden="true" /> : <Globe aria-hidden="true" />}
            <T>{resource.label}</T><ArrowUpRight aria-hidden="true" />
          </a>
          {resource.href.startsWith("https://github.com/") ? <GitHubStars repositoryUrl={resource.href} /> : null}
        </span>
      ))}
    </div>
  );
}

function FeaturedPaper({ paper }: { paper: FeaturedPublication }) {
  const venue = <>{paper.venue}{paper.showVenueYear === false ? null : ` ${paper.year}`}</>;
  return (
    <article className="featured-paper">
      <div className="featured-visual">
        {paper.venueHref ? <a className="venue-chip" href={paper.venueHref} target="_blank" rel="noreferrer">{venue}</a> : <span className="venue-chip">{venue}</span>}
        {paper.imageStack?.length ? (
          <div className="featured-stack">
            {paper.imageStack.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            ))}
          </div>
        ) : (
          <Image
            src={paper.image}
            alt={paper.imageAlt}
            width={1400}
            height={900}
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        )}
      </div>
      <div className="featured-copy">
        <p className="paper-type"><T>{"Featured work"}</T></p>
        <h3><a href={paper.href} target="_blank" rel="noreferrer">{paper.title}</a></h3>
        <p className="paper-authors">{formatAuthors(paper.authors)}</p>
        <ResourceLinks resources={paper.resources} />
        <ul className="paper-highlights">
          {paper.highlights.map((highlight) => <li key={highlight}><T>{highlight}</T></li>)}
        </ul>
        {paper.media?.length ? (
          <div className="media-row">
            <span><T>{"Media"}</T></span>
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
          <p><T>{series.eyebrow}</T></p>
          <h2 id={`${series.id}-title`}><T>{series.title}</T></h2>
          <span><T>{series.description}</T></span>
        </div>
        <div className="series-count"><Layers3 aria-hidden="true" /><strong>{paperCount}</strong><span><T>{paperCount === 1 ? "paper" : "papers"}</T></span></div>
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
      <SeriesReader pages={nodes.map((node) => ({ id: node.id, title: node.title, count: node.kind === "series" ? countPapers(node.items) : 1 }))}>
        {nodes.map((node) => <PublicationNodeView node={node} depth={0} key={node.id} />)}
      </SeriesReader>
    </div>
  );
}
