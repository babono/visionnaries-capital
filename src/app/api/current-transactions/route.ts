import { NextResponse } from 'next/server';
import { getDatabase, DATABASE_IDS } from '../../../lib/notion';

export async function GET() {
  try {
    const databaseResults = await getDatabase(DATABASE_IDS.LIVE_TRANSACTIONS);
    return NextResponse.json({
      success: true,
      projects: databaseResults,
      count: databaseResults.length,
      source: 'notion_database',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
} 