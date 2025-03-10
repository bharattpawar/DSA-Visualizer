import React from "react";
import "./LearnDSA.css"; // Import the CSS file

const LearnDSA = () => {
    return (
        <div className="dsa-learn-dsa">
            <h1>Why Learn Data Structures and Algorithms?</h1>
            <p>
                Data Structures and Algorithms (DSA) are the foundation of computer science and programming. 
                They help you write efficient and optimized code, which is essential for solving complex problems 
                and building scalable applications.
            </p>

            <h2>Key Benefits of Learning DSA:</h2>
            <ul>
                <li>Improves problem-solving skills.</li>
                <li>Enhances coding efficiency and performance.</li>
                <li>Prepares you for technical interviews.</li>
                <li>Essential for competitive programming.</li>
                <li>Helps in understanding how software works under the hood.</li>
            </ul>

            <h2>Common Data Structures:</h2>
            <ul>
                <li>Arrays</li>
                <li>Linked Lists</li>
                <li>Stacks</li>
                <li>Queues</li>
                <li>Trees</li>
                <li>Graphs</li>
                <li>Hash Tables</li>
            </ul>

            <h2>Common Algorithms:</h2>
            <ul>
                <li>Sorting Algorithms (e.g., Quick Sort, Merge Sort)</li>
                <li>Searching Algorithms (e.g., Binary Search)</li>
                <li>Dynamic Programming</li>
                <li>Greedy Algorithms</li>
                <li>Backtracking</li>
                <li>Graph Algorithms (e.g., Dijkstra's, BFS, DFS)</li>
            </ul>

            <h2>Learn DSA with Coder Army YouTube Playlist</h2>
            <p>
                Check out Coder Army YouTube playlist to learn DSA in a structured and easy-to-understand way:
            </p>
            <a
                href="https://www.youtube.com/watch?v=y3OOaXrFy-Q&list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01"
                target="_blank"
                rel="noopener noreferrer"
                className="dsa-youtube-link"
            >
                Watch Now
            </a>
        </div>
    );
};

export default LearnDSA;