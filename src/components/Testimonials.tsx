import React from 'react';
import { TestimonialCard } from './TestimonialCard';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      petName: 'Max',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893190019_63c2a1c0.webp',
      text: 'I.C.E. Pet Alert saved the day when I had a medical emergency. The sitter arrived within 30 minutes!',
      location: 'Austin, TX'
    },
    {
      name: 'Michael Chen',
      petName: 'Bella',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893191858_f0f284c7.webp',
      text: 'The QR badge system is genius. My neighbor scanned it and my dog got immediate care.',
      location: 'Seattle, WA'
    },
    {
      name: 'Jennifer Lopez',
      petName: 'Charlie',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893193580_7f858716.webp',
      text: 'Peace of mind knowing my pet has 24/7 emergency coverage. Worth every penny!',
      location: 'Miami, FL'
    },
    {
      name: 'David Park',
      petName: 'Luna',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893195283_72b2bb57.webp',
      text: 'The certified sitters are professional and caring. Highly recommend this service!',
      location: 'Denver, CO'
    },
    {
      name: 'Emily Watson',
      petName: 'Rocky',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893197034_411b3542.webp',
      text: 'Best investment for my pet. The emergency hotline is a lifesaver.',
      location: 'Boston, MA'
    },
    {
      name: 'Robert Taylor',
      petName: 'Daisy',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893198803_0407f365.webp',
      text: 'Quick response time and excellent care. My dog was in great hands!',
      location: 'Portland, OR'
    }
  ];

  return (
    <div id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Trusted by Pet Owners Nationwide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
};
