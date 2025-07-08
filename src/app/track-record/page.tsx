"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPageContent, PAGE_IDS } from "../../lib/notion";

// Define types for Notion data
interface NotionRichText {
  type: string;
  plain_text: string;
  text?: {
    content: string;
  };
}

interface NotionBlock {
  id: string;
  type: string;
  heading_2?: {
    rich_text: NotionRichText[];
  };
  paragraph?: {
    rich_text: NotionRichText[];
  };
  [key: string]: unknown;
}

interface Project {
  id: string;
  name: string;
  category: string;
  description?: string;
}

// Helper function to extract text from Notion rich text
function extractTextFromRichText(richText: NotionRichText[]): string {
  return richText?.map((text: NotionRichText) => text.plain_text).join('') || '';
}

// Helper function to parse Notion content into projects
function parseNotionContent(blocks: NotionBlock[]): Project[] {
  const projects: Project[] = [];
  let currentProject: Partial<Project> = {};
  let projectIndex = 0;

  blocks.forEach((block) => {
    if (block.type === 'heading_2' && block.heading_2) {
      // New project starts
      if (currentProject.name) {
        projects.push({
          id: String(projectIndex + 1),
          name: currentProject.name || '',
          category: currentProject.category || 'Financial Strategy & Corporate Advisory',
          description: currentProject.description || '',
        });
        projectIndex++;
      }
      currentProject = {
        name: extractTextFromRichText(block.heading_2.rich_text),
      };
    } else if (block.type === 'paragraph' && block.paragraph) {
      const text = extractTextFromRichText(block.paragraph.rich_text);
      if (text.startsWith('Category:')) {
        currentProject.category = text.replace('Category:', '').trim();
      } else if (text.startsWith('Description:')) {
        currentProject.description = text.replace('Description:', '').trim();
      } else if (text && !currentProject.category) {
        // If no explicit category is set, try to infer from content
        if (text.includes('Capital Advisory') || text.includes('capital')) {
          currentProject.category = 'Capital Advisory';
        } else if (text.includes('M&A') || text.includes('Merger') || text.includes('Acquisition')) {
          currentProject.category = 'Merger & Acquisition';
        } else if (text.includes('Valuation')) {
          currentProject.category = 'Valuation Advisory';
        } else {
          currentProject.category = 'Financial Strategy & Corporate Advisory';
        }
      }
    }
  });

  // Add the last project
  if (currentProject.name) {
    projects.push({
      id: String(projectIndex + 1),
      name: currentProject.name || '',
      category: currentProject.category || 'Financial Strategy & Corporate Advisory',
      description: currentProject.description || '',
    });
  }

  return projects;
}

// Fallback data matching the original website
const fallbackProjects: Project[] = [
  { id: "1", name: "Project Social", category: "Financial Strategy & Corporate Advisory" },
  { id: "2", name: "Project Message", category: "Financial Strategy & Corporate Advisory" },
  { id: "3", name: "Project Shoes", category: "Financial Strategy & Corporate Advisory" },
  { id: "4", name: "Project Paste", category: "Financial Strategy & Corporate Advisory" },
  { id: "5", name: "Project Refurbishment", category: "Financial Strategy & Corporate Advisory" },
  { id: "6", name: "Project P2B", category: "Financial Strategy & Corporate Advisory" },
  { id: "7", name: "Project Clean Room", category: "Financial Strategy & Corporate Advisory" },
  { id: "8", name: "Project Valves", category: "Financial Strategy & Corporate Advisory" },
  { id: "9", name: "W-Locate", category: "Financial Strategy & Corporate Advisory" },
  { id: "10", name: "Project Ed Care", category: "Capital Advisory" },
  { id: "11", name: "Project Shin", category: "Merger & Acquisition" },
  { id: "12", name: "Project Seals", category: "Merger & Acquisition" },
  { id: "13", name: "12 Cup Cakes", category: "Merger & Acquisition" },
  { id: "14", name: "Qoo 10", category: "Capital Advisory" },
  { id: "15", name: "My Republic", category: "Capital Advisory" },
  { id: "16", name: "Project Alpha", category: "Valuation Advisory" },
  { id: "17", name: "Project Beta", category: "Capital Advisory" },
  { id: "18", name: "Project Gamma", category: "Merger & Acquisition" },
  { id: "19", name: "Project Delta", category: "Financial Strategy & Corporate Advisory" },
  { id: "20", name: "Project Epsilon", category: "Valuation Advisory" },
];

const categories = [
  "All",
  "Capital Advisory",
  "Financial Strategy & Corporate Advisory",
  "Merger & Acquisition",
  "Valuation Advisory"
];

const ITEMS_PER_PAGE = 9;

// Skeleton Component
function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 animate-pulse">
      <div className="mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function TrackRecord() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        if (PAGE_IDS.TRACK_RECORD) {
          const notionBlocks = await getPageContent(PAGE_IDS.TRACK_RECORD);
          const parsedProjects = parseNotionContent(notionBlocks as NotionBlock[]);
          if (parsedProjects.length > 0) {
            setProjects(parsedProjects);
          } else {
            setProjects(fallbackProjects);
          }
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Error fetching track record from Notion:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TrackRecordContent projects={projects} loading={loading} />
      <Footer />
    </div>
  );
}

function TrackRecordContent({ projects, loading }: { projects: Project[]; loading: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of projects section
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Record
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Our portfolio of successful projects and transactions
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : page === '...'
                            ? "bg-white text-gray-400 cursor-default"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Results Info */}
              <div className="mt-8 text-center text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
                {selectedCategory !== "All" && (
                  <span className="ml-2">
                    in <span className="font-medium">{selectedCategory}</span>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
