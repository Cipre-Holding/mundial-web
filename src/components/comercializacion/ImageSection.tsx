import pasto from "@/assets/BREAKER-5.webp";

const ImageSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#050a12] from-15% via-[#0a1628] via-55% to-[#050a12] to-80%">
      <img
        src={pasto}
        alt="Breaker"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default ImageSection;
