import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Error from "./components/Error";

// pages
// import Filter from "./pages/Filter";
import Home from "./pages/Home";
import About from "./pages/About";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState(false);
  return (
    <div className={`App ${mode ? "dark" : "light"}`}>
      <Router>
        <Header setMode={setMode} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:id" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
