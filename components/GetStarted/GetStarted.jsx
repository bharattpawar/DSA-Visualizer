import React from "react";
import { Link } from "react-router-dom";
import "./GetStarted.css"; // Optional: For styling this page

const GetStarted = () => {
  return (
    <div className="get-started">
      <h1>Why is DSA Visualization Important?</h1>
      <div className="content">
        <p>
          Data Structures and Algorithms (DSA) are the building blocks of computer science. They form the foundation of efficient problem-solving and are essential for writing optimized code. However, understanding how these algorithms work can be challenging, especially for beginners.
        </p>
        <p>
          Visualization helps bridge this gap by providing an interactive way to see how algorithms operate step-by-step. Instead of just reading about algorithms or looking at static diagrams, visualization allows you to observe how data is manipulated in real-time. This makes it easier to grasp complex concepts like sorting, searching, and graph traversal.
        </p>
        <p>
          By visualizing algorithms, you can see how different approaches (e.g., Bubble Sort vs. Quick Sort) perform under various conditions. This not only enhances your understanding but also helps you appreciate the importance of choosing the right algorithm for a given problem.
        </p>
        <p>
          Whether you're a student, a professional, or someone preparing for coding interviews, DSA visualization can significantly improve your learning experience. It makes abstract concepts tangible and helps you build a strong foundation in computer science.
        </p>
      </div>
      <Link to="/sorting" className="visualize-now-button">
        Visualize Now
      </Link>
    </div>
  );
};

export default GetStarted;