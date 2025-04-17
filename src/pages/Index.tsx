
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LiveDataPreview from '@/components/home/LiveDataPreview';
import ChatbotPreview from '@/components/home/ChatbotPreview';
import ResourcesSection from '@/components/home/ResourcesSection';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LiveDataPreview />
        <ChatbotPreview />
        <ResourcesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
