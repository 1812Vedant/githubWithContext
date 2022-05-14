import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/Notfound";
import User from "./components/user/User";
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/assets/Alert";
import { GithubProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/alert/AlertContext";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/about" element={<About />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/user/:login" element={<User />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
