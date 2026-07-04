import { ImageResponse } from 'next/og';
import { loadModels, getModelById } from '@/lib/data';
import { formatContextWindow, formatPrice, getProviderColor } from '@/lib/utils';

export const dynamic = 'force-static';

export const alt = 'AI model specs, pricing, and benchmarks';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return loadModels().map((m) => ({ id: m.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d0d0f',
            color: '#eeeef5',
            fontSize: 64,
          }}
        >
          PickModel
        </div>
      ),
      size,
    );
  }

  const providerColor = getProviderColor(model.provider);
  const stats = [
    { label: 'Context', value: formatContextWindow(model.contextWindow) },
    { label: 'Input / 1M', value: formatPrice(model.inputPricePer1M) },
    { label: 'Output / 1M', value: formatPrice(model.outputPricePer1M) },
    ...(model.benchmarks?.mmlu != null
      ? [{ label: 'MMLU', value: `${model.benchmarks.mmlu}%` }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px',
          background: 'linear-gradient(135deg, #0d0d0f 0%, #13131a 70%, #1a1333 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 10,
            background: providerColor,
          }}
        />
        <div style={{ display: 'flex', fontSize: 30, color: providerColor, marginBottom: 12 }}>
          {model.provider}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            color: '#eeeef5',
            marginBottom: 20,
          }}
        >
          {model.name}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#a5a3b8', marginBottom: 48 }}>
          Specs, Pricing &amp; Benchmarks
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '18px 28px',
                borderRadius: 16,
                border: '1px solid rgba(124,106,255,0.35)',
                background: 'rgba(124,106,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', fontSize: 20, color: '#8b89a0' }}>{stat.label}</div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 34,
                  fontWeight: 700,
                  color: '#eeeef5',
                  marginTop: 6,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 36,
            right: 80,
            fontSize: 24,
            color: '#6d6b80',
          }}
        >
          pickmodel.uk
        </div>
      </div>
    ),
    size,
  );
}
