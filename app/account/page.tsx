"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { driveFiles } from "@/lib/driveFileIds";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Sector = "adhd" | "weightLoss" | "telehealth";

interface Document {
  id: string;
  name: string;
  type: "policy" | "ra";
  sector: Sector;
  source: "subscription" | "bundle" | "individual";
}

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [subscription, setSubscription] = useState(false);
  const [bundles, setBundles] = useState<Sector[]>([]);
  const [individualDocs, setIndividualDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.push("/login");
        return;
      }

      const currentUser = sessionData.session.user;
      setUser(currentUser);

      const isSubscriptionActive = currentUser.user_metadata?.subscription_active || false;
      const purchasedBundles = currentUser.user_metadata?.purchased_bundles || [];
      const purchasedDocuments = currentUser.user_metadata?.purchased_documents || [];

      setSubscription(isSubscriptionActive);
      setBundles(purchasedBundles);
      setIndividualDocs(purchasedDocuments);

      // Build document list
      const docs: Document[] = [];

      // Subscription gives access to all
      if (isSubscriptionActive) {
        docs.push(
          ...driveFiles.adhd.policies.map((f) => ({
            id: f.id,
            name: f.name,
            type: "policy" as const,
            sector: "adhd" as Sector,
            source: "subscription" as const,
          })),
          ...driveFiles.adhd.riskAssessments.map((f) => ({
            id: f.id,
            name: f.name,
            type: "ra" as const,
            sector: "adhd" as Sector,
            source: "subscription" as const,
          })),
          ...driveFiles.weightLoss.policies.map((f) => ({
            id: f.id,
            name: f.name,
            type: "policy" as const,
            sector: "weightLoss" as Sector,
            source: "subscription" as const,
          })),
          ...driveFiles.weightLoss.riskAssessments.map((f) => ({
            id: f.id,
            name: f.name,
            type: "ra" as const,
            sector: "weightLoss" as Sector,
            source: "subscription" as const,
          })),
          ...driveFiles.telehealth.policies.map((f) => ({
            id: f.id,
            name: f.name,
            type: "policy" as const,
            sector: "telehealth" as Sector,
            source: "subscription" as const,
          })),
          ...driveFiles.telehealth.riskAssessments.map((f) => ({
            id: f.id,
            name: f.name,
            type: "ra" as const,
            sector: "telehealth" as Sector,
            source: "subscription" as const,
          }))
        );
      } else {
        // Bundle access
        if (purchasedBundles.includes("adhd")) {
          docs.push(
            ...driveFiles.adhd.policies.map((f) => ({
              id: f.id,
              name: f.name,
              type: "policy" as const,
              sector: "adhd" as Sector,
              source: "bundle" as const,
            })),
            ...driveFiles.adhd.riskAssessments.map((f) => ({
              id: f.id,
              name: f.name,
              type: "ra" as const,
              sector: "adhd" as Sector,
              source: "bundle" as const,
            }))
          );
        }

        if (purchasedBundles.includes("weightLoss")) {
          docs.push(
            ...driveFiles.weightLoss.policies.map((f) => ({
              id: f.id,
              name: f.name,
              type: "policy" as const,
              sector: "weightLoss" as Sector,
              source: "bundle" as const,
            })),
            ...driveFiles.weightLoss.riskAssessments.map((f) => ({
              id: f.id,
              name: f.name,
              type: "ra" as const,
              sector: "weightLoss" as Sector,
              source: "bundle" as const,
            }))
          );
        }

        if (purchasedBundles.includes("telehealth")) {
          docs.push(
            ...driveFiles.telehealth.policies.map((f) => ({
              id: f.id,
              name: f.name,
              type: "policy" as const,
              sector: "telehealth" as Sector,
              source: "bundle" as const,
            })),
            ...driveFiles.telehealth.riskAssessments.map((f) => ({
              id: f.id,
              name: f.name,
              type: "ra" as const,
              sector: "telehealth" as Sector,
              source: "bundle" as const,
            }))
          );
        }

        // Individual purchases
        purchasedDocuments.forEach((docId: string) => {
          const allDocs = [
            ...driveFiles.adhd.policies,
            ...driveFiles.adhd.riskAssessments,
            ...driveFiles.weightLoss.policies,
            ...driveFiles.weightLoss.riskAssessments,
            ...driveFiles.telehealth.policies,
            ...driveFiles.telehealth.riskAssessments,
          ];

          const found = allDocs.find((d) => d.id === docId);
          if (found) {
            const sector = purchasedDocuments.some((id: string) =>
              driveFiles.adhd.policies.concat(driveFiles.adhd.riskAssessments).some((d) => d.id === id)
            )
              ? "adhd"
              : purchasedDocuments.some((id: string) =>
                  driveFiles.weightLoss.policies.concat(driveFiles.weightLoss.riskAssessments).some((d) => d.id === id)
                )
                ? "weightLoss"
                : "telehealth";

            const isPolicy = driveFiles.adhd.policies
              .concat(driveFiles.weightLoss.policies, driveFiles.telehealth.policies)
              .some((d) => d.id === docId);

            docs.push({
              id: docId,
              name: found.name,
              type: isPolicy ? "policy" : "ra",
              sector: sector as Sector,
              source: "individual",
            });
          }
        });
      }

      setDocuments(docs);
      setLoading(false);
    };

    loadData();
  }, [router]);

  if (loading) return <div className="p-8 text-center text-slate-600">Loading...</div>;
  if (!user) return null;

  const sectorLabels: Record<Sector, string> = {
    adhd: "ADHD Clinics",
    weightLoss: "Weight Loss Clinics",
    telehealth: "Telehealth Services",
  };

  const sourceLabels: Record<string, { label: string; color: string }> = {
    subscription: { label: "Subscription", color: "bg-purple-100 text-purple-700" },
    bundle: { label: "Bundle", color: "bg-blue-100 text-blue-700" },
    individual: { label: "Individual", color: "bg-green-100 text-green-700" },
  };

  const groupedBySector = documents.reduce(
    (acc, doc) => {
      if (!acc[doc.sector]) acc[doc.sector] = [];
      acc[doc.sector].push(doc);
      return acc;
    },
    {} as Record<Sector, Document[]>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Account</h1>
          <p className="text-slate-600">{user.email}</p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-slate-600 text-sm font-medium">Subscription Status</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {subscription ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-slate-600">Inactive</span>
              )}
            </p>
            {!subscription && (
              <a href="/pricing" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Upgrade to subscription
              </a>
            )}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-slate-600 text-sm font-medium">Bundles Purchased</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{bundles.length}</p>
            {bundles.length === 0 && (
              <a href="/bundles" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Browse bundles
              </a>
            )}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-slate-600 text-sm font-medium">Total Documents</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{documents.length}</p>
          </div>
        </div>

        {/* Documents */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
            <p className="text-slate-600 mb-6">No documents yet. Start with a bundle or individual purchase.</p>
            <div className="flex gap-4 justify-center">
              <a href="/bundles" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Browse Bundles
              </a>
              <a href="/store" className="px-6 py-2 bg-slate-200 text-slate-900 rounded hover:bg-slate-300">
                Visit Store
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {Object.entries(groupedBySector).map(([sector, sectorDocs]) => (
              <div key={sector} className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{sectorLabels[sector as Sector]}</h2>
                <div className="grid gap-3">
                  {sectorDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-200 hover:bg-slate-100"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                            {doc.type === "policy" ? "Policy" : "Risk Assessment"}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${sourceLabels[doc.source].color}`}>
                            {sourceLabels[doc.source].label}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(doc.id, doc.name)}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex-shrink-0"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

async function downloadFile(fileId: string, fileName: string) {
  const { downloadDriveFile } = await import("@/lib/googleDrive");
  try {
    await downloadDriveFile(fileId, fileName);
  } catch (error) {
    alert("Download failed: " + (error as Error).message);
  }
}