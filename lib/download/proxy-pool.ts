/**
 * Rotating Proxy Pool Service
 * Automatically pulls, caches, and rotates standard HTTP/HTTPS/SOCKS5 proxies from public lists (e.g. iplocate/free-proxy-list)
 * Includes health tracking, failure blacklisting, and zero-downtime direct fallbacks.
 */

interface ProxyNode {
  url: string; // e.g. "http://1.2.3.4:8080"
  protocol: 'http' | 'https' | 'socks5';
  failedCount: number;
  lastUsed: number;
}

class ProxyPoolManager {
  private pool: ProxyNode[] = [];
  private lastFetched: number = 0;
  private readonly CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
  private readonly MAX_FAILS = 3;
  private isFetching: boolean = false;

  private readonly SOURCES = [
    {
      url: 'https://raw.githubusercontent.com/iplocate/free-proxy-list/master/protocols/https.txt',
      protocol: 'https' as const,
    },
    {
      url: 'https://raw.githubusercontent.com/iplocate/free-proxy-list/master/protocols/http.txt',
      protocol: 'http' as const,
    },
    {
      url: 'https://raw.githubusercontent.com/iplocate/free-proxy-list/master/protocols/socks5.txt',
      protocol: 'socks5' as const,
    },
  ];

  /**
   * Refreshes the proxy pool from source repositories
   */
  public async refreshPool(force: boolean = false): Promise<void> {
    const now = Date.now();
    if (!force && this.pool.length > 0 && now - this.lastFetched < this.CACHE_TTL_MS) {
      return;
    }

    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const fetchedNodes: ProxyNode[] = [];

      for (const source of this.SOURCES) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 4000);
          
          const res = await fetch(source.url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'SaveYahoo-Proxy-Sync/1.0' },
          });
          clearTimeout(timeout);

          if (res.ok) {
            const text = await res.text();
            const lines = text.split('\n');

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith('#')) continue;

              // Validate IP:Port format (e.g. 192.168.1.1:8080)
              const match = trimmed.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{2,5})$/);
              if (match) {
                const proxyUrl = `${source.protocol}://${trimmed}`;
                fetchedNodes.push({
                  url: proxyUrl,
                  protocol: source.protocol,
                  failedCount: 0,
                  lastUsed: 0,
                });
              }
            }
          }
        } catch {
          // Continue to next source if one fails or times out
        }
      }

      if (fetchedNodes.length > 0) {
        // Keep active pool randomized
        this.pool = fetchedNodes.sort(() => Math.random() - 0.5);
        this.lastFetched = now;
      }
    } catch {
      // Ignore network errors
    } finally {
      this.isFetching = false;
    }
  }

  /**
   * Retrieves the next available rotating proxy.
   * Priority:
   * 1. Explicit env var PROXY_URL / HTTP_PROXY (if provided by admin)
   * 2. Best candidate from cached public rotation pool
   * 3. null (fallback to direct request)
   */
  public async getRotatingProxy(): Promise<string | null> {
    // 1. Manual user override has highest priority
    const envProxy = process.env.PROXY_URL || process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
    if (envProxy && envProxy.trim()) {
      return envProxy.trim();
    }

    // 2. Fetch or reuse public rotation pool
    if (this.pool.length === 0 || Date.now() - this.lastFetched > this.CACHE_TTL_MS) {
      await this.refreshPool();
    }

    const viable = this.pool.filter((p) => p.failedCount < this.MAX_FAILS);
    if (viable.length === 0) {
      return null;
    }

    // Pick a proxy with least recent usage
    viable.sort((a, b) => a.lastUsed - b.lastUsed);
    const selected = viable[0];
    selected.lastUsed = Date.now();

    return selected.url;
  }

  /**
   * Reports a proxy failure to remove unresponsive nodes
   */
  public markFailed(proxyUrl: string): void {
    const node = this.pool.find((p) => p.url === proxyUrl);
    if (node) {
      node.failedCount += 1;
    }
  }

  /**
   * Reports a proxy success
   */
  public markSuccess(proxyUrl: string): void {
    const node = this.pool.find((p) => p.url === proxyUrl);
    if (node) {
      node.failedCount = 0;
    }
  }

  /**
   * Returns pool statistics for admin/diagnostic view
   */
  public getStats() {
    return {
      totalLoaded: this.pool.length,
      viableCount: this.pool.filter((p) => p.failedCount < this.MAX_FAILS).length,
      lastUpdated: this.lastFetched ? new Date(this.lastFetched).toISOString() : 'Never',
    };
  }
}

export const proxyPool = new ProxyPoolManager();
