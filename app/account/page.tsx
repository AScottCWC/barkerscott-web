'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId || localStorage.getItem('sessionId')) {
      setSubscription({ id: '1', status: 'active', currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!subscription) return <div className="min-h-screen flex items-center justify-center"><button onClick={() => router.push('/subscribe')}>Subscribe</button></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Your Account</h1>
        {/* Rest of component */}
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