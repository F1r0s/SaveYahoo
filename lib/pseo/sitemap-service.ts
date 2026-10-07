class SitemapService {
  getTotalPartitions(): number {
    return 3;
  }

  getSitemapStats() {
    return {
      totalTopics: 1250,
      totalPartitions: 3,
    };
  }

  generatePartitionXml(partitionNumber: number, host: string): string {
    const urls = [
      `${host}/`,
      `${host}/video-downloader`,
      `${host}/audio-converter`,
      `${host}/blog-reader`,
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  }
}

export const sitemapService = new SitemapService();
