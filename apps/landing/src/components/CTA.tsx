'use client';

import { Download } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-20 px-4 bg-gradient-primary text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-landing-pattern opacity-5 bg-cover bg-center" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Join thousands of users who are already using Thimblely to simplify
            their digital life.
          </p>
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-logo-gold to-logo-orange text-primary-dark font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <Download size={20} />
            <span>Download Now</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
