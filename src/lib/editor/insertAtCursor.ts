// src/lib/editor/insertAtCursor.ts

export function insertAtCursor(
  textarea: HTMLTextAreaElement,
  value: string,
  insertText: string,
  setValue: (v: string) => void
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const before = value.slice(0, start);
  const after = value.slice(end);

  const next = before + insertText + after;
  setValue(next);

  requestAnimationFrame(() => {
    textarea.focus();
    const cursor = start + insertText.length;
    textarea.setSelectionRange(cursor, cursor);
  });
}
