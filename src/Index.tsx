import SearchBar from "./components/SearchBar";
//import Header from "./components/Header";
//import Intro from "./components/Intro";
import Footer from "./components/Footer";
import './styles/general/index.css'
import FeaturedReview from "./components/mainPage/FeaturedReview";
import CategorySection from "./components/mainPage/CategorySection";
import RandomReview from "./components/mainPage/RandomReview";

function IndexPage() {
  return (
    <>
      <SearchBar />
      <main>
        <div className="pageContainer">
        {/* <Intro /> */}
        <FeaturedReview />
        <CategorySection/>
        <RandomReview />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
