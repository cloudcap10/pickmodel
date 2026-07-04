import { loadModels } from '@/lib/data';
import { renderOgCard, OG_SIZE } from '@/lib/og';

export const dynamic = 'force-static';

export const alt = 'PickModel — Compare AI Models Side by Side';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const models = loadModels();
  const providerCount = new Set(models.map((m) => m.provider)).size;

  return renderOgCard({
    title: 'PickModel',
    subtitle: 'Compare AI Models Side by Side',
    chips: [`${models.length} models`, `${providerCount} providers`, 'Pricing', 'Benchmarks'],
  });
}
