"use client";
import { CreditCard, Download, DollarSign } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
        Billing Dashboard
      </h1>

      {/* Glassmorphic container */}
      <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
        
        {/* Current Plan */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Current Plan
          </h2>
          <p className="opacity-80 mb-4">You are on the <span className="font-bold">Pro</span> plan.</p>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-lg hover:opacity-90 transition">
            Upgrade Plan
          </button>
        </div>

        {/* Payment Method */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" />
            Payment Method
          </h2>
          <p className="opacity-80 mb-4">Visa ending in <span className="font-bold">4242</span></p>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-lg hover:opacity-90 transition">
            Update Card
          </button>
        </div>

        {/* Invoices */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-yellow-400" />
            Recent Invoices
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span>Invoice #12345 - Jan 2025</span>
              <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm hover:opacity-90 transition">
                Download
              </button>
            </li>
            <li className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span>Invoice #12344 - Dec 2024</span>
              <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm hover:opacity-90 transition">
                Download
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
