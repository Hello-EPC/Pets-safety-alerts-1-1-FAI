import React, { useState } from 'react';
import { CourseCard } from './CourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const TrainingCourses: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const courses = [
    { id: 'first-aid', title: 'Pet First Aid & CPR', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893209902_3585c06b.webp', duration: '4 hours', price: 99, difficulty: 'Beginner', description: 'Essential emergency response skills', category: 'medical' },
    { id: 'behavioral', title: 'Behavioral Assessment', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893211657_d765d4fc.webp', duration: '3 hours', price: 79, difficulty: 'Intermediate', description: 'Reading pet body language and stress signals', category: 'behavior' },
    { id: 'transport', title: 'Emergency Transport', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893213441_ccaa9c7b.webp', duration: '2 hours', price: 59, difficulty: 'Beginner', description: 'Safe handling during emergencies', category: 'safety' },
    { id: 'medical-admin', title: 'Medical Administration', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893215191_1c689d76.webp', duration: '5 hours', price: 129, difficulty: 'Advanced', description: 'Medication and injection protocols', category: 'medical' },
    { id: 'crisis-comm', title: 'Crisis Communication', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893216972_8c91f650.webp', duration: '2 hours', price: 49, difficulty: 'Beginner', description: 'Working with distressed pet owners', category: 'communication' },
    { id: 'life-support', title: 'Advanced Life Support', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893218749_f6e979f5.webp', duration: '6 hours', price: 149, difficulty: 'Advanced', description: 'Critical care for severe emergencies', category: 'medical' }
  ];

  const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  const handleEnroll = async (course: typeof courses[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in courses",
        variant: "destructive"
      });
      return;
    }

    setEnrolling(course.id);

    try {
      const { data, error } = await supabase.functions.invoke('handle-training-enrollment', {
        body: {
          courseId: course.id,
          courseTitle: course.title
        }
      });

      if (error) throw error;

      toast({
        title: "Enrollment Successful!",
        description: `You are now enrolled in ${course.title}. Check your dashboard for course materials.`
      });

    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Failed to enroll in course",
        variant: "destructive"
      });
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <div id="training" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Certification Training</h2>
        <p className="text-center text-gray-600 mb-8">Become a certified I.C.E. Pet Alert sitter</p>
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {['all', 'medical', 'behavior', 'safety', 'communication'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filter === cat ? 'bg-yellow-400 text-black' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CourseCard 
              key={c.id} 
              {...c} 
              onEnroll={() => handleEnroll(c)}
              isEnrolling={enrolling === c.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};