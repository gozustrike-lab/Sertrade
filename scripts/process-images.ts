import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const publicDir = './public';

async function main() {
  // 1. Create OG images (1200x630) with logo overlay
  const logoBuffer = readFileSync(join(publicDir, 'sertrade-logo.jpg'));
  const logoResized = await sharp(logoBuffer)
    .resize({ width: 160, height: 160, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ogPages = [
    { input: 'og-home.jpg', output: 'og-home-final.png' },
    { input: 'og-servicios.jpg', output: 'og-servicios-final.png' },
    { input: 'og-proyectos.jpg', output: 'og-proyectos-final.png' },
  ];

  for (const page of ogPages) {
    const inputPath = join(publicDir, page.input);
    const outputPath = join(publicDir, page.output);

    if (!existsSync(inputPath)) {
      console.log(`Skipping ${page.input} - not found`);
      continue;
    }

    await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover' })
      .composite([
        {
          input: logoResized,
          top: 20,
          left: 20,
        },
      ])
      .png({ quality: 90 })
      .toFile(outputPath);

    console.log(`Created ${page.output}`);
  }

  // 2. Create favicon PNG from SVG
  const svgPath = join(publicDir, 'favicon.svg');
  if (existsSync(svgPath)) {
    await sharp(svgPath)
      .resize(64, 64)
      .png()
      .toFile(join(publicDir, 'favicon.png'));

    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));

    console.log('Created favicon.png and apple-touch-icon.png');
  }

  console.log('All images processed!');
}

main().catch(console.error);
