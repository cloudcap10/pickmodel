import { loadModels } from '@/lib/data';
import { renderOgCard, OG_SIZE } from '@/lib/og';

export const dynamic = 'force-static';

export const alt = 'AI model benchmark rankings across 9 benchmarks';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const models = loadModels();

  return renderOgCard({
    title: 'Benchmark Rankings',
    subtitle: `${models.length} AI models across 9 benchmarks`,
    chips: ['MMLU', 'GPQA', 'SWE-bench', 'HumanEval', 'AIME'],
  });
}
