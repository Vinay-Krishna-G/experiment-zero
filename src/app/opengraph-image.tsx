import { ImageResponse } from 'next/og';
import { SITE_SETTINGS, PROFILE } from '@/content';

export const runtime = 'edge';
export const alt = SITE_SETTINGS.siteName;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#fdfbf7',
          padding: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
          }}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#d4af37', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            VK •
          </div>
          
          <div style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', letterSpacing: '-0.02em' }}>
            {PROFILE.name}
          </div>
          
          <div style={{ fontSize: '32px', color: '#d4cfc3', marginBottom: '80px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Full Stack Developer
          </div>

          <div style={{ display: 'flex', gap: '32px', fontSize: '24px', color: '#8c887d' }}>
            <span style={{ border: '1px solid rgba(212, 175, 55, 0.3)', padding: '12px 24px', borderRadius: '4px' }}>CodeMelt</span>
            <span style={{ border: '1px solid rgba(212, 175, 55, 0.3)', padding: '12px 24px', borderRadius: '4px' }}>PromptVault</span>
            <span style={{ border: '1px solid rgba(212, 175, 55, 0.3)', padding: '12px 24px', borderRadius: '4px' }}>StudySpark</span>
            <span style={{ border: '1px solid rgba(212, 175, 55, 0.3)', padding: '12px 24px', borderRadius: '4px' }}>Portfolio</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
