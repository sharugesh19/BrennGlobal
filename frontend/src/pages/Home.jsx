import SEO from "../components/seo/SEO.jsx";
import Hero from "../components/home/Hero.jsx";
import WhyBrenn from "../components/home/WhyBrenn.jsx";
import FeaturedProduct from "../components/home/FeaturedProduct.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import ComingSoon from "../components/home/ComingSoon.jsx";

const Home = () => {
  return (
    <>
      <SEO
        title="Precision Kitchen Tools"
        description="Brenn Global designs precision-engineered kitchen tools for professionals and home bakers, starting with the Brenn Precision Brownie Divider."
        path="/"
      />
      <Hero />
      <WhyBrenn />
      <FeaturedProduct />
      <WhyChooseUs />
      <ComingSoon />
    </>
  );
};

export default Home;
