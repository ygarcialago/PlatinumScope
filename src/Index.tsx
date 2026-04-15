import SearchBar from "./components/SearchBar";
//import Header from "./components/Header";
//import Intro from "./components/Intro";
import Footer from "./components/Footer";
import './styles/general/index.css'
import FeaturedReview from "./components/mainPage/FeaturedReview";

function IndexPage() {
  return (
    <>
      <SearchBar />
      <main>
        {/* <Intro /> */}
        <FeaturedReview />
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
