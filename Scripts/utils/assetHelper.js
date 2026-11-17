/**
 * Utility to resolve asset URLs dynamically according to the Vite base path.
 * Ensures 100% compatibility across localhost, normal GitHub Pages repos (/repo-name/),
 * and root user pages (username.github.io).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : (path.startsWith('./') ? path.slice(2) : path);
  return `${cleanBase}${cleanPath}`;
}
