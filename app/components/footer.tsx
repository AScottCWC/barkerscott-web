import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">BarkerScott</h3>
            <p className="text-slate-400 text-sm">CQC-compliant policy & risk assessment templates</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="text-slate-400 hover:text-white transition">
                  Bundles
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-slate-400 hover:text-white transition">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@barkerscott.co.uk" className="text-slate-400 hover:text-white transition">
                  Support
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">ADHD Clinics</li>
              <li className="text-slate-400">Weight Loss Clinics</li>
              <li className="text-slate-400">Telehealth Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2026 BarkerScott Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}