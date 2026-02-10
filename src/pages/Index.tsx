import HeroSection from "@/components/comercializacion/HeroSection";
import AppShowcaseSection from "@/components/comercializacion/AppShowcaseSection";
import BienestarSection from "@/components/comercializacion/BienestarSection";
import FooterSection from "@/components/comercializacion/FooterSection";
import AIChatSection from "@/components/comercializacion/AIChatSection";
import VideoSection from "@/components/comercializacion/VideoSection";
import ImageSection from "@/components/comercializacion/ImageSection";

const Index = () => {
  return (
    <div>
        <HeroSection />
        <AppShowcaseSection />
        <VideoSection />
        <BienestarSection />
        <ImageSection />
        <AIChatSection />
      <FooterSection />
    </div>
  );
};

export default Index;
