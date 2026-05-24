'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { AIModel } from '@/types/model';
import { getProviderColor, isNewModel } from '@/lib/utils';

interface BenchData {
  label: string;
  key: keyof NonNullable<AIModel['benchmarks']>;
  description: string;
}

const ALL_BENCHMARKS: BenchData[] = [
  { label: 'MMLU', key: 'mmlu', description: 'General knowledge' },
  { label: 'GPQA Diamond', key: 'gpqa', description: 'Hard science Q&A' },
  { label: 'MATH', key: 'math', description: 'Math problem solving' },
  { label: 'AIME 2025', key: 'aime', description: 'Advanced math' },
  { label: 'GSM8K', key: 'gsm8k', description: 'Grade-school math' },
  { label: 'HumanEval', key: 'humaneval', description: 'Code generation' },
  { label: 'LiveCodeBench', key: 'liveCodeBench', description: 'Live coding' },
  { label: 'SWE-bench', key: 'sweBench', description: 'Real-world software' },
  { label: 'HellaSwag', key: 'hellaswag', description: 'Commonsense inference' },
];

function BenchmarkScore({ score }: { score: number | null }) {
  if (score === null) {
    return <span className="text-xs" style={{ color: 'var(--text-faint)' }}>—</span>;
  }
  const color = score >= 90 ? '#22d3a0' : score >= 75 ? '#7c6aff' : score >= 60 ? '#f6ad55' : '#f56565';
  return <span className="text-sm font-bold" style={{ color }}>{score}%</span>;
}

export default function BenchmarksTable({ models }: { models: AIModel[] }) {
  const [sortBench, setSortBench] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: string) => {
    if (sortBench === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBench(key);
      setSortDir('desc');
    }
  };

  const getScore = (m: AIModel, key: string): number | null => {
    if (!m.benchmarks) return null;
    return m.benchmarks[key as keyof typeof m.benchmarks] ?? null;
  };

  const sorted = [...models].sort((a, b) => {
    if (!sortBench) return a.name.localeCompare(b.name);
    const aScore = getScore(a, sortBench);
    const bScore = getScore(b, sortBench);
    if (aScore === null && bScore === null) return 0;
    if (aScore === null) return 1;
    if (bScore === null) return -1;
    return sortDir === 'desc' ? bScore - aScore : aScore - bScore;
  });

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
      <div className="overflow-x-auto">
        <table className="comparison-table w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--bg-surface)' }}>
              <th
                className="sticky left-0 z-10 px-3 py-3 text-left whitespace-nowrap"
                style={{
                  color: 'var(--text-faint)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--bg-surface)',
                  minWidth: '180px',
                }}
              >
                Model
              </th>
              {ALL_BENCHMARKS.map((bm) => (
                <th
                  key={bm.key}
                  className="px-3 py-3 text-center whitespace-nowrap cursor-pointer select-none"
                  style={{
                    color: sortBench === bm.key ? 'var(--accent)' : 'var(--text-faint)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                  onClick={() => handleSort(bm.key)}
                >
                  <div className="flex items-center justify-center gap-1">
                    {bm.label}
                    {sortBench === bm.key && (
                      sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
                    )}
                  </div>
                  <div style={{ color: 'var(--text-faint)', fontSize: '0.6rem', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}>
                    {bm.description}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((model) => (
              <tr key={model.id} style={{ background: 'var(--bg-card)' }}>
                <td
                  className="sticky left-0 px-3 py-3 z-10"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <Link href={`/model/${model.id}`} className="flex items-center gap-2 group">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <Image src={model.icon} alt={model.provider} width={14} height={14} unoptimized />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-medium leading-tight group-hover:underline"
                          style={{ color: 'var(--text)', fontSize: '0.8rem' }}
                        >
                          {model.name}
                        </span>
                        {isNewModel(model.releaseDate) && (
                          <span
                            className="font-bold rounded px-1"
                            style={{
                              background: 'rgba(34,211,160,0.15)',
                              color: '#22d3a0',
                              border: '1px solid rgba(34,211,160,0.3)',
                              fontSize: '0.55rem',
                              letterSpacing: '0.06em',
                            }}
                          >
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="text-xs" style={{ color: getProviderColor(model.provider), opacity: 0.8 }}>
                        {model.provider}
                      </div>
                    </div>
                  </Link>
                </td>
                {ALL_BENCHMARKS.map((bm) => {
                  const score = getScore(model, bm.key);
                  return (
                    <td key={bm.key} className="px-3 py-3 text-center">
                      <BenchmarkScore score={score} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
