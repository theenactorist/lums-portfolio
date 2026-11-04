import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from './seo';

const size = { width: 1200, height: 630 };

export async function portfolioImage(project) {
  const path = project?.image ?? site.portrait;
  const bytes = await readFile(join(process.cwd(), 'public', path));
  // Some retained covers have a PNG filename but contain JPEG bytes.
  const mime = bytes[0] === 0xff && bytes[1] === 0xd8 ? 'image/jpeg' : 'image/png';
  const image = `data:${mime};base64,${bytes.toString('base64')}`;
  const coverNote = project?.imageAlt.startsWith('Generated') ? 'Generated cover concept' : project?.imageAlt.startsWith('Recreated') ? 'Recreated review preview' : null;
  return new ImageResponse(
    <div style={{ ...size, display: 'flex', flexDirection: 'column', background: '#171717', color: '#fafafa', padding: '48px 56px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-1.5px' }}>Lums*</div>
        <div style={{ fontSize: 22, color: '#b8b8bd' }}>olumideolusesi.com</div>
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: project ? 590 : 600 }}>
          {project ? <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', fontSize: 24, color: '#b8b8bd', marginBottom: 24 }}>{`${project.companyLogoAlt} case study`}</div>
            <div style={{ fontSize: project.title.length > 65 ? 49 : 54, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-2px' }}>{project.title}</div>
          </div> : <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-4px' }}><span>Olumide</span><span>Olusesi.</span></div>
            <div style={{ fontSize: 32, marginTop: 28, letterSpacing: '-0.6px' }}>Product design engineer.</div>
            <div style={{ fontSize: 25, color: '#b8b8bd', marginTop: 12 }}>Based in Toronto.</div>
          </div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: project ? 440 : 358 }}>
          <div style={{ display: 'flex', height: project ? 320 : 410, borderRadius: 12, overflow: 'hidden', background: '#e4e4e7' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} width={project ? 440 : 358} height={project ? 320 : 410} alt="" style={{ width: '100%', height: '100%', objectFit: project ? 'contain' : 'cover' }} />
          </div>
          {coverNote ? <div style={{ display: 'flex', marginTop: 10, fontSize: 16, color: '#b8b8bd' }}>{coverNote}</div> : null}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #454549', paddingTop: 22, alignItems: 'center', justifyContent: 'space-between', fontSize: 21, color: '#b8b8bd' }}>
        <span>{project ? 'Olumide Olusesi, product design engineer' : 'Product sense × Design craft × AI'}</span>
        <span>{project ? 'Selected work' : 'Portfolio'}</span>
      </div>
    </div>,
    { ...size, headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' } },
  );
}
