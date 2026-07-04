import { renderOgCard, OG_SIZE } from '@/lib/og';

export const dynamic = 'force-static';

export const alt = 'About PickModel — free, open-source AI model comparison';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOgCard({
    title: 'About PickModel',
    subtitle: 'Free, open-source AI model comparison',
    chips: ['Open source', 'Community data', 'MIT License'],
  });
}
