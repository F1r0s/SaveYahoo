'use client';

import React from 'react';
import { Activity, CheckCircle2, TrendingUp, HardDrive, Zap, ShieldAlert, Cpu } from 'lucide-react';

export default function AdminMetrics() {
  const metrics = [
    { label: 'Parser Success Rate', value: '99.4%', change: '+0.2%', status: 'optimal', icon: CheckCircle2 },
    { label: 'Avg Extraction Latency', value: '412ms', change: '-35ms', status: 'optimal', icon: Zap },
    { label: 'Active Edge Stream Cache', value: '100%', change: '5 nodes', status: 'optimal', icon: HardDrive },
    { label: 'CPU Cluster Load', value: '18.2%', change: 'Normal', status: 'optimal', icon: Cpu },
  ];

  const recentEvents = [
    { time: 'Just now', event: 'Parsed 1080p stream for Yahoo Lifestyle groceries guide', status: 'success' },
    { time: '4m ago', event: 'Cached 320kbps MP3 audio stream for S&P 500 Market Surge', status: 'success' },
    { time: '12m ago', event: 'Synthesized clean Markdown reader for Associated Press transit report', status: 'success' },
    { time: '28m ago', event: 'pSEO Sitemap index re-validated across partitions 1-3', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#6001d2]" />
            <h2 className="text-base font-bold text-slate-900">Live Downloader & Parser Health</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All Pipelines Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span>{m.label}</span>
                  <Icon className="w-4 h-4 text-[#6001d2]" />
                </div>
                <div className="text-2xl font-black text-slate-900">{m.value}</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{m.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Live Extraction Event Log</h3>
        <div className="space-y-2.5">
          {recentEvents.map((e, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-800 font-medium">{e.event}</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
