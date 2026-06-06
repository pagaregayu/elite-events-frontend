import Hero from "../../components/Hero/Hero";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import PopularVendors from "../../components/PopularVendors/PopularVendors";
import GalleryPreview from "../../components/GalleryPreview/GalleryPreview";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTASection from "../../components/CTASection/CTASection";

import "./Home.css";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <PopularVendors />
      <GalleryPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}

export default Home;