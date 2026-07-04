import { loadModels } from '@/lib/data';
import { renderOgCard, OG_SIZE } from '@/lib/og';

export const dynamic = 'force-static';

export const alt = 'AI API Cost Calculator — rank models by monthly cost';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const models = loadModels();

  return renderOgCard({
    title: 'Cost Calculator',
    subtitle: 'Rank every AI model by your monthly API cost',
    chips: [`${models.length} models`, 'Real-time ranking', 'Free'],
  });
}
