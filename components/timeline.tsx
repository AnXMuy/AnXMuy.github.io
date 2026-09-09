import { T } from "@/components/language-provider";
type TimelineItem = {
  date: string;
  title: string;
  detail?: string;
  meta?: string;
};

export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={`$<T>{item.date}</T>-$<T>{item.title}</T>`}>
          <span className="timeline-dot" aria-hidden="true" />
          <time><T>{item.date}</T></time>
          <div>
            <strong><T>{item.title}</T></strong>
            {item.detail ? <p><T>{item.detail}</T></p> : null}
            {item.meta ? <span className="timeline-meta"><T>{item.meta}</T></span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
