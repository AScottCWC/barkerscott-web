'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    localStorage.setItem('userEmail', new URLSearchParams(window.location.search).get('session_id') || '');
    setTimeout(() => router.push('/account'), 2000);
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">✓ Payment Successful!</h1>
        <p className="text-gray-600">Redirecting to your account...</p>
      </div>
    </div>
  );
}