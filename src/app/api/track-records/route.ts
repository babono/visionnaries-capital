import { NextResponse } from 'next/server';
import { getDatabase, DATABASE_IDS } from '../../../lib/notion';

export async function GET() {
  try {
    if (!DATABASE_IDS.TRACK_RECORDS) {
      console.log('❌ NOTION_DATABASE_ID_TRACK_RECORDS not set');
      return NextResponse.json({ success: false, error: 'Database ID not configured' });
    }

    const databaseResults = await getDatabase(DATABASE_IDS.TRACK_RECORDS, [
      {
        property: 'Order',
        direction: 'ascending'
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      projects: databaseResults, // Keep as 'projects' for backward compatibility with existing code
      trackRecords: databaseResults, // Add new field name for future use
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