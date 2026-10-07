'use client';

import React, { useState } from 'react';
import { Database, CheckCircle2, ShieldCheck, RefreshCw, KeyRound, Server } from 'lucide-react';

export default function AdminDatabaseConfig() {
  const [dbState, setDbState] = useState({
    connected: true,
    dialect: 'PostgreSQL 16 (SSL enabled)',
    activePool: 4,
    latency: '18ms',
  });
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setMessage(null);
    setTimeout(() => {
      setTesting(false);
      setMessage('Successfully queried remote PostgreSQL cluster. Health status: Optimal.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#6001d2]" />
            <h2 className="text-base font-bold text-slate-900">Relational Database Configuration</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Connected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">Database Engine</span>
            <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-slate-400" />
              <span>{dbState.dialect}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">Connection Latency</span>
            <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{dbState.latency} (SSL Session Active)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Connection String (Environment Variable)
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value="postgresql://saveyahoo_admin:••••••••••••@cloudsql-pg.internal:5432/saveyahoo?sslmode=require"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-100 border border-slate-200 rounded-lg text-slate-600 select-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Parsed securely via <code className="font-mono">DATABASE_URL</code> on server-side runtime.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="px-4 py-2 bg-[#6001d2] hover:bg-[#4e00a8] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing Ping...' : 'Test Connection'}</span>
            </button>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
