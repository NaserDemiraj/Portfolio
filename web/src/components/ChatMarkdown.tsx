import type { ReactNode } from 'react';

// Just enough Markdown for chat replies: **bold**, `code`, links/URLs, bullet and
// numbered lists, paragraphs. Builds React nodes (never HTML strings), so model
// output can't inject markup.

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+)/g;

function inline(text: string, keyBase: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    const href = md ? md[2] : /^https?:\/\//.test(part) ? part.replace(/[.,;:]+$/, '') : null;
    if (href) {
      return (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          {md ? md[1] : href}
        </a>
      );
    }
    return part;
  });
}

export function ChatMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    const k = `l${blocks.length}`;
    blocks.push(<Tag key={k}>{list.items.map((item, i) => <li key={i}>{inline(item, `${k}-${i}`)}</li>)}</Tag>);
    list = null;
  };

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flush();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flush();
    if (line.trim()) {
      const k = `p${blocks.length}`;
      blocks.push(<p key={k}>{inline(line.replace(/^#+\s*/, ''), k)}</p>);
    }
  }
  flush();
  return <>{blocks}</>;
}
