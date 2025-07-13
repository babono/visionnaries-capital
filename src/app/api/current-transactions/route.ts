import { NextResponse } from 'next/server';
import { getDatabase, DATABASE_IDS } from '../../../lib/notion';

export async function GET() {
  try {
    const databaseResults = await getDatabase(DATABASE_IDS.LIVE_TRANSACTIONS);
    
    // Filter out sensitive properties before sending to client
    const sanitizedResults = databaseResults.map((item) => {
      // Convert to plain object and remove sensitive data
      const plainItem = JSON.parse(JSON.stringify(item));
      if (plainItem.properties?.Teaser) {
        delete plainItem.properties.Teaser;
      }
      return plainItem;
    });
    
    return NextResponse.json({
      success: true,
      projects: sanitizedResults,
      count: sanitizedResults.length,
      source: 'notion_database',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
} 