import { NextResponse } from "next/server";
import { getPublishedClient, getVideoUrl, getImageUrl, plainText } from "@/lib/sanity.client";
import { ALL_HERO_SLIDES_QUERY } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {},
    sanity_connection: null,
    hero_slides_raw: null,
    hero_slides_processed: null,
    video_url_tests: [],
  };

  // --- ENV VARS (masked) ---
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const hasReadToken = !!process.env.SANITY_API_READ_TOKEN;
  const hasPublicReadToken = !!process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

  result.env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId ? `${projectId.slice(0, 4)}****${projectId.slice(-4)}` : "NOT SET",
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_READ_TOKEN: hasReadToken ? `SET (${process.env.SANITY_API_READ_TOKEN?.length} chars)` : "NOT SET",
    NEXT_PUBLIC_SANITY_API_READ_TOKEN: hasPublicReadToken ? `SET (${process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN?.length} chars)` : "NOT SET",
    NODE_ENV: process.env.NODE_ENV || "unknown",
  };

  // --- SANITY CONNECTION ---
  try {
    const client = getPublishedClient();
    if (!client) {
      result.sanity_connection = { status: "ERROR", message: "Could not create Sanity client (missing NEXT_PUBLIC_SANITY_PROJECT_ID)" };
    } else {
      // Quick connectivity test
      const testQuery = `count(*[_type == "heroSlide"])`;
      const count = await client.fetch<number>(testQuery);
      result.sanity_connection = {
        status: "OK",
        message: "Sanity client connected successfully",
        projectId: projectId ? `${projectId.slice(0, 4)}****` : null,
        dataset,
        perspective: "published",
        useCdn: true,
        heroSlideCount: count,
      };
    }
  } catch (err: unknown) {
    result.sanity_connection = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    };
  }

  // --- RAW HERO SLIDES (exactly what Sanity returns) ---
  try {
    const client = getPublishedClient();
    if (client) {
      // Fetch with ALL fields raw — no processing
      const rawQuery = `*[_type == "heroSlide"] | order(order asc) {
        _id, _type, _rev, title,
        backgroundVideoMp4 { asset-> { _id, _type, url, mimeType, path, originalFilename, size, sha1hash } },
        backgroundVideoWebm { asset-> { _id, _type, url, mimeType, path, originalFilename, size, sha1hash } },
        backgroundImage { asset-> { _id, _type } },
        posterImage { asset-> { _id, _type } },
        videoAutoplay, videoMuted, videoLoop,
        order
      }`;
      const rawSlides = await client.fetch<Record<string, unknown>[]>(rawQuery);
      result.hero_slides_raw = rawSlides;

      // --- PROCESSED HERO SLIDES (what getVideoUrl produces) ---
      const processedSlides = rawSlides.map((slide: any) => {
        const videoMp4Url = getVideoUrl(slide.backgroundVideoMp4);
        const videoWebmUrl = getVideoUrl(slide.backgroundVideoWebm);
        return {
          _id: slide._id,
          title: slide.title,
          has_backgroundVideoMp4: !!slide.backgroundVideoMp4,
          has_backgroundVideoWebm: !!slide.backgroundVideoWebm,
          raw_videoMp4_asset: slide.backgroundVideoMp4?.asset || null,
          raw_videoWebm_asset: slide.backgroundVideoWebm?.asset || null,
          computed_videoMp4_url: videoMp4Url,
          computed_videoWebm_url: videoWebmUrl,
          videoAutoplay: slide.videoAutoplay,
          videoMuted: slide.videoMuted,
          videoLoop: slide.videoLoop,
        };
      });
      result.hero_slides_processed = processedSlides;

      // --- VIDEO URL TESTS ---
      const videoTests: string[] = [];
      for (const slide of rawSlides) {
        const s = slide as any;
        if (s.backgroundVideoMp4?.asset) {
          const a = s.backgroundVideoMp4.asset;
          videoTests.push(`--- Slide: ${s.title} (MP4) ---`);
          videoTests.push(`  asset._id: ${a._id || "MISSING"}`);
          videoTests.push(`  asset._type: ${a._type || "MISSING"}`);
          videoTests.push(`  asset.url: ${a.url || "MISSING"}`);
          videoTests.push(`  asset.mimeType: ${a.mimeType || "MISSING"}`);
          videoTests.push(`  asset.path: ${a.path || "MISSING"}`);
          videoTests.push(`  asset.originalFilename: ${a.originalFilename || "MISSING"}`);
          videoTests.push(`  getVideoUrl() => ${getVideoUrl(s.backgroundVideoMp4) || "NULL"}`);
          videoTests.push(`  CDN direct: https://cdn.sanity.io/files/${projectId}/${dataset}/${a._id}`);
          if (a.originalFilename) {
            videoTests.push(`  CDN + file: https://cdn.sanity.io/files/${projectId}/${dataset}/${a._id}/${encodeURIComponent(a.originalFilename)}`);
          }
        } else {
          videoTests.push(`--- Slide: ${s.title} --- NO videoMp4 field populated`);
        }
      }
      result.video_url_tests = videoTests;
    }
  } catch (err: unknown) {
    result.hero_slides_raw = { error: err instanceof Error ? err.message : String(err) };
    result.hero_slides_processed = null;
    result.video_url_tests = [];
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}