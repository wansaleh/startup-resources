export function cleanCategory(category) {
  return category.replace(/[^\p{L}\p{N}\p{P}\p{Z}{^$}]/gu, '').trim();
}

export function cleanDomain(url) {
  if (!url) return '';
  return url.replace(/^https:\/\/(www\.)?|\/$/g, '');
}
