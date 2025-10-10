'use client';

import { Zap, Shield, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Experience blazing fast performance with optimized code and efficient data handling.',
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your data is encrypted end-to-end. We take your privacy seriously.',
    color: '#10b981',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description:
      'Work together seamlessly with real-time collaboration features.',
    color: '#3b82f6',
  },
  {
    icon: Clock,
    title: 'Always Available',
    description:
      'Access your data anytime, anywhere with 99.9% uptime guarantee.',
    color: '#8b5cf6',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Thimblely?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay productive and organized
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
