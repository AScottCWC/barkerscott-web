"use client";
import { useState } from "react";
import DocumentCard from "@/app/components/DocumentCard";
import { driveFiles } from "@/lib/driveFileIds";

type Sector = "adhd" | "weightLoss" | "telehealth";

export default function StorePage() {
  const [selectedSector, setSelectedSector] = useState<Sector | "all">("all");

  const sectors: { id: Sector; name: string }[] = [
    { id: "adhd", name: "ADHD Clinics" },
    { id: "weightLoss", name: "Weight Loss Clinics" },
    { id: "telehealth", name: "Telehealth Services" },
  ];

  const allDocuments = [
    ...driveFiles.adhd.policies.map((f) => ({ ...f, sector: "adhd" as Sector, type: "policy" as const })),
    ...driveFiles.adhd.riskAssessments.map((f) => ({ ...f, sector: "adhd" as Sector, type: "ra" as const })),
    ...driveFiles.weightLoss.policies.map((f) => ({ ...f, sector: "weightLoss" as Sector, type: "policy" as const })),
    ...driveFiles.weightLoss.riskAssessments.map((f) => ({ ...f, sector: "weightLoss" as Sector, type: "ra" as const })),
    ...driveFiles.telehealth.policies.map((f) => ({ ...f, sector: "telehealth" as Sector, type: "policy" as const })),
    ...driveFiles.telehealth.riskAssessments.map((f) => ({ ...f, sector: "telehealth" as Sector, type: "ra" as const })),
  ];

  const filtered =
    selectedSector === "all" ? allDocuments : allDocuments.filter((d) => d.sector === selectedSector);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Document Store</h1>
          <p className="text-slate-600">Purchase individual policies and risk assessments @ £39.99 each</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSector("all")}
            className={`px-4 py-2 rounded font-medium transition ${
              selectedSector === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Documents
          </button>
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`px-4 py-2 rounded font-medium transition ${
                selectedSector === sector.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Document Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} id={doc.id} name={doc.name} type={doc.type} sector={doc.sector} price={39.99} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}