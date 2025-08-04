"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Type definition for Flickity
interface FlickityInstance {
  destroy(): void;
  previous(): void;
  next(): void;
  resize(): void;
}

// Define types for Notion database
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
}

// Helper function to parse Notion database into projects
function parseNotionDatabase(databaseResults: NotionDatabaseItem[]): Project[] {
  const projects: Project[] = [];
  databaseResults.forEach((item, index) => {
    // Extract properties from database item
    const properties = item.properties || {};

    // Get type from "Type" property
    const typeProperty = properties.Type;
    // Handle single select or no multi_select
    const type = typeProperty?.multi_select?.[0]?.name || "";

    // Get other properties - try different naming variations
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

    projects.push({
      id: item.id || String(index + 1),
      type: type,
      logo1: logo1,
      text1: text1,
      logo2: logo2,
      text2: text2,
      transactionValue: transactionValue,
      country: country,
      year: year,
    });
  });

  return projects;
}

// Flickity Slider Component
function FlickitySlider({ projects }: { projects: Project[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const flickityRef = useRef<FlickityInstance | null>(null);

  useEffect(() => {
    if (
      carouselRef.current &&
      projects.length > 0 &&
      typeof window !== "undefined"
    ) {
      // Add resize listener for dynamic resizing
      const handleResize = () => {
        if (flickityRef.current) {
          flickityRef.current.resize();
        }
      };

      // Dynamic import for client-side only
      import("flickity").then((FlickityModule) => {
        const Flickity = FlickityModule.default;

        // Initialize Flickity
        flickityRef.current = new Flickity(carouselRef.current!, {
          autoPlay: false,
          pageDots: false,
          wrapAround: true,
          adaptiveHeight: false,
          imagesLoaded: true,
          cellAlign: "left",
          groupCells: false,
          contain: true,
          prevNextButtons: false, // We'll use custom buttons
          freeScroll: false,
          percentPosition: false,
          cellSelector: ".carousel-cell",
          initialIndex: 0,
          resize: true,
          rightToLeft: false,
        });

        // Force resize and show carousel after initialization
        setTimeout(() => {
          if (flickityRef.current && carouselRef.current) {
            flickityRef.current.resize();
            // Show the carousel after Flickity is ready
            carouselRef.current.style.opacity = '1';
            carouselRef.current.style.transition = 'opacity 0.5s ease-in-out';
          }
        }, 0);

        window.addEventListener("resize", handleResize);

        // Add custom styles for responsive behavior
        const style = document.createElement("style");
        style.setAttribute("data-flickity-custom", "true");
        style.textContent = `
          .carousel {
            white-space: nowrap;
            overflow: hidden;
          }
          .flickity-viewport {
            transition: none !important;
            padding-bottom: 1rem;
          }
          .carousel-cell {
            width: calc(25% - 1.125rem) !important;
            margin-right: 1.5rem !important;
            box-sizing: border-box !important;
            opacity: 1 !important;
            transition: none !important;
            white-space: normal !important;
            vertical-align: top !important;
          }
          .carousel-cell .card-content {
            width: 100%;
            height: 100%;
            min-height: 420px;
            margin-bottom: 1rem;
          }
          @media (max-width: 1024px) {
            .carousel-cell {
              width: calc(33.333% - 1rem) !important;
              margin-right: 1.5rem !important;
            }
          }
          @media (max-width: 768px) {
            .carousel-cell {
              width: 50% !important;
              padding-right: 1.5rem !important;
            }
          }
          @media (max-width: 480px) {
            .carousel-cell {
              width: 100% !important;
              padding: 0 1rem !important;
            }
          }
        `;
        document.head.appendChild(style);
      });

      return () => {
        if (flickityRef.current) {
          flickityRef.current.destroy();
        }
        // Clean up style if it exists
        const existingStyle = document.querySelector(
          "style[data-flickity-custom]"
        );
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
        // Clean up resize listener
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [projects]);

  const handlePrevious = () => {
    if (flickityRef.current) {
      flickityRef.current.previous();
    }
  };

  const handleNext = () => {
    if (flickityRef.current) {
      flickityRef.current.next();
    }
  };

  if (projects.length === 0) {
    return (
      <div className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Leadership across the largest and most complex situations
            </h2>
            <p className="text-gray-600">No projects available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-6 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Leadership across the largest and most complex situations
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8 px-4 sm:px-6 lg:px-8">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-colors shadow-sm z-10"
          >
            <svg
              className="w-6 h-6 text-gray-600 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-colors shadow-sm z-10"
          >
            <svg
              className="w-6 h-6 text-gray-600 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Flickity Carousel */}
        <div ref={carouselRef} className="carousel mb-16 px-0 sm:px-6 lg:px-8 opacity-0">
          {projects.map((project, index) => (
            <div
              key={`project-${project.id}-${index}`}
              className="carousel-cell w-1/4 lg:w-1/4 md:w-1/3 sm:w-1/2 inline-block align-top mr-6"
            >
              <div className="card-content bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                {/* Type */}
                <div className="bg-blue-900 text-white text-center px-4 h-12 flex items-center justify-center">
                  <h3 className="text-sm font-normal uppercase tracking-wide leading-tight">
                    {project.type || "No Type"}
                  </h3>
                </div>

                {/* Content - grows to fill available space */}
                <div className="p-6 text-center flex-grow space-y-6">
                  {/* Logo 1 - only show if exists */}
                  {project.logo1 && (
                    <div className="relative h-20 flex items-center justify-center">
                      <Image
                        src={project.logo1}
                        alt="Logo 1"
                        fill
                        className="object-contain"
                        sizes="250px"
                        priority={index < 4}
                      />
                    </div>
                  )}

                  {/* Text 1 - only show if exists */}
                  {project.text1 && (
                    <div className="text-gray-700 text-sm">
                      <p className="leading-relaxed">{project.text1}</p>
                    </div>
                  )}

                  {/* Logo 2 - only show if exists */}
                  {project.logo2 && (
                    <div className="relative h-20 flex items-center justify-center bg-gray-50 rounded">
                      <Image
                        src={project.logo2}
                        alt="Logo 2"
                        fill
                        className="object-contain"
                        sizes="200px"
                        priority={index < 4}
                      />
                    </div>
                  )}

                  {/* Text 2 - only show if exists */}
                  {project.text2 && (
                    <div className="text-blue-600 text-lg font-semibold">
                      {project.text2}
                    </div>
                  )}
                </div>

                {(project.transactionValue || project.country) && (
                  <div className="px-4 pt-4 text-center space-y-2">
                    {project.transactionValue && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Transaction Value:</span> {project.transactionValue}
                      </div>
                    )}
                    {project.country && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Country:</span> {project.country}
                      </div>
                    )}
                  </div>
                )}

                {/* Year Footer - always at bottom */}
                <div className="p-4 text-center">
                  <div className="text-2xl font-normal text-blue-900">
                    {project.year || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          setProjects([...parsedProjects]);
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/header-trackrecord.jpg"
            alt="Track Record"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-slate-750/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-shadow-lg">
              Track Record
            </h1>
          </div>
        </div>
      </section>
      {loading ? (
        <div className="min-h-[500px] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <h2 className="text-xl text-gray-900 mb-2">
              Loading Track Record...
            </h2>
          </div>
        </div>
      ) : (
        <FlickitySlider projects={projects} />
      )}
    </>
  );
}
