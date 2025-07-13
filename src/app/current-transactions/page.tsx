"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Types
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
      url?: string;
    };
  };
  url?: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  brief: string;
  thumbnail?: string;
  url?: string;
  label?: string;
  value?: string;
}

function parseNotionDatabase(databaseResults: NotionDatabaseItem[]): Project[] {
  const projects: Project[] = [];
  databaseResults.forEach((item, index) => {
    const properties = item.properties || {};
    // Kolom 1: Description (kiri)
    const nameProperty = properties.Name;
    const projectName =
      nameProperty?.title?.[0]?.plain_text || `Project ${index + 1}`;
    // Kolom 2: EBITDA Range (M)
    const ebitdaProperty = properties.Value;
    const value = ebitdaProperty?.rich_text?.[0]?.plain_text || "";
    // Kolom 3: Description (kanan)
    const descriptionProperty = properties.Description;
    const description = descriptionProperty?.rich_text?.[0]?.plain_text || "";
    // Kolom 4: Deal Teaser (url)
    const dealTeaserProperty = properties.Teaser;
    const url =
      dealTeaserProperty?.files?.[0]?.external?.url ||
      dealTeaserProperty?.files?.[0]?.file?.url;
    projects.push({
      id: item.id || String(index + 1),
      name: projectName,
      category: "",
      description,
      brief: "",
      thumbnail: undefined,
      url,
      label: undefined,
      value,
    });
  });
  return projects;
}

export default function LiveTransactions() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await fetch("/api/current-transactions");
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
        setProjects([...parsedProjects]);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Handler for Download Teaser
  const handleDownloadClick = (id: string) => {
    setError("");
    setPassword("");
    setShowModal(true);
    // Store the ID for later use
    setCurrentProjectId(id);
  };

  // Handler for password submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProjectId) return;
    setDownloading(true);
    setError("");
    try {
      const res = await fetch(`/api/download-teaser?id=${encodeURIComponent(currentProjectId)}&password=${encodeURIComponent(password)}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid password or download error.");
        setDownloading(false);
        return;
      }
      // Download file
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      
      // Get filename from Content-Disposition header
      const contentDisposition = res.headers.get('content-disposition');
      let filename = 'teaser.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setShowModal(false);
    } catch {
      setError("Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section
        className="text-white pt-20 relative flex items-center justify-center h-[250px] md:h-[500px] py-0"
        style={{
          backgroundImage: "url('/page-title-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
            Live Transactions
          </h1>
        </div>
      </section>
      {/* Loading Spinner */}
      {loading ? (
        <div className="min-h-[300px] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading Live Transactions
            </h2>
          </div>
        </div>
      ) : (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-6">
                <thead>
                  <tr className="text-blue-900 text-lg font-semibold">
                    <th className="text-left px-4 pb-2">Description</th>
                    <th className="text-left px-4 pb-2">EBITDA Range (M)</th>
                    <th className="text-left px-4 pb-2">Description</th>
                    <th className="text-left px-4 pb-2">Deal Teaser</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="align-top">
                      <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">
                        {project.name}
                      </td>
                      <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                        {project.value}
                      </td>
                      <td className="px-4 py-2 text-gray-700 max-w-[400px]">
                        {project.description}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDownloadClick(project.id)}
                          className="inline-block px-4 py-2 bg-blue-700 text-white font-semibold rounded shadow hover:bg-blue-800 transition"
                          disabled={downloading}
                        >
                          Download Teaser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgb(0 0 0 / 50%)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative mx-4">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              disabled={downloading}
              style={{ fontSize: '32px', lineHeight: '32px' }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Enter Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={downloading}
                autoFocus
              />
              {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold rounded px-4 py-2 hover:bg-blue-800 transition"
                disabled={downloading}
              >
                {downloading ? "Checking..." : "Download"}
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              Don’t have the password? <a href="mailto:info@vision-cap.com" className="underline text-blue-700">Email us</a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
