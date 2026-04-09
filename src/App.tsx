import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./components/review/ReviewPage";
import IndexPage from './Index'
import CategoryPage from "./components/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/category/:tag" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
