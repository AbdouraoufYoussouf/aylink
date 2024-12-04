export function sanitizeInput(input: string): string {
    // Remove any HTML tags
    let sanitized = input.replace(/<[^>]*>?/gm, '');
    
    // Encode special characters
    sanitized = sanitized.replace(/[&<>"']/g, function(m) {
      const entityMap: {[key: string]: string} = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return entityMap[m];
    });
  
    return sanitized;
  }
  
  