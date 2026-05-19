'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Subscription {
  id: string;
  status: string;
  currentPeriodEnd: string;
}

interface File {
  id: string;
  name: string;
  sector: string;
  folder: string;
}

const allFiles: File[] = [
  // Aesthetics (10 files)
  { id: '1V5lxLzVUWZ8YuBjsImg0KvfcRIzpOZ5Z', name: 'Adverse Event Management Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1cb4YnTTliMsF8pifkVVYlz3hDq3IBtEV', name: 'Client Safeguarding Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1N3gCE6agR6WZGidrQuKw5AFGLU4cpeXG', name: 'Complaints Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1HKyz3SwxoYruD_h4KwSfs1CB6NjbiPbl', name: 'Consent Risk Disclosure Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1yIHrTRvIRQMGwX5dQ5L3ZzD-zH2o1s_q', name: 'Health Safety Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1fZrEw4iIitkmQ55_b7PyOCDWSPy2L8w', name: 'Infection Control Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '14sytmaoIDGdwzrl1DttXufXsUYWHTFvZ', name: 'Marketing Advertising Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1Qi3dOI96f0FKqXiQzcI_V_B0HD8-7yVc', name: 'Practitioner Competency Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '1LlNQ_AzYNH5BrylfneWDg-hLP_CEj-Xo', name: 'Privacy Data Protection Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '12BRcHcl9YlyHIuK-ZRFvJ8qwfp0nxCKA', name: 'Product Management Policy', sector: 'Aesthetics', folder: 'aesthetic policies' },
  { id: '19LwZAroTpFNjTFKFEcI_OtA5GLtOq2dr', name: 'Botulinum Toxin Administration RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1WpTnB_W0GH_fErifhBBKr7p2v60Q3KSx', name: 'Chemical Skin Peels RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1Gg-MwCOxCRs7cafby2f4833I_kJIXpc', name: 'Cryotherapy Cryolipolysis RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1APpWMr6CwnD9rOxeh4SZ7-Z6Bbqtoq1F', name: 'Dermal Filler Treatments RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1nNcU86hgBPgutBvYRuFuQNfgOjYy6FhW', name: 'Infection Prevention Control IPC RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1_DZydvp5KKg5z7Xb8iLa7pSvZ_abQEPn', name: 'Laser Intense Pulsed Light IPL RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1pH4ogNnHixO8SaKhqueGFE2SrhQ1rwn', name: 'Microneedling Collagen Induction RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1E42jvB1AC4eAI9qk40ihPG5Uj6RICa5f', name: 'Patient Consultation Consent RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1IvqL5tO30YT-w7mGkKRA583wf35is1FL', name: 'Platelet Rich Plasma PRP RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  { id: '1Dyi1rPRDAXd--RNnM6fIYvqf_AigtmET', name: 'Thread Lift Procedures PDO RA', sector: 'Aesthetics', folder: 'Aesthetics risk assessments' },
  
  // GP (10 files)
  { id: '17git9BUMBA-Ck-cf4AQ6GrT5gTHv_mzl', name: 'Complaints Handling', sector: 'GP', folder: 'GP policies' },
  { id: '1mSvxg7ehkxksGE5sYtatlJOd44T_eWpG', name: 'Consent and Confidentiality', sector: 'GP', folder: 'GP policies' },
  { id: '1Ow3MLi6b1QMtSI4Sjc6UXI2WKdE5azVI', name: 'Data Protection and Information Governance', sector: 'GP', folder: 'GP policies' },
  { id: '1nNqDlZ2iY4-qWC_r63wWva6YcdOw1MFg', name: 'Equality Diversity and Inclusion', sector: 'GP', folder: 'GP policies' },
  { id: '1aHI6P9Yz1xKcw-VAFK3z8fVDtlEK4MUu', name: 'Fire Safety', sector: 'GP', folder: 'GP policies' },
  { id: '1rOSdZH5dO9gkKIVFbrNLvDTWsX8xodCR', name: 'Health and Safety', sector: 'GP', folder: 'GP policies' },
  { id: '1ey_gcefg4e9bXdukEElEUwmBv_nb1c2f', name: 'Infection Prevention and Control', sector: 'GP', folder: 'GP policies' },
  { id: '1yL7Dt9UkfeJ5R7JU_u6dSGJn4Gage7z-', name: 'Lone Working', sector: 'GP', folder: 'GP policies' },
  { id: '1PYuOjnaCAihT5JlETSUqrA0SHH68lXm5', name: 'Medicines Management', sector: 'GP', folder: 'GP policies' },
  { id: '13EPkLnPCMew5r5Xec9i6QvVGvcbJereF', name: 'Safeguarding Children and Adults at Risk', sector: 'GP', folder: 'GP policies' },
  
  { id: '1pBKaLoZvh5C2nB6kG4bqkaCkFqL_s7Y4', name: 'COSHH RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1fT9GJITPl-48gI3mbEIR1IjxG66-5OEG', name: 'Data Protection and Information Governance RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '17AuQnawGGL2BtmQQZRC4nHbUYXmqkIF', name: 'Display Screen Equipment DSE RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1WhWIaNIXphS_csSCJmp65zOB4QhC_QG', name: 'Fire Safety RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '14XoVr5XO8nDV03LTZnqDSHlDamgxYOMs', name: 'Infection Prevention and Control RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1TQ8Ukhn1jlchc7SKZFhBIXYPIVCm5vYV', name: 'Lone Working RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1wr9nndxIRTLHuRDnporzTWiGJe3ftuKj', name: 'Manual Handling RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1A9Rnb2wX4OJHs-dG4R2lT-GkwfJBpHlC', name: 'Medicines Management and Storage RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1EGGDgCJMXTeNp3ptrfrY4POlxNhJDLx', name: 'Safeguarding Adults and Children RA', sector: 'GP', folder: 'GP Risk assessments' },
  { id: '1wM3_BJSsBSYZpW8n4kyUeu85SjBA1CYS', name: 'Workplace Violence and Aggression RA', sector: 'GP', folder: 'GP Risk assessments' },
  
  // Private Clinic (10 files)
  { id: '1iXjjtIjVCxSGAQ0e8R_nIV3mpG6eC-SH', name: 'Business Continuity and Emergency Planning Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1VM6-oRPA_uBDkpVTFa2n89add2HzXR9_', name: 'Clinical Governance Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '19wP8O8wn8GJNGgC_mC-IghBiMHRrQval', name: 'Complaints Handling Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '14njLgrFnNZNgjIpsvR0inf-rZLi59U4p', name: 'Consent to Treatment Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1JN5fqK0uFzTyY-qJw_QuU55rqQzUd7RU', name: 'Data Protection and Confidentiality Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1kWLahzoiTj3mYjK_KsAwjMgYgqerQp4z', name: 'Health and Safety Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1iTXFXonqDpMXd6NNK9Kekd37SmTxpuUJ', name: 'Infection Prevention and Control Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1v1tquuA9jISU1gBPICVlYMWNyK3DdFNR', name: 'Medicines Management Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1UmXpFy-AIgSytjnWuakCd-cFr0JksqMa', name: 'Safeguarding Adults Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  { id: '1_Q-V1DZPz-clwYA2DzZiCwsMoDt-vquu', name: 'Staffing and Recruitment Policy', sector: 'Private Healthcare', folder: 'Private Health Clinic policies' },
  
  { id: '1DEOYNA7c4Zt7tdkP6CO5OQTxcYAyJcs', name: 'COSHH RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1yFV32hmQM1oE8itUDRDctiiQHjstotpU', name: 'Fire Safety RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1dTKX2oyjlN8-NmhVBk1w7C1LfOKQqRCH', name: 'Infection Control RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1sOqS8JjS05dUzO-2G9-vrqAAXrBAG-ZM', name: 'Information Governance Cyber RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1DN9uchpCPwX69NmbEgV4pqRAU2GuZmzt', name: 'Lone Working RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1zNLrcUBoQ9gFDH9JG9JXI4I3Zg1TRaqy', name: 'Manual Handling RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1vpTX_xZCHc4YNnhuvxJ5qY3Uaw_e8lsq', name: 'Medical Equipment Devices RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1u0mcQ-LiuzDEBlCDOMb7WwiJKPjQ_xg2', name: 'Medicines Storage Handling RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1G_x_4EOiCMuB__vVMsiIwD04OY01ZzBh', name: 'Slips Trips Falls RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
  { id: '1bMcYVAk4RxkzFDtrw1KFnm-F7gGliNfB', name: 'Violence Aggression RA', sector: 'Private Healthcare', folder: 'Private Clinic Risk Assessments' },
];

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const userEmail = localStorage.getItem('userEmail') || '';
    
    setEmail(userEmail);

    if (sessionId || userEmail) {
      setSubscription({
        id: '1',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
      setFiles(allFiles);
    }
    setLoading(false);
  }, [searchParams]);

  const sectors = ['All', ...new Set(allFiles.map(f => f.sector))];
  const filtered = filter === 'All' ? files : files.filter(f => f.sector === filter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Not Subscribed</h1>
          <p className="text-gray-600 mb-6">Subscribe to access your downloads</p>
          <button
            onClick={() => router.push('/subscribe')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Account</h1>
          <p className="text-gray-600 mb-6">Email: <strong>{email}</strong></p>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-6">
            <p className="text-indigo-900 font-semibold">✓ Active Subscription</p>
            <p className="text-indigo-700">Renews: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('userEmail');
              router.push('/');
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Filter by Sector</h2>
          <div className="flex flex-wrap gap-2">
            {sectors.map(sector => (
              <button
                key={sector}
                onClick={() => setFilter(sector)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === sector
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {sector} ({allFiles.filter(f => sector === 'All' ? true : f.sector === sector).length})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(file => (
            
              key={file.id}
              href={`https://drive.google.com/file/d/${file.id}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{file.name}</h3>
                  <p className="text-sm text-gray-600">{file.sector}</p>
                </div>
                <span className="text-2xl">📄</span>
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">
                View & Download
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccountContent />
    </Suspense>
  );
}