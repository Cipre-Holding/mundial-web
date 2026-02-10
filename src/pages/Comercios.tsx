import { useState } from "react";
import WhyAdvertiseSection from "@/components/comercializacion/WhyAdvertiseSection";
import BenefitsSection from "@/components/comercializacion/BenefitsSection";
import PricingSection from "@/components/comercializacion/PricingSection";
import FAQSection from "@/components/comercializacion/FAQSection";
import FooterSection from "@/components/comercializacion/FooterSection";
import SocialProofSection from "@/components/comercializacion/SocialProofSection";
import AffiliationForm from "@/components/comercializacion/AffiliationForm";
import HeroSectionComercios from "@/components/comercializacion/HeroSectionComercios";

const Comercios = () => {
        const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

        const handleSelectPlan = (plan: string) => {
            setSelectedPlan(plan);
            // Scroll to form
            setTimeout(() => {
            document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        };

        const handleBackToPlans = () => {
            setSelectedPlan(null);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        };

        const handleRegisterClick = () => {
            setSelectedPlan("premium");
            setTimeout(() => {
                document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        };

    return (
    <div className="min-h-screen bg-background">
        {!selectedPlan ? (
            <>
                <HeroSectionComercios onRegisterClick={handleRegisterClick} />
                <WhyAdvertiseSection onRegisterClick={handleRegisterClick}/>
                <BenefitsSection />
                <PricingSection onSelectPlan={handleSelectPlan} />
                <SocialProofSection />
                <FAQSection />
            </>
        ) : (
            <AffiliationForm selectedPlan={selectedPlan} onBack={handleBackToPlans} />
        )}
        <FooterSection />
    </div>
  );
};

export default Comercios