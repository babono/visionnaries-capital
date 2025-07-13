import { getDatabase, DATABASE_IDS } from '@/lib/notion';
import { NextRequest } from 'next/server';
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id.' }), { status: 400 });
  }
  // Ambil semua data current-transactions
  const results = await getDatabase(DATABASE_IDS.LIVE_TRANSACTIONS);
  const item = (results as PageObjectResponse[]).find((item) => item.id === id);
  if (!item) {
    return new Response(JSON.stringify({ error: 'Not found.' }), { status: 404 });
  }
  // Ambil url file dari property Teaser
  const teaser = item.properties?.Teaser;
  let url: string | undefined = undefined;
  if (teaser && teaser.type === "files" && Array.isArray(teaser.files)) {
    const firstFile = teaser.files[0];
    if (firstFile) {
      if (firstFile.type === "external") {
        url = firstFile.external.url;
      } else if (firstFile.type === "file") {
        url = firstFile.file.url;
      }
    }
  }
  if (!url) {
    return new Response(JSON.stringify({ error: 'Teaser file not found.' }), { status: 404 });
  }
  return new Response(JSON.stringify({ url }), { status: 200 });
} 