
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/ui/StarField';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      <StarField />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="text-space-muted hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Live Data Dashboard</h1>
            <p className="text-xl text-space-muted">
              Real-time space weather monitoring and visualization.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-xl min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
              <p className="text-space-muted">
                Our live data dashboard is under development. Check back soon for real-time space weather monitoring.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
