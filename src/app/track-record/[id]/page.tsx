"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Type definitions
interface NotionDatabaseItem {
  id: string;
  properties: {
    [key: string]: {
      title?: Array<{ plain_text: string }>;
      select?: { name: string };
      multi_select?: Array<{ name: string }>;
      rich_text?: Array<{ plain_text: string }>;
      number?: number;
      files?: Array<{
        file?: { url: string };
        external?: { url: string };
      }>;
    };
  };
}

interface Project {
  id: string;
  type: string;
  logo1?: string;
  text1?: string;
  logo2?: string;
  text2?: string;
  transactionValue?: string;
  country?: string;
  year?: string;
  explanation?: string;
  name?: string;
}

// Notion block types for rendering
interface NotionRichText {
  plain_text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
}

interface NotionBlock {
  id: string;
  type: string;
  paragraph?: {
    rich_text: NotionRichText[];
  };
  heading_1?: {
    rich_text: NotionRichText[];
  };
  heading_2?: {
    rich_text: NotionRichText[];
  };
  heading_3?: {
    rich_text: NotionRichText[];
  };
  bulleted_list_item?: {
    rich_text: NotionRichText[];
  };
  numbered_list_item?: {
    rich_text: NotionRichText[];
  };
  quote?: {
    rich_text: NotionRichText[];
  };
  image?: {
    external?: { url: string };
    file?: { url: string };
    caption?: NotionRichText[];
  };
}

// Helper function to parse Notion database item
function parseNotionDatabaseItem(item: NotionDatabaseItem): Project {
  const properties = item.properties || {};

  const nameProperty = properties.Name;
  const name = nameProperty?.title?.[0]?.plain_text;

  const typeProperty = properties.Type;
  const type = typeProperty?.multi_select?.[0]?.name || "";

  const logo1Property = properties["Logo 1"];
  const logo1 =
    logo1Property?.files?.[0]?.external?.url ||
    logo1Property?.files?.[0]?.file?.url;

  const text1Property = properties["Text 1"];
  const text1 = text1Property?.rich_text?.[0]?.plain_text;

  const logo2Property = properties["Logo 2"];
  const logo2 =
    logo2Property?.files?.[0]?.external?.url ||
    logo2Property?.files?.[0]?.file?.url;

  const text2Property = properties["Text 2"];
  const text2 = text2Property?.rich_text?.[0]?.plain_text;

  const yearProperty = properties.Year;
  const year =
    yearProperty?.number?.toString() ||
    yearProperty?.rich_text?.[0]?.plain_text;

  const transactionValueProperty = properties["Transaction Value"];
  const transactionValue = transactionValueProperty?.rich_text?.[0]?.plain_text;

  const countryProperty = properties.Country;
  const country = countryProperty?.rich_text?.[0]?.plain_text;

  const explanationProperty = properties.Explanation;
  const explanation = explanationProperty?.rich_text?.[0]?.plain_text;

  return {
    id: item.id,
    name: name,
    type: type,
    logo1: logo1,
    text1: text1,
    logo2: logo2,
    text2: text2,
    transactionValue: transactionValue,
    country: country,
    year: year,
    explanation: explanation,
  };
}

// Component to render Notion blocks
function NotionBlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mb-4 text-gray-700 leading-relaxed">
          {block.paragraph?.rich_text?.map((text: NotionRichText, index: number) => (
            <span key={index} className={text.annotations?.bold ? 'font-semibold' : ''}>
              {text.plain_text}
            </span>
          ))}
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">
          {block.heading_1?.rich_text?.map((text: NotionRichText) => text.plain_text).join('')}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-6">
          {block.heading_2?.rich_text?.map((text: NotionRichText) => text.plain_text).join('')}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-xl font-medium text-gray-900 mb-3 mt-4">
          {block.heading_3?.rich_text?.map((text: NotionRichText) => text.plain_text).join('')}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li className="mb-2 text-gray-700 leading-relaxed">
          {block.bulleted_list_item?.rich_text?.map((text: NotionRichText, index: number) => (
            <span key={index} className={text.annotations?.bold ? 'font-semibold' : ''}>
              {text.plain_text}
            </span>
          ))}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="mb-2 text-gray-700 leading-relaxed">
          {block.numbered_list_item?.rich_text?.map((text: NotionRichText, index: number) => (
            <span key={index} className={text.annotations?.bold ? 'font-semibold' : ''}>
              {text.plain_text}
            </span>
          ))}
        </li>
      );

    case 'image':
      const imageUrl = block.image?.external?.url || block.image?.file?.url;
      if (!imageUrl) return null;
      
      return (
        <div className="my-6">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={imageUrl}
              alt={block.image?.caption?.[0]?.plain_text || "Image"}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {block.image?.caption?.[0]?.plain_text && (
            <p className="text-sm text-gray-500 text-center mt-2">
              {block.image.caption[0].plain_text}
            </p>
          )}
        </div>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-4 bg-blue-50 rounded-r">
          <p className="text-gray-700 italic">
            {block.quote?.rich_text?.map((text: NotionRichText, index: number) => (
              <span key={index} className={text.annotations?.bold ? 'font-semibold' : ''}>
                {text.plain_text}
              </span>
            ))}
          </p>
        </blockquote>
      );

    case 'divider':
      return <hr className="my-6 border-t border-gray-300" />;

    default:
      return null;
  }
}

export default function TrackRecordDetail() {
  const params = useParams();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [notionBlocks, setNotionBlocks] = useState<NotionBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrackRecordDetail() {
      if (!id) return;
      
      setLoading(true);
      setError(null);

      try {
        // Fetch the specific track record item and its Notion page content
        const response = await fetch(`/api/track-records/${id}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.error || 'Failed to fetch track record details');
          return;
        }

        if (data.project) {
          setProject(parseNotionDatabaseItem(data.project));
        }

        if (data.blocks) {
          setNotionBlocks(data.blocks);
        }
      } catch (err) {
        console.error('Error fetching track record details:', err);
        setError('Failed to load track record details');
      } finally {
        setLoading(false);
      }
    }

    fetchTrackRecordDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="min-h-[500px] flex items-center justify-center flex-grow">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <h2 className="text-xl text-gray-900 mb-2">Loading Track Record Details...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="min-h-[500px] flex items-center justify-center flex-grow">
          <div className="text-center">
            <h2 className="text-xl text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error || 'Track record not found'}</p>
            <Link
              href="/track-record"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Track Record
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Group consecutive list items
  const groupedBlocks = notionBlocks.reduce((acc: Array<NotionBlock | { type: 'bulleted_list' | 'numbered_list'; items: NotionBlock[] }>, block, index) => {
    const prevBlock = notionBlocks[index - 1];
    
    if (block.type === 'bulleted_list_item') {
      if (prevBlock?.type === 'bulleted_list_item' && acc.length > 0 && acc[acc.length - 1].type === 'bulleted_list') {
        (acc[acc.length - 1] as { type: 'bulleted_list'; items: NotionBlock[] }).items.push(block);
      } else {
        acc.push({ type: 'bulleted_list', items: [block] });
      }
    } else if (block.type === 'numbered_list_item') {
      if (prevBlock?.type === 'numbered_list_item' && acc.length > 0 && acc[acc.length - 1].type === 'numbered_list') {
        (acc[acc.length - 1] as { type: 'numbered_list'; items: NotionBlock[] }).items.push(block);
      } else {
        acc.push({ type: 'numbered_list', items: [block] });
      }
    } else {
      acc.push(block);
    }
    
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/header-trackrecord.jpg"
            alt="Track Record Detail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-slate-750/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-shadow-lg">
              {project.name || project.type || 'Track Record Detail'}
            </h1>
            {project.year && (
              <p className="text-xl text-blue-200 mb-4">{project.year}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/track-record"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Track Record
            </Link>
          </div>

          {/* Project Summary Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <span className="inline-block bg-blue-900 text-white px-4 py-2 rounded text-sm font-medium uppercase tracking-wide">
                    {project.type}
                  </span>
                </div>

                {project.logo1 && (
                  <div className="relative h-16 mb-4">
                    <Image
                      src={project.logo1}
                      alt="Company Logo"
                      fill
                      className="object-contain object-left"
                      sizes="300px"
                    />
                  </div>
                )}

                {project.text1 && (
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {project.text1}
                  </p>
                )}

                {project.logo2 && (
                  <div className="relative h-20 bg-gray-50 rounded p-4 mb-4">
                    <Image
                      src={project.logo2}
                      alt="Acquiring Company Logo"
                      fill
                      className="object-contain"
                      sizes="300px"
                    />
                  </div>
                )}

                {project.text2 && (
                  <p className="text-blue-600 text-xl font-semibold mb-4">
                    {project.text2}
                  </p>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {project.year && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Year</h3>
                    <p className="text-3xl font-light text-blue-900">{project.year}</p>
                  </div>
                )}

                {project.transactionValue && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Transaction Value</h3>
                    <p className="text-lg font-medium text-gray-900">{project.transactionValue}</p>
                  </div>
                )}

                {project.country && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Country</h3>
                    <p className="text-lg font-medium text-gray-900">{project.country}</p>
                  </div>
                )}

                {project.explanation && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Deal Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{project.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notion Page Content */}
          {notionBlocks.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 pb-4 border-b">
                Deal Details
              </h2>
              
              <div className="prose prose-lg max-w-none">
                {groupedBlocks.map((block, index) => {
                  if ('items' in block && block.type === 'bulleted_list') {
                    return (
                      <ul key={`bulleted-${index}`} className="list-disc list-inside mb-6 space-y-2">
                        {block.items.map((item: NotionBlock, itemIndex: number) => (
                          <NotionBlockRenderer key={`${item.id}-${itemIndex}`} block={item} />
                        ))}
                      </ul>
                    );
                  } else if ('items' in block && block.type === 'numbered_list') {
                    return (
                      <ol key={`numbered-${index}`} className="list-decimal list-inside mb-6 space-y-2">
                        {block.items.map((item: NotionBlock, itemIndex: number) => (
                          <NotionBlockRenderer key={`${item.id}-${itemIndex}`} block={item} />
                        ))}
                      </ol>
                    );
                  } else if ('id' in block) {
                    return <NotionBlockRenderer key={block.id || index} block={block} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          )}

          {/* Back Button at Bottom */}
          <div className="mt-12 text-center">
            <Link
              href="/track-record"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Track Record
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
