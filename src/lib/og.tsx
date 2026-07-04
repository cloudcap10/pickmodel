import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

interface OgCardProps {
  title: string;
  subtitle: string;
  chips: string[];
}

// Shared 1200x630 card used by every opengraph-image route. satori only
// supports flexbox, so every element with children needs display: flex.
export function renderOgCard({ title, subtitle, chips }: OgCardProps): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d0f 0%, #13131a 60%, #1a1333 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #7c6aff, #4a3faa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 20 ? 56 : 72,
              fontWeight: 700,
              color: '#eeeef5',
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#a5a3b8', marginBottom: 48 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {chips.map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '12px 28px',
                borderRadius: 999,
                border: '1px solid rgba(124,106,255,0.4)',
                background: 'rgba(124,106,255,0.12)',
                color: '#c9c2ff',
                fontSize: 26,
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 36,
            fontSize: 24,
            color: '#6d6b80',
          }}
        >
          pickmodel.uk
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
