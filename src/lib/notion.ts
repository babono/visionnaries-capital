import { Client } from '@notionhq/client';

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database IDs
export const DATABASE_IDS = {
  TRACK_RECORDS: process.env.NOTION_DATABASE_ID_TRACK_RECORDS || '',
  SUCCESS_STORIES: process.env.NOTION_DATABASE_ID_SUCCESS_STORIES || '',
  SERVICES: process.env.NOTION_DATABASE_ID_SERVICES || '',
  LIVE_TRANSACTIONS: process.env.NOTION_DATABASE_ID_LIVE_TRANSACTIONS || '',
};

// Page IDs
export const PAGE_IDS = {
  ABOUT: process.env.NOTION_PAGE_ID_ABOUT || '',
  NETWORK: process.env.NOTION_PAGE_ID_NETWORK || '',
  TRACK_RECORD: process.env.NOTION_PAGE_ID_TRACK_RECORD || '',
};

// Helper function to get database
export async function getDatabase(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching database:', error);
    return [];
  }
}

// Helper function to get page
export async function getPage(pageId: string) {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });
    return response;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Helper function to get page content
export async function getPageContent(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
} 