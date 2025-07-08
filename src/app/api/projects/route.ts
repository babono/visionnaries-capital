import { NextResponse } from 'next/server';
import { getDatabase, DATABASE_IDS } from '../../../lib/notion';

export async function GET() {
  try {
    if (!DATABASE_IDS.PROJECTS) {
      console.log('❌ NOTION_DATABASE_ID_PROJECTS not set');
      return NextResponse.json({ success: false, error: 'Database ID not configured' });
    }

    const databaseResults = await getDatabase(DATABASE_IDS.PROJECTS);

    return NextResponse.json({ 
      success: true, 
      projects: databaseResults,
      count: databaseResults.length,
      source: 'notion_database'
    });
    
  } catch (error) {
    console.error('💥 API: Error fetching from Notion database:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 