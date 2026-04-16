import SearchBar from "./components/SearchBar";
//import Header from "./components/Header";
//import Intro from "./components/Intro";
import Footer from "./components/Footer";
import './styles/general/index.css'
import FeaturedReview from "./components/mainPage/FeaturedReview";
import CategorySection from "./components/mainPage/CategorySection";

function IndexPage() {
  return (
    <>
      <SearchBar />
      <main>
        <div className="pageContainer">
        {/* <Intro /> */}
        <FeaturedReview />
        <CategorySection/>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
