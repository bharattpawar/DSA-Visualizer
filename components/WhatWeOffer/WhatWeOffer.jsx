import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./WhatWeOffer.css"; // Optional: For styling this page

const WhatWeOffer = () => {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="what-we-offer">
      <h1>What We Offer</h1>
      <p>
        Welcome to the Data Structures and Algorithms Visualizer! Here, you can
        explore various algorithms and data structures with interactive
        visualizations. Below is a list of algorithm categories we offer, along
        with a brief explanation and a link to visualize them.
      </p>
    {/* Searching Algorithms */}
      <div className="algorithm-category">
        <h2>Searching Algorithms</h2>
        <p>
          Searching algorithms are used to find a specific element in a data
          structure. Common searching algorithms include Linear Search and Binary
          Search.
        </p>
        <Link to="/searching" className="visualize-button">
          Visualize Searching Algorithms
        </Link>
      </div>
      {/* Sorting Algorithms */}
      <div className="algorithm-category">
        <h2>Sorting Algorithms</h2>
        <p>
          Sorting algorithms are used to rearrange a list of elements in a
          specific order (e.g., ascending or descending). Common sorting
          algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge
          Sort, and Quick Sort.
        </p>
        <Link to="/sorting" className="visualize-button">
          Visualize Sorting Algorithms
        </Link>
      </div>

   

      {/* Graph Algorithms */}
      <div className="algorithm-category">
        <h2>Graph Algorithms</h2>
        <p>
          Graph algorithms are used to solve problems related to graphs, such as
          finding the shortest path or detecting cycles. Common graph algorithms
          include BFS, DFS, Dijkstra’s, Prim’s, and Kruskal’s.
        </p>
        <Link to="/graph" className="visualize-button">
          Visualize Graph Algorithms
        </Link>
      </div>

      {/* Dynamic Programming */}
      <div className="algorithm-category">
        <h2>Dynamic Programming</h2>
        <p>
          Dynamic Programming is a technique used to solve problems by breaking
          them down into smaller subproblems. Common examples include Fibonacci,
          Knapsack, LCS, and LIS.
        </p>
        <Link to="/dp" className="visualize-button">
          Visualize Dynamic Programming
        </Link>
      </div>

      {/* Greedy Algorithms */}
      <div className="algorithm-category">
        <h2>Greedy Algorithms</h2>
        <p>
          Greedy algorithms make locally optimal choices at each step to find a
          global solution. Examples include Activity Selection and Huffman
          Coding.
        </p>
        <Link to="/greedy" className="visualize-button">
          Visualize Greedy Algorithms
        </Link>
      </div>

      {/* Backtracking */}
      <div className="algorithm-category">
        <h2>Backtracking</h2>
        <p>
          Backtracking is a technique used to solve problems by trying out
          possible solutions and abandoning them if they don't work. Examples
          include the N-Queens problem and Sudoku Solver.
        </p>
        <Link to="/backtracking" className="visualize-button">
          Visualize Backtracking
        </Link>
      </div>

      {/* Tree Algorithms */}
      <div className="algorithm-category">
        <h2>Tree Algorithms</h2>
        <p>
          Tree algorithms are used to solve problems related to tree data
          structures. Examples include Tree Traversals, BST Operations, AVL
          Rotations, and LCA.
        </p>
        <Link to="/tree" className="visualize-button">
          Visualize Tree Algorithms
        </Link>
      </div>

      {/* Mathematical Algorithms */}
      <div className="algorithm-category">
        <h2>Mathematical Algorithms</h2>
        <p>
          Mathematical algorithms are used to solve problems related to
          mathematics. Examples include GCD (Euclidean), Sieve of Eratosthenes,
          and Prime Factorization.
        </p>
        <Link to="/math" className="visualize-button">
          Visualize Mathematical Algorithms
        </Link>
      </div>

      {/* Stack */}
      <div className="algorithm-category">
        <h2>Stack</h2>
        <p>
          A stack is a linear data structure that follows the Last-In-First-Out
          (LIFO) principle. It supports two main operations: Push (add an element
          to the top) and Pop (remove the top element). Stacks are commonly used
          in problems like balancing parentheses, expression evaluation, and undo
          mechanisms.
        </p>
        <Link to="/stack" className="visualize-button">
          Visualize Stack
        </Link>
      </div>
      <div className="algorithm-category">
  <h2>Queue</h2>
  <p>
    A queue is a linear data structure that follows the First-In-First-Out (FIFO)
    principle. It supports two main operations: Enqueue (add an element to the
    rear) and Dequeue (remove an element from the front). Queues are commonly
    used in scenarios like task scheduling, print spooling, and BFS algorithms.
  </p>
  <Link to="/queue" className="visualize-button">
    Visualize Queue
  </Link>
</div>

      {/* Add a Home Button at the Bottom */}
      <div className="home-button-container">
        <Link to="/" className="home-button">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default WhatWeOffer;
