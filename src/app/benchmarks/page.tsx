import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { loadModels } from '@/lib/data';
import BenchmarksTable from '@/components/BenchmarksTable';

export const metadata: Metadata = {
  title: 'Benchmark Rankings — All 20 AI Models Compared',
  description:
    'Compare 20 AI models across 9 benchmarks: MMLU, GPQA Diamond, MATH, AIME 2025, GSM8K, HumanEval, LiveCodeBench, SWE-bench Verified, and HellaSwag. Sourced from provider reports and independent evaluations.',
  alternates: { canonical: 'https://pickmodel.uk/benchmarks' },
  openGraph: {
    title: 'AI Model Benchmark Rankings — PickModel',
    description:
      'See how Claude Opus 4.7, GPT-4o, Gemini 3.1 Pro, o3, and 16 more models rank across MMLU, GPQA, MATH, HumanEval, and 5 other benchmarks.',
    url: 'https://pickmodel.uk/benchmarks',
    type: 'website',
  },
};

export default function BenchmarksPage() {
  const models = loadModels();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={15} />
        All models
      </Link>

      <div className="flex items-center gap-3 mb-1">
        <BarChart3 size={22} style={{ color: 'var(--accent)' }} />
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
          Benchmark Rankings
        </h1>
      </div>
      <p className="text-base mb-10" style={{ color: 'var(--text-muted)' }}>
        All {models.length} models ranked across 9 benchmarks. Click a column header to sort.
      </p>

      <BenchmarksTable models={models} />

      <p className="text-xs mt-6" style={{ color: 'var(--text-faint)' }}>
        Sources: provider technical reports &amp; independent evaluations (AI Bytes, GPT0X Tracker,
        TokenCalculator, Precision AI Academy, BenchLM, Artificial Analysis). N/A = not yet published
        for this model. Results may vary across benchmark versions and evaluation setups.
      </p>
    </div>
  );
}
