"use client";

import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

// Notion API Types
interface NotionRichText {
  type: string;
  plain_text: string;
  href?: string;
}

interface NotionTitle {
  type: "title";
  title: NotionRichText[];
}

interface NotionRichTextProperty {
  type: "rich_text";
  rich_text: NotionRichText[];
}

interface NotionSelectOption {
  name: string;
  id: string;
  color: string;
}

interface NotionSelectProperty {
  type: "select";
  select: NotionSelectOption | null;
}

interface NotionMultiSelectProperty {
  type: "multi_select";
  multi_select: NotionSelectOption[];
}

interface NotionFilesProperty {
  type: "files";
  files: Array<{
    file?: { url: string };
    external?: { url: string };
    name: string;
  }>;
}

interface NotionProperties {
  Name?: NotionTitle;
  Description?: NotionRichTextProperty;
  Brief?: NotionRichTextProperty;
  Date?: NotionRichTextProperty;
  "Deal Size"?: NotionRichTextProperty;
  Industry?: NotionRichTextProperty;
  Location?: NotionRichTextProperty;
  Type?: NotionSelectProperty | NotionMultiSelectProperty;
  "EBITDA Range"?: NotionRichTextProperty;
  Label?: NotionSelectProperty;
  Value?: NotionRichTextProperty;
  Thumbnail?: NotionFilesProperty;
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to generate thumbnail
function generateThumbnail(name: string, category: string): string {
  const colors = {
    "Growth Capital": { start: "#3B82F6", end: "#1E40AF" },
    "Capital Advisory": { start: "#3B82F6", end: "#1E40AF" },
    "Financial Strategy & Corporate Advisory": { start: "#10B981", end: "#047857" },
    "Merger & Acquisition": { start: "#8B5CF6", end: "#5B21B6" },
    "Valuation Advisory": { start: "#F59E0B", end: "#D97706" },
    "track": { start: "#6B7280", end: "#374151" },
    "live": { start: "#3B82F6", end: "#1E40AF" }
  };
  
  const categoryColors = colors[category as keyof typeof colors] || 
                         colors["track"];
  
  const initials = name.slice(0, 2).toUpperCase();
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${categoryColors.start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${categoryColors.end};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)"/>
      <text x="200" y="150" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
        ${initials}
      </text>
      <text x="200" y="200" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.8">
        ${name.length > 25 ? name.substring(0, 25) + "..." : name}
      </text>
    </svg>
  `)}`;
}

function serializePortfolioItem(
  item: unknown,
  source: "track" | "live"
): {
  slug: string;
  name: string;
  description: string;
  brief: string;
  fields: { label: string; value: string }[];
  thumbnail?: string;
  source: "track" | "live";
} {
  // Type guard to ensure item has properties
  if (
    !item ||
    typeof item !== "object" ||
    !("properties" in item) ||
    !item.properties
  ) {
    return { slug: "", name: "", description: "", brief: "", fields: [], source };
  }

  const props = item.properties as NotionProperties;
  const name =
    props.Name?.type === "title" &&
    Array.isArray(props.Name.title) &&
    props.Name.title.length > 0 &&
    props.Name.title[0]?.plain_text
      ? props.Name.title[0].plain_text
      : "";
  const slug = toSlug(name);

  // Get thumbnail
  const thumbnail =
    props.Thumbnail?.type === "files" &&
    Array.isArray(props.Thumbnail.files) &&
    props.Thumbnail.files.length > 0
      ? props.Thumbnail.files[0]?.external?.url ||
        props.Thumbnail.files[0]?.file?.url
      : generateThumbnail(name, source);

  let description = "";
  let brief = "";
  let fields: { label: string; value: string }[] = [];

  // Extract Brief and Description
  brief =
    props.Brief?.type === "rich_text" &&
    Array.isArray(props.Brief.rich_text) &&
    props.Brief.rich_text[0]
      ? props.Brief.rich_text[0].plain_text
      : "";

  description =
    props.Description?.type === "rich_text" &&
    Array.isArray(props.Description.rich_text) &&
    props.Description.rich_text[0]
      ? props.Description.rich_text[0].plain_text
      : "";

  if (source === "track") {
    fields = [
      { label: "Client", value: name },
      {
        label: "Date",
        value:
          props.Date?.type === "rich_text" &&
          Array.isArray(props.Date.rich_text) &&
          props.Date.rich_text[0]
            ? props.Date.rich_text[0].plain_text
            : "",
      },
      {
        label: "Deal Size",
        value:
          props["Deal Size"]?.type === "rich_text" &&
          Array.isArray(props["Deal Size"].rich_text) &&
          props["Deal Size"].rich_text[0]
            ? props["Deal Size"].rich_text[0].plain_text
            : "",
      },
      {
        label: "Type",
        value:
          props.Type?.type === "select"
            ? props.Type.select?.name || ""
            : props.Type?.type === "multi_select" &&
              Array.isArray(props.Type.multi_select) &&
              props.Type.multi_select[0]
            ? props.Type.multi_select[0].name
            : "",
      },
    ];
  } else {
    // live
    fields = [
      { label: "Client", value: name },
      {
        label: "Industry",
        value:
          props.Industry?.type === "rich_text" &&
          Array.isArray(props.Industry.rich_text) &&
          props.Industry.rich_text[0]
            ? props.Industry.rich_text[0].plain_text
            : "",
      },
      {
        label: "Location",
        value:
          props.Location?.type === "rich_text" &&
          Array.isArray(props.Location.rich_text) &&
          props.Location.rich_text[0]
            ? props.Location.rich_text[0].plain_text
            : "",
      },
      {
        label: "Type",
        value:
          props.Type?.type === "select"
            ? props.Type.select?.name || ""
            : props.Type?.type === "multi_select" &&
              Array.isArray(props.Type.multi_select) &&
              props.Type.multi_select[0]
            ? props.Type.multi_select[0].name
            : "",
      },
      {
        label: "EBITDA Range",
        value:
          props.Label?.type === "select" &&
          props.Label.select?.name === "EBITDA Range" &&
          props.Value?.type === "rich_text" &&
          Array.isArray(props.Value.rich_text) &&
          props.Value.rich_text[0]
            ? props.Value.rich_text[0].plain_text
            : "N/A",
      },
    ];
  }

  return { slug, name, description, brief, fields, thumbnail, source };
}

// Project type for the component state
interface ProjectDetail {
  slug: string;
  name: string;
  description: string;
  brief: string;
  fields: { label: string; value: string }[];
  thumbnail?: string;
  source: "track" | "live";
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        // Use API routes instead of direct database calls
        const [trackResponse, liveResponse] = await Promise.all([
          fetch("/api/track-records"),
          fetch("/api/current-transactions"),
        ]);

        const [trackData, liveData] = await Promise.all([
          trackResponse.json(),
          liveResponse.json(),
        ]);

        const trackItems = trackData.success ? trackData.projects : [];
        const liveItems = liveData.success ? liveData.projects : [];

        const all = [
          ...trackItems.map((item: unknown) =>
            serializePortfolioItem(item, "track")
          ),
          ...liveItems.map((item: unknown) =>
            serializePortfolioItem(item, "live")
          ),
        ];

        const foundProject = all.find((p) => p.slug === resolvedParams.slug);
        if (!foundProject) {
          notFound();
          return;
        }

        setProject(foundProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="animate-pulse">
          {/* Hero Section Loading */}
          <section
            className="text-white pt-20"
            style={{ background: "linear-gradient(to right, #122a5e, #455781)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center w-full">
                <div className="h-12 bg-white bg-opacity-20 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-6 bg-white bg-opacity-20 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </section>

          {/* Main Content Loading */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Section Loading */}
              <div className="order-1 lg:order-1">
                <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg bg-gray-200"></div>
              </div>

              {/* Details Section Loading */}
              <div className="order-2 lg:order-2">
                <div className="space-y-8">
                  {/* Field Loading Skeletons */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-gray-200 pb-4">
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-7 bg-gray-200 rounded w-40"></div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Loading */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 h-16 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Project Overview Loading */}
            <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section
        className="text-white pt-20"
        style={{ background: "linear-gradient(to right, #122a5e, #455781)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {project.brief ||
                "PROVIDED FINANCIAL STRATEGY ADVISORY FOR COMPANY AS THEY SEEK TO EXPAND"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="order-1 lg:order-1">
            {project.thumbnail && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="order-2 lg:order-2">
            <div className="space-y-8">
              {project.fields.map((field: { label: string; value: string }) => (
                <div
                  key={field.label}
                  className="border-b border-gray-200 pb-4"
                >
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    {field.label}
                  </dt>
                  <dd className="text-lg text-gray-900">
                    {field.value || "N/A"}
                  </dd>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href={project.source === "live" ? "/deal-teaser-enquiry" : "/contact"}
                className="flex-1 uppercase text-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                {project.source === "live" ? "Request For Deal Teaser" : "Interested To Find Out More? Contact Us."}
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Description */}
        {project.description && (
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Project Overview
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
