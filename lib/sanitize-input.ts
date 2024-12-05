export function sanitizeInput(input: string): string {
  // Étape 1 : Utiliser DOMParser pour analyser et nettoyer le HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'text/html');

  // Supprimer toutes les balises <script>
  const scripts = doc.getElementsByTagName('script');
  for (let i = scripts.length - 1; i >= 0; i--) {
    scripts[i].parentNode?.removeChild(scripts[i]);
  }

  // Étape 2 : Récupérer le contenu propre
  let sanitized = doc.body.textContent || '';

  // Étape 3 : Nettoyer les entités HTML courantes
  sanitized = sanitized
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Étape 4 : Supprimer les caractères de contrôle et trim
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();

  return sanitized;
}
