import { NextResponse } from 'next/server';
import { notion, getPageContent } from '../../../../lib/notion';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Track record ID is required' });
    }

    // Fetch the specific page/database item
    const page = await notion.pages.retrieve({
      page_id: id,
    });

    if (!page) {
      return NextResponse.json({ success: false, error: 'Track record not found' });
    }

    // Fetch the page content (blocks)
    const blocks = await getPageContent(id);

    return NextResponse.json({ 
      success: true, 
      project: page,
      blocks: blocks,
      source: 'notion_page'
    });
    
  } catch (error) {
    console.error('💥 API: Error fetching track record details:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch track record details' 
    });
  }
}
