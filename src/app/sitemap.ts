import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import type { MetadataRoute } from 'next';
import { loadModels } from '@/lib/data';

export const dynamic = 'force-static';

const SITE_URL = 'https://pickmodel.uk';

// Stable lastModified tied to actual data changes: last git commit touching
// models-data.yml, falling back to file mtime, then build time. A lastmod
// that changes on every build gets ignored by search engines.
function dataLastModified(): Date {
  try {
    const iso = execSync('git log -1 --format=%cI -- models-data.yml', {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    if (iso) return new Date(iso);
  } catch {
    // not a git checkout, or shallow clone without history for this file
  }
  try {
    return fs.statSync(path.join(process.cwd(), 'models-data.yml')).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const models = loadModels();
  const lastModified = dataLastModified();

  const modelPages = models.map((m) => ({
    url: `${SITE_URL}/model/${m.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: m.tier === 'frontier' ? 0.9 : 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/benchmarks`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    ...modelPages,
  ];
}
