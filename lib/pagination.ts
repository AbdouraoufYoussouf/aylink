export function getPageRange(currentPage: number, totalPages: number, maxVisible: number = 5) {
    // Always show first page
    const pages: (number | 'ellipsis')[] = [0];
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 2, start + maxVisible - 3);
    
    // Adjust start if end is too close to totalPages
    start = Math.max(1, Math.min(start, totalPages - maxVisible + 1));
  
    // Add ellipsis after first page if needed
    if (start > 1) {
      pages.push('ellipsis');
    }
  
    // Add pages in range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    // Add ellipsis before last page if needed
    if (end < totalPages - 2) {
      pages.push('ellipsis');
    }
  
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }
  
    return pages;
  }