import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/Notfound";
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import GithubContext, { GithubProvider } from "./context/github/GithubContext";

function App() {
  return (
    <GithubContext>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/about" element={<About />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/*" element={<NotFound />}></Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubContext>
  );
}

export default App;
