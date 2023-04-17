export function trimBody(content: string) {
  return content
    .replaceAll('\n', '\r\n')
    .trim()
    .split('\r\n')
    .filter((word) => word !== '')
    .join('\r\n');
}
