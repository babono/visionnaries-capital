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
  const [modalStep, setModalStep] = useState<'email' | 'password'>('email');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
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
    setEmail("");
    setModalStep('email');
    setShowModal(true);
    // Store the ID for later use
    setCurrentProjectId(id);
  };

  // Handler for closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
    setPassword("");
    setEmail("");
    setModalStep('email');
    setCurrentProjectId(null);
  };

  // Handler for email submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProjectId) return;
    setSubmittingEmail(true);
    setError("");
    try {
      const res = await fetch('/api/submit-email-teaser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          projectId: currentProjectId,
        }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit email.");
        setSubmittingEmail(false);
        return;
      }

      // Move to password step after successful email submission
      setModalStep('password');
      setError("");
    } catch {
      setError("Failed to submit email.");
    } finally {
      setSubmittingEmail(false);
    }
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
      handleCloseModal();
    } catch {
      setError("Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  // Handler for going back to email step
  const handleBackToEmail = () => {
    setError("");
    setPassword("");
    setModalStep('email');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/header-live.jpg"
            alt="Live Transactions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-700/50 to-sky-500/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-shadow-lg">
              Live Transactions
            </h1>
          </div>
        </div>
      </section>
      {/* Loading Spinner */}
      {loading ? (
        <div className="min-h-[300px] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <h2 className="text-xl text-gray-900 mb-2">
              Loading Live Transactions...
            </h2>
          </div>
        </div>
      ) : (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-6">
                <thead>
                  <tr className="text-blue-900 text-lg">
                    <th className="text-left px-4 pb-2 font-medium">Project Name</th>
                    <th className="text-left px-4 pb-2 font-medium">EBITDA Range (M)</th>
                    <th className="text-left px-4 pb-2 font-medium">Description</th>
                    <th className="text-left px-4 pb-2 font-medium">Deal Teaser</th>
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
                          className="inline-block px-4 py-2 bg-sky-600 text-white font-semibold rounded shadow hover:bg-sky-700 transition"
                          disabled={downloading || submittingEmail}
                        >
                          Get Teaser
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
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgb(0 0 0 / 50%)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative mx-4">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={handleCloseModal}
              disabled={downloading || submittingEmail}
              style={{ fontSize: '32px', lineHeight: '32px' }}
            >
              &times;
            </button>
            
            {modalStep === 'email' ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Request Teaser</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Step 1 of 2: Please provide your email address to continue
                </p>
                <form onSubmit={handleEmailSubmit}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={submittingEmail}
                    autoFocus
                    required
                  />
                  {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
                  <button
                    type="submit"
                    className="w-full bg-sky-600 text-white font-semibold rounded px-4 py-2 hover:bg-sky-700 transition"
                    disabled={submittingEmail}
                  >
                    {submittingEmail ? "Processing..." : "Continue"}
                  </button>
                </form>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                  Your email will be saved for our records. Next, you&apos;ll need to enter a password to download the teaser.
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Access Teaser</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Step 2 of 2: Enter the password to download the teaser
                </p>
                <form onSubmit={handlePasswordSubmit}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Password
                  </label>
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
                    className="w-full bg-sky-600 text-white font-semibold rounded px-4 py-2 hover:bg-sky-700 transition mb-3"
                    disabled={downloading}
                  >
                    {downloading ? "Downloading..." : "Download Teaser"}
                  </button>
                </form>
                <div className="text-center">
                  <button
                    onClick={handleBackToEmail}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                    disabled={downloading}
                  >
                    ← Back to email step
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
