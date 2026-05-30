const DIALOGUE_START_PATTERN = /^[“"‘']/;

function hasClass(attrs: string, className: string) {
  const classMatch = attrs.match(/\sclass=(["'])(.*?)\1/i);
  if (!classMatch) return false;

  return classMatch[2].split(/\s+/).includes(className);
}

function addClass(attrs: string, className: string) {
  const classMatch = attrs.match(/\sclass=(["'])(.*?)\1/i);
  if (!classMatch) {
    return `${attrs} class="${className}"`;
  }

  if (classMatch[2].split(/\s+/).includes(className)) {
    return attrs;
  }

  const nextClassValue = `${classMatch[2]} ${className}`.trim();
  return attrs.replace(classMatch[0], ` class=${classMatch[1]}${nextClassValue}${classMatch[1]}`);
}

function getFirstText(innerHtml: string) {
  return innerHtml
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .trimStart();
}

function addDialogueClassToParagraphs(html: string) {
  return html.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs: string, innerHtml: string) => {
    if (hasClass(attrs, "dialogue") || hasClass(attrs, "no-auto-dialogue")) {
      return match;
    }

    const firstText = getFirstText(innerHtml);
    if (!DIALOGUE_START_PATTERN.test(firstText)) {
      return match;
    }

    return `<p${addClass(attrs, "dialogue")}>${innerHtml}</p>`;
  });
}

function addIndentAfterBreaks(html: string) {
  return html.replace(/(<br\b([^>]*)\/?>)(?!\s*<span\b[^>]*class=(["'])[^"']*\bbr-indent\b[^"']*\3)/gi, (match, brTag: string, attrs: string) => {
    if (/\sdata-no-indent(?:\s|=|\/|>)/i.test(attrs)) {
      return match;
    }

    return `${brTag}<span class="br-indent" aria-hidden="true"></span>`;
  });
}

export function prepareSurimjiContentHtml(html: string) {
  return addIndentAfterBreaks(addDialogueClassToParagraphs(html));
}
