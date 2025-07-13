import { NextRequest } from 'next/server';
import { getDatabase, DATABASE_IDS } from '@/lib/notion';
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const PASSWORD = 'vision2024';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const password = searchParams.get('password');

  if (!id || !password) {
    return new Response(JSON.stringify({ error: 'Missing id or password.' }), { status: 400 });
  }

  if (password !== PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password.' }), { status: 401 });
  }

  try {
    // Get the teaser URL from Notion
    const results = await getDatabase(DATABASE_IDS.LIVE_TRANSACTIONS);
    const item = (results as PageObjectResponse[]).find((item) => item.id === id);
    if (!item) {
      return new Response(JSON.stringify({ error: 'Project not found.' }), { status: 404 });
    }

    // Get file URL from Teaser property
    const teaser = item.properties?.Teaser;
    let fileUrl: string | undefined = undefined;
    let fileName = 'teaser.pdf';
    if (teaser && teaser.type === "files" && Array.isArray(teaser.files)) {
      const firstFile = teaser.files[0];
      if (firstFile) {
        fileName = firstFile.name;
        if (firstFile.type === "external") {
          fileUrl = firstFile.external.url;
        } else if (firstFile.type === "file") {
          fileUrl = firstFile.file.url;
        }
      }
    }

    if (!fileUrl) {
      return new Response(JSON.stringify({ error: 'Teaser file not found.' }), { status: 404 });
    }

    // Fetch the file from remote URL and stream to user
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) {
      return new Response(JSON.stringify({ error: 'File not found.' }), { status: 404 });
    }
    const contentType = fileRes.headers.get('content-type') || 'application/octet-stream';
    return new Response(fileRes.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Download failed.' }), { status: 500 });
  }
} 