type TimelineItem = {
  date: string;
  title: string;
  detail?: string;
  meta?: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <time>{item.date}</time>
          <div>
            <strong>{item.title}</strong>
            {item.detail ? <p>{item.detail}</p> : null}
            {item.meta ? <span className="timeline-meta">{item.meta}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
