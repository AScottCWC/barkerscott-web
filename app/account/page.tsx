// app/account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  
  // Care Home (10 policies + 10 RAs)
  { id: '1x5Ke9SiobWKJ2ggZg6q4lKG_-CLlL909', name: 'Complaints Compliments Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1aA3CNGvAgDussdog7ZPJPk3V8D05wBql', name: 'End of Life Care Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1cP9JIilJeM6h_yNSvUly52h6Sf_jJ5_s', name: 'Falls Prevention Management Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1oj9T-sznzgg4yjkB7AZO7CRjdULVIGm9', name: 'Fire Safety Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1PVP9ketfdw0Cr8qQYKiS6dcz0WapS8lS', name: 'Infection Prevention Control Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1NG_AwbdsDhC7QPfeHvJtjzWlTxmjbwFi', name: 'Medication Management Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1-BWt4xoyVX59fj34H3pfMqaXOcNipiLe', name: 'Mental Capacity Deprivation of Liberty Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1faWm2mXb2bBToyFPktkaskdso1KwV3iY', name: 'Removing Handling Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1jPg3R1EOEWtD7pJHmVE20_-ZZBWgbtLN', name: 'Recruitment Staff Suitability Policy', sector: 'Care Home', folder: 'Care home policies' },
  { id: '1UxItFbKG6A4G0yCwBjRAbEu4t73erq9s', name: 'Safeguarding Adults Policy', sector: 'Care Home', folder: 'Care home policies' },
  
  { id: '1zlpsQzq36ydHZmIiKMqtykZizNLa5WBS', name: 'Falls Prevention Management RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1O0eg99qQW89oIqlMOb_N31KnCPPXOU0x', name: 'Fire Safety RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '12WCG5joBQu2s9Zgn6MnjGuJ5XCZFsKPO', name: 'Infection Prevention Control RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1eXNSJMTOqhlxSd-KkHnKRh_ixvrmdpDX', name: 'Lone Working Staff Safety RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1ZhXj5yFi2V6trF4CQiyoLOZ3S-c0PQPn', name: 'Medication Management RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1Z02cAdO_zy5WgX5qrG-SH4BQRCkR_pgJ', name: 'Mental Capacity Deprivation RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1yNGOk31WR37P16QdljJ3hLfFeQIl0dqd', name: 'Moving Handling RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1CqB-Iw5GsDGVegQ3D--SoDBK9KtN7oz2', name: 'Nutrition Hydration Choking RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1meOXt7waYHofhkX8aiDAvF31a2mlaiy', name: 'Pressure Ulcer Prevention RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  { id: '1JmJ7WEOl1btJE5MuNvV-KRL2e9hmzko5', name: 'Safeguarding Adults RA', sector: 'Care Home', folder: 'Care home risk assessments' },
  
  // Dental (10 policies + 10 RAs)
  { id: '19zHEnVPpAI6oOmE578xdX9zKR96YFrnF', name: 'Complaints Handling Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '10qBQDbvSB-rw6WJjEqASjYJugp4VgGQm', name: 'Consent to Treatment Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1vWvFf9oE7ZbkLWOAGvPqWOocYseaLfCo', name: 'Data Protection Confidentiality Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1wN1F2_9Dr8ipHqeiHt0o2d79gQYUe0uN', name: 'Equality Diversity Reasonable Adjustments Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1dluRhdoxb-bSTo-qk4QiJKu4Io1zkkNS', name: 'Infection Prevention Control Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1mCPrlNEItlVVFUlf0HFXoYLA_THYAyqN', name: 'Medical Emergencies Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1F8xOaAZMfnCT8ohDB3SOtN5v_9GnRaAV', name: 'Radiation Protection Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1YdZMYkrtvw_c2Tjw7QMI5QKO2iOXk4Ep', name: 'Safeguarding Children Vulnerable Adults Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1d3ek3zsy5wOLwoOfSRnlE_JAlnPO04tk', name: 'Staff Training CPD Competency Policy', sector: 'Dental', folder: 'Dental policies' },
  { id: '1q_KAVPnO62b7K_A5KY6PosGEWr8k9AuE', name: 'Whistleblowing Raising Concerns Policy', sector: 'Dental', folder: 'Dental policies' },
  
  { id: '1yCv_6-0R3RYSKqP1hWtx7aB56A2vCEuX', name: 'Conscious Sedation RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '14h-FtI-cTjHSG17We_Ps6wJeHhfTsiug', name: 'Cross Infection Control RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '18cotMFC9FUl259OaHfDw4cf-Fe-zMS_k', name: 'Dental Amalgam Mercury Handling RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '15E_jwkW_iDu44e6HNScfCNTcVKBc_t0q', name: 'Dental Handpiece Aerosol Management RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '1Zq3bzC7aBGmJMxkA_cSpm6LdxLC0VyUj', name: 'Local Anaesthesia Administration RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '1ZmiseowESEysatUlJD7LpdEj8Gq2K0vs', name: 'Lone Working Dental Practice RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '1eEUsL4ZTAWY5l16Dv0cTbnyiX76wvdiB', name: 'Manual Handling Musculoskeletal Risks RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '1o89QVhms4b1h2LF8fasjOkHc9X5OwUpG', name: 'Medical Emergencies Dental Practice RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '11AmEypDa8W6illkS-u9HBFHatNcAOFbP', name: 'Radiation Protection Dental Radiography RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  { id: '1T16nZjNS4Il5BTW2YmUueGf5Wx776nHB', name: 'Safeguarding Vulnerable Patients RA', sector: 'Dental', folder: 'Dental Risk assessments' },
  
  // GP (10 policies + 10 RAs)
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
  
  // Private Clinic (10 policies + 10 RAs)
  { id: '1iXjjtIjVCxSGAQ0e8R_nIV3mpG6eC-SH', name: 'Business Continuity and Emergency Planning Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1VM6-oRPA_uBDkpVTFa2n89add2HzXR9_', name: 'Clinical Governance Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '19wP8O8wn8GJNGgC_mC-IghBiMHRrQval', name: 'Complaints Handling Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '14njLgrFnNZNgjIpsvR0inf-rZLi59U4p', name: 'Consent to Treatment Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1JN5fqK0uFzTyY-qJw_QuU55rqQzUd7RU', name: 'Data Protection and Confidentiality Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1kWLahzoiTj3mYjK_KsAwjMgYgqerQp4z', name: 'Health and Safety Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1iTXFXonqDpMXd6NNK9Kekd37SmTxpuUJ', name: 'Infection Prevention and Control Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1v1tquuA9jISU1gBPICVlYMWNyK3DdFNR', name: 'Medicines Management Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1UmXpFy-AIgSytjnWuakCd-cFr0JksqMa', name: 'Safeguarding Adults Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  { id: '1_Q-V1DZPz-clwYA2DzZiCwsMoDt-vquu', name: 'Staffing and Recruitment Policy', sector: 'Private Clinic', folder: 'Private Health Clinic policies' },
  
  { id: '1DEOYNA7c4Zt7tdkP6CO5OQTxcYAyJcs', name: 'COSHH RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1yFV32hmQM1oE8itUDRDctiiQHjstotpU', name: 'Fire Safety RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1dTKX2oyjlN8-NmhVBk1w7C1LfOKQqRCH', name: 'Infection Control RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1sOqS8JjS05dUzO-2G9-vrqAAXrBAG-ZM', name: 'Information Governance Cyber RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1DN9uchpCPwX69NmbEgV4pqRAU2GuZmzt', name: 'Lone Working RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1zNLrcUBoQ9gFDH9JG9JXI4I3Zg1TRaqy', name: 'Manual Handling RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1vpTX_xZCHc4YNnhuvxJ5qY3Uaw_e8lsq', name: 'Medical Equipment Devices RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1u0mcQ-LiuzDEBlCDOMb7WwiJKPjQ_xg2', name: 'Medicines Storage Handling RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1G_x_4EOiCMuB__vVMsiIwD04OY01ZzBh', name: 'Slips Trips Falls RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
  { id: '1bMcYVAk4RxkzFDtrw1KFnm-F7gGliNfB', name: 'Violence Aggression RA', sector: 'Private Clinic', folder: 'Private Clinic Risk Assessments' },
];

export default function AccountPage() {
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

    // Mock subscription data - replace with API call
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
        {/* Header */}
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

        {/* Filters */}
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

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(file => (
            <a
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