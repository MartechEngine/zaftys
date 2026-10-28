/** One level of parentheses inside a URL, so a circular filename does not split the link. */

function linkPattern(): RegExp {
  return /\[([^\]]+)\]\(((?:[^()]|\([^()]*\))+)\)/g;
}

export function stripMarkdownLinks(text: string): string {
  return text.replace(linkPattern(), "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

export function splitMarkdownLinks(
  text: string,
): { kind: "text" | "link"; value: string; href?: string }[] {
  const nodes: { kind: "text" | "link"; value: string; href?: string }[] = [];
  let last = 0;
  for (const match of text.matchAll(linkPattern())) {
    const start = match.index ?? 0;
    if (start > last) nodes.push({ kind: "text", value: text.slice(last, start) });
    nodes.push({ kind: "link", value: match[1], href: match[2] });
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push({ kind: "text", value: text.slice(last) });
  return nodes;
}
