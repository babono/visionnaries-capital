import { NextRequest } from 'next/server';
import { createPageInDatabase, DATABASE_IDS, getDatabase } from '@/lib/notion';
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function POST(req: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.NOTION_API_KEY) {
      console.error('Missing NOTION_API_KEY environment variable');
      return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
    }
    
    if (!DATABASE_IDS.EMAIL_TEASER_DOWNLOADER) {
      console.error('Missing EMAIL_TEASER_DOWNLOADER database ID');
      return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
    }
    
    if (!DATABASE_IDS.LIVE_TRANSACTIONS) {
      console.error('Missing LIVE_TRANSACTIONS database ID');
      return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
    }
    
    const { email, projectId } = await req.json();

    if (!email || !projectId) {
      return new Response(JSON.stringify({ error: 'Missing email or project ID.' }), { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format.' }), { status: 400 });
    }

    // Save email to Notion database
    await createPageInDatabase(DATABASE_IDS.EMAIL_TEASER_DOWNLOADER, {
      Email: {
        title: [
          {
            text: {
              content: email,
            },
          },
        ],
      },
    });

    // Get the teaser file after successful email submission
    const results = await getDatabase(DATABASE_IDS.LIVE_TRANSACTIONS);
    const item = (results as PageObjectResponse[]).find((item) => item.id === projectId);
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

  } catch (error) {
    console.error('Error submitting email:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit email.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
