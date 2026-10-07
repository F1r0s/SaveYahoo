'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  Edit3,
  CheckCircle2,
  FileCode2,
  Database,
  ArrowRight,
} from 'lucide-react';
import { sitemapService } from '@/lib/pseo/sitemap-service';

export default function AdminPseoManager() {
  const [topics, setTopics] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [editingTopic, setEditingTopic] = useState<any | null>(null);
  const [dbInfo, setDbInfo] = useState<{ connected: boolean; latencyMs?: number }>({ connected: false });

  const sitemapStats = sitemapService.getSitemapStats();

  const fetchTopics = useCallback(async (query = search) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/pseo?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setTopics(data.items || []);
        if (data.database) {
          setDbInfo(data.database);
        }
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTopics(search);
    }, 0);
    return () => clearTimeout(timer);
  }, [search, fetchTopics]);

  const handleBulkGenerate = async () => {
    setGenerating(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/admin/pseo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_bulk', count: 2500 }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(data.message || 'Thousands of programmatic pages generated.');
        fetchTopics();
      } else {
        setStatusMsg(data.error || 'Failed to generate topics.');
      }
    } catch {
      setStatusMsg('Network error while bulk generating.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic) return;
    try {
      const res = await fetch('/api/admin/pseo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_topic', topic: editingTopic }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(`Saved '${editingTopic.title}' successfully.`);
        setEditingTopic(null);
        fetchTopics();
      }
    } catch {
      // Error
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Neon DB + Generator Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${dbInfo.connected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Neon Serverless Postgres Status: {dbInfo.connected ? `Connected (${dbInfo.latencyMs}ms)` : 'Offline Fallback'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Programmatic SEO Matrix & Bulk Generator
            </h3>
            <p className="text-xs text-slate-500">
              Generate thousands of long-tail Yahoo media download pages. Crawlers discover these via partitioned sitemaps.
            </p>
          </div>

          <button
            type="button"
            disabled={generating}
            onClick={handleBulkGenerate}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#6001d2] hover:bg-[#4e00a8] rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {generating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{generating ? 'Generating 2,500+ Pages...' : '1-Click Bulk Generate Topics'}</span>
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 bg-purple-50 border border-purple-200 text-purple-900 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6001d2] shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Indexed Matrix Pages</span>
            <div className="text-xl font-bold font-mono text-slate-900">{sitemapStats.totalTopics.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Sitemap Partitions</span>
            <div className="text-xl font-bold font-mono text-[#6001d2]">{sitemapStats.totalPartitions} files</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Crawler Capacity</span>
            <div className="text-xl font-bold font-mono text-emerald-600">500 URLs / Chunk</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Search Engine Access</span>
            <div className="text-xs font-mono text-slate-600 mt-1">Direct via robots.txt</div>
          </div>
        </div>
      </div>

      {/* Topics Search and Management */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics by keyword, slug, or vertical..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6001d2] bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Verify Root sitemap.xml</span>
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold bg-slate-50/50">
                <th className="py-2.5 px-4">Topic Headline</th>
                <th className="py-2.5 px-4">Vertical</th>
                <th className="py-2.5 px-4">Media Format</th>
                <th className="py-2.5 px-4">Monthly Vol</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Loading topics...</td>
                </tr>
              ) : topics.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">No topics found matching search query.</td>
                </tr>
              ) : (
                topics.map((item) => (
                  <tr key={item.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 max-w-sm line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">/topic/{item.slug}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#6001d2]">{item.category}</td>
                    <td className="py-3 px-4 uppercase text-[11px] text-slate-600 font-medium">{item.mediaType}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{item.searchVolume}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingTopic(item)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <a
                        href={`/topic/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 text-[#6001d2] font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Topic Drawer / Modal */}
      {editingTopic && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Edit Topic Page Metadata</h3>
            <form onSubmit={handleSaveTopic} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Headline (H1 & Meta Title)</label>
                <input
                  type="text"
                  value={editingTopic.title}
                  onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={editingTopic.description}
                  onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTopic(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#6001d2] hover:bg-[#4e00a8] text-white font-bold"
                >
                  Save to Neon Postgres
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}