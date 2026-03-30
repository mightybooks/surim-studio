type Props = {
  author: string;
  platform: string;
  quote: string;
  url: string;
  date?: string;
};

export default function ReaderReviewItem({
  author,
  platform,
  quote,
  url,
  date
}: Props) {
  return (
    <article className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">{author}</span>
        <span> ({platform})</span>
        {date && <span> · {date}</span>}
      </div>

      <blockquote className="mb-5 text-xl leading-relaxed italic text-zinc-800">
        “{quote}”
      </blockquote>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
      >
        원문 보기 →
      </a>
    </article>
  );
}