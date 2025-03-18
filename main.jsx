import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import SearchingVisualizer from "./components/SearchingVisualizer/SearchingVisualizer";
import GraphVisualizer from "./components/GraphVisualizer/GraphVisualizer";
import DynamicProgrammingVisualizer from './components/DynamicProgrammingVisualizer/DynamicProgrammingVisualizer';
import GreedyAlgorithmsVisualizer from './components/GreedyAlgorithmsVisualizer/GreedyAlgorithmsVisualizer';
import BacktrackingVisualizer from './components/BacktrackingVisualizer/BacktrackingVisualizer';
import TreeAlgorithmVisualizer from './components/TreeAlgorithmVisualizer/TreeAlgorithmVisualizer';
import MathematicalAlgorithmsVisualizer from "./components/MathematicalAlgorithmsVisualizer/styles/MathematicalAlgorithmsVisualizer";
import LearnDSA from "./components/LearnDSA/LearnDSA";
import Quiz from "./components/Quiz/Quiz";
import QuizQuestions from "./components/Quiz/QuizQuestions";
import DebuggingChallenge from "./components/DebuggingChallenge/DebuggingChallenge";
import ContactUs from "./components/ContactUs/ContactUs";
import WhatWeOffer from "./components/WhatWeOffer/WhatWeOffer";
import GetStarted from "./components/GetStarted/GetStarted";
import Homepages from "./components/Homepages/HomePages.jsx";
import Navbar from "./components/Navbar/Navbar"; // Import Navbar Component
import StackVisualizer from './components/StackVisualizer/StackVisualizer'; // Import StackVisualizer
import QueueVisualizer from './components/QueueVisualizer/QueueVisualizer'; // Import QueueVisualizer
import "./style.css";
import logo from "/public/logo.png"


// Home Component
const Home = () => {
  return (
    <div className="dsa-hero">
      <img src={logo}/>
      <div className="dsa-hero-content">
        <h1>Data Structures and Algorithms Visualizer</h1>
        <p>Explore various algorithms and data structures with interactive visualizations.</p>
          {location.pathname === "/" && (
          <Link to="/what-we-offer" className="dsa-footer-button">
            What We Offer
          </Link>
        )}
        <div className="dsa-hero-buttons">
          <Link to="/get-started" className="dsa-hero-button">Get Started</Link>
          <Link to="/learn-dsa" className="dsa-hero-button">Learn DSA</Link>
          <Link to="/quiz" className="dsa-hero-button">Take a Quiz</Link>
          <Link to="/debugging-challenge" className="dsa-hero-button">Debugging Challenge</Link>
          <Link to="/contact-us" className="dsa-hero-button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  const location = useLocation();

  return (
    <footer className="dsa-footer">
      <div className="dsa-footer-content">
        {/* Conditionally render the "Homepages" component */}
        {location.pathname === "/" && <Homepages />}
        {/* Conditionally render the "What We Offer" button only on the home page */}
       
        <p>&copy; 2025 DSA Visualizer. All rights reserved by Bharat Pawar</p>
      </div>
    </footer>
  );
};

// App Component
const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/searching" element={<SearchingVisualizer />} />
        <Route path="/graph" element={<GraphVisualizer />} />
        <Route path="/dp" element={<DynamicProgrammingVisualizer />} />
        <Route path="/greedy" element={<GreedyAlgorithmsVisualizer />} />
        <Route path="/backtracking" element={<BacktrackingVisualizer />} />
        <Route path="/tree" element={<TreeAlgorithmVisualizer />} />
        <Route path="/math" element={<MathematicalAlgorithmsVisualizer />} />
        <Route path="/learn-dsa" element={<LearnDSA />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:topic" element={<QuizQuestions />} />
        <Route path="/debugging-challenge" element={<DebuggingChallenge />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/what-we-offer" element={<WhatWeOffer />} />
        <Route path="/stack" element={<StackVisualizer />} /> {/* Add StackVisualizer Route */}
        <Route path="/queue" element={<QueueVisualizer />} /> {/* Add QueueVisualizer Route */}
      </Routes>
      <Footer />
    </>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
