// extract id from some-stuff-slug-[id]
export function extractId(str) {
  const parts = str.split("-");
  return parts[parts.length - 1];
}
