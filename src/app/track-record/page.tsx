"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Define types for Notion database
interface NotionDatabaseItem {
  id: string;
  properties: {
    [key: string]: {
      title?: Array<{ plain_text: string }>;
      select?: { name: string };
      multi_select?: Array<{ name: string }>;
      rich_text?: Array<{ plain_text: string }>;
      files?: Array<{
        file?: { url: string };
        external?: { url: string };
      }>;
    };
  };
}

interface Project {
  id: string;
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
}

// Helper function to generate thumbnail placeholder
function generateThumbnail(projectName: string, category: string): string {
  // Generate colors based on the category
  const colors = {
    "Capital Advisory": { start: "#3B82F6", end: "#1E40AF" },
    "Financial Strategy & Corporate Advisory": {
      start: "#10B981",
      end: "#047857",
    },
    "Merger & Acquisition": { start: "#8B5CF6", end: "#5B21B6" },
    "Valuation Advisory": { start: "#F59E0B", end: "#D97706" },
  };

  const categoryColors = colors[category as keyof typeof colors] || {
    start: "#6B7280",
    end: "#374151",
  };

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${
            categoryColors.start
          };stop-opacity:1" />
          <stop offset="100%" style="stop-color:${
            categoryColors.end
          };stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#grad)"/>
      <text x="150" y="100" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${
          projectName.length > 20
            ? projectName.substring(0, 20) + "..."
            : projectName
        }
      </text>
      <text x="150" y="130" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
        ${category.split(" ")[0]} ${category.split(" ")[1] || ""}
      </text>
    </svg>
  `)}`;
}

// Helper function to parse Notion database into projects
function parseNotionDatabase(databaseResults: NotionDatabaseItem[]): Project[] {
  const projects: Project[] = [];

  databaseResults.forEach((item, index) => {
    // Extract properties from database item
    const properties = item.properties || {};

    // Get project name from "Name" property (title type)
    const nameProperty = properties.Name;
    const projectName =
      nameProperty?.title?.[0]?.plain_text || `Project ${index + 1}`;

    // Get category from "Type" property (multi_select type)
    const typeProperty = properties.Type;
    const category =
      typeProperty?.multi_select?.[0]?.name ||
      "Financial Strategy & Corporate Advisory";

    // Get thumbnail from "Thumbnail" property (files type)
    const thumbnailProperty = properties.Thumbnail;
    const thumbnail =
      thumbnailProperty?.files?.[0]?.external?.url ||
      thumbnailProperty?.files?.[0]?.file?.url ||
      generateThumbnail(projectName, category);

    projects.push({
      id: item.id || String(index + 1),
      name: projectName,
      category: category,
      description: "", // Remove description
      thumbnail: thumbnail,
    });
  });

  return projects;
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const categories = [
  "All",
  "Capital Advisory",
  "Financial Strategy & Corporate Advisory",
  "Merger & Acquisition",
  "Valuation Advisory",
];

const ITEMS_PER_PAGE = 9;

// Skeleton Component
function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
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
        const response = await fetch("/api/track-records");
        const data = await response.json();

        if (!response.ok || !data.success) {
          setProjects([]);
          return;
        }

        if (!data.projects || data.projects.length === 0) {
          setProjects([]);
          return;
        }

        const parsedProjects = parseNotionDatabase(
          data.projects as NotionDatabaseItem[]
        );

        if (parsedProjects.length > 0) {
          setProjects([...parsedProjects].reverse());
        } else {
          setProjects([]);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        setProjects([]);
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

function TrackRecordContent({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
    window.scrollTo({ top: 300, behavior: "smooth" });
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
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="text-white pt-20" style={{ background: 'linear-gradient(to right, #122a5e, #455781)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Record
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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
                  <Link href={`/portfolio/${toSlug(project.name)}`} key={project.id} className="h-full">
                    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden group">
                        <Image
                          src={project.thumbnail || generateThumbnail(project.name, project.category)}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                        {/* Overlay and Centered Text (hover effect, if needed) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-full bg-black transition-all duration-300 opacity-0 group-hover:opacity-60 absolute inset-0"></div>
                          <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4 z-10">
                            {project.name}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {project.name}
                          </h3>
                          <div className="text-blue-700 italic text-sm">
                            {project.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={page === "..."}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : page === "..."
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
              {filteredProjects.length > 0 && (
                <div className="mt-8 text-center text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
                  {selectedCategory !== "All" && (
                    <span className="ml-2">
                      in <span className="font-medium">{selectedCategory}</span>
                    </span>
                  )}
                </div>
              )}

              {!loading && filteredProjects.length === 0 && (
                <div className="text-center text-gray-500 py-16 text-lg">
                  No data found.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
