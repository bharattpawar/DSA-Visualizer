import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "/public/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisualizeHovered, setIsVisualizeHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleVisualizeHover = (hoverState) => {
    setIsVisualizeHovered(hoverState);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="dsa-navbar">
      <div className="dsa-navbar-container">
        <Link className="dsa-navbar-brand brand" to="/">
        <img src={logo} className="logo"></img>
        <div className="brand"> 
         <h1>  DSA Visualizer</h1>
          </div>
        </Link>
        <button
          className={`dsa-navbar-toggle ${isOpen ? "dsa-active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="dsa-hamburger"></span>
        </button>
        <div className={`dsa-navbar-links ${isOpen ? "dsa-active" : ""}`}>
          {isMobile ? (
            <>
              <Link className="dsa-nav-link" to="/" onClick={toggleMenu}>
                Home
              </Link>
                <Link className="dsa-nav-link" to="/searching" onClick={toggleMenu}>
                Searching Algorithms
              </Link>
              <Link className="dsa-nav-link" to="/sorting" onClick={toggleMenu}>
                Sorting Algorithms
              </Link>
             
              <Link className="dsa-nav-link" to="/graph" onClick={toggleMenu}>
                Graph Algorithms
              </Link>
              <Link className="dsa-nav-link" to="/dp" onClick={toggleMenu}>
                Dynamic Programming
              </Link>
              <Link className="dsa-nav-link" to="/greedy" onClick={toggleMenu}>
                Greedy Algorithms
              </Link>
              <Link className="dsa-nav-link" to="/backtracking" onClick={toggleMenu}>
                Backtracking
              </Link>
              <Link className="dsa-nav-link" to="/tree" onClick={toggleMenu}>
                Tree Algorithms
              </Link>
              <Link className="dsa-nav-link" to="/math" onClick={toggleMenu}>
                Mathematical Algorithms
              </Link>
              <Link className="dsa-nav-link" to="/stack" onClick={toggleMenu}>
                Stack
              </Link>
              <Link className="dsa-nav-link" to="/queue" onClick={toggleMenu}> {/* Add Queue Link */}
                Queue
              </Link>
              {location.pathname === "/" && (
                <Link className="dsa-nav-link" to="/what-we-offer" onClick={toggleMenu}>
                  What We Offer
                </Link>
              )}
            </>
          ) : (
            <div
              className="dsa-visualize-container"
              onMouseEnter={() => handleVisualizeHover(true)}
              onMouseLeave={() => handleVisualizeHover(false)}
            >
              <span className="dsa-nav-link" id="dsa-visualize">
                Visualize <span style={{ fontSize: "0.9em" }}>▼</span>
              </span>
              <div className={`dsa-visualize-dropdown ${isVisualizeHovered ? "dsa-active" : ""}`}>
                <Link className="dsa-nav-link" to="/" onClick={toggleMenu}>
                  Home
                </Link>
                 <Link className="dsa-nav-link" to="/searching" onClick={toggleMenu}>
                  Searching Algorithms
                </Link>
                <Link className="dsa-nav-link" to="/sorting" onClick={toggleMenu}>
                  Sorting Algorithms
                </Link>
                
                <Link className="dsa-nav-link" to="/graph" onClick={toggleMenu}>
                  Graph Algorithms
                </Link>
                <Link className="dsa-nav-link" to="/dp" onClick={toggleMenu}>
                  Dynamic Programming
                </Link>
                <Link className="dsa-nav-link" to="/greedy" onClick={toggleMenu}>
                  Greedy Algorithms
                </Link>
                <Link className="dsa-nav-link" to="/backtracking" onClick={toggleMenu}>
                  Backtracking
                </Link>
                <Link className="dsa-nav-link" to="/tree" onClick={toggleMenu}>
                  Tree Algorithms
                </Link>
                <Link className="dsa-nav-link" to="/math" onClick={toggleMenu}>
                  Mathematical Algorithms
                </Link>
                <Link className="dsa-nav-link" to="/stack" onClick={toggleMenu}>
                  Stack
                </Link>
                <Link className="dsa-nav-link" to="/queue" onClick={toggleMenu}> {/* Add Queue Link */}
                  Queue
                </Link>
                 
                 
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
