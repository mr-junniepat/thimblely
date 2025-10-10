'use client';

import Image from 'next/image';
import { Smartphone, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-hero text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-landing-pattern opacity-10 bg-cover bg-center" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark/50 to-transparent opacity-90" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse">
              <Image
                src="/logo.png"
                alt="Thimblely Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 rounded-full backdrop-blur-sm">
            <Smartphone size={16} />
            <span className="text-sm font-medium">Now Available</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Digital Life,
            <br />
            <span className="bg-gradient-to-r from-logo-gold via-logo-orange to-logo-gold bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Thimblely brings all your needs together in one beautiful, intuitive
            app. Stay organized, connected, and productive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-logo-gold to-logo-orange text-primary-dark font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Download App
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-logo-gold to-logo-orange bg-clip-text text-transparent mb-1">
                10K+
              </div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-logo-gold to-logo-orange bg-clip-text text-transparent mb-1">
                4.8
              </div>
              <div className="text-sm text-white/80">App Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-logo-gold to-logo-orange bg-clip-text text-transparent mb-1">
                50K+
              </div>
              <div className="text-sm text-white/80">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
