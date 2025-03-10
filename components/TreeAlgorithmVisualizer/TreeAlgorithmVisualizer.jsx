import React, { useState } from 'react';
import TreeTraversals from './TreeTraversals';
import BST_Operations from './BST_Operations';
import AVL_Rotations from './AVL_Rotations';
import LCA from './LCA';
import './styles/TreeAlgorithmVisualizer.css';

const TreeAlgorithmVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('traversal');
  const [inputValues, setInputValues] = useState('');
  const [randomValues, setRandomValues] = useState([]);
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  const getAlgorithmDescription = () => {
    switch (algorithm) {
      case 'traversal':
        return "Tree Traversals: In-order, Pre-order, and Post-order traversals are methods to visit all nodes in a tree.";
      case 'bst':
        return "BST Operations: Insertion, Deletion, and Search in a Binary Search Tree.";
      case 'avl':
        return "AVL Rotations: Balancing a tree using AVL rotations to maintain a balanced height.";
      case 'lca':
        return "Lowest Common Ancestor (LCA): Finding the lowest common ancestor of two nodes in a tree.";
      default:
        return "Select an algorithm to visualize.";
    }
  };

  const getAlgorithmComponent = () => {
    const values = inputValues ? inputValues.split(',').map(Number) : randomValues;
    const props = { values, start };

    switch (algorithm) {
      case 'traversal':
        return <TreeTraversals {...props} />;
      case 'bst':
        return <BST_Operations {...props} />;
      case 'avl':
        return <AVL_Rotations {...props} />;
      case 'lca':
        return <LCA {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="tree-algo-visualizer-container">
      <h1 id="tree-algo-visualizer-title">Tree Algorithm Visualizer</h1>
      <div className="tree-algo-visualizer-inputs">
        <input
          id="tree-algo-visualizer-custom-input"
          type="text"
          placeholder="Enter custom values"
          value={inputValues}
          onChange={(e) => {
            setInputValues(e.target.value);
            setStart(false);
          }}
        />
        <button
          id="tree-algo-visualizer-random-btn"
          onClick={() => {
            setRandomValues([...Array(10)].map(() => Math.floor(Math.random() * 100)));
            setStart(false);
          }}
        >
          Generate Random Values
        </button>
      </div>
      <select
        id="tree-algo-visualizer-algorithm-select"
        value={algorithm}
        onChange={(e) => {
          setAlgorithm(e.target.value);
          setStart(false);
        }}
      >
        <option value="traversal">Tree Traversals</option>
        <option value="bst">BST Operations</option>
        <option value="avl">AVL Rotations</option>
        <option value="lca">LCA</option>
      </select>
      <button id="tree-algo-visualizer-start-btn" onClick={handleStart}>
        Start
      </button>
      <div className="algorithm-description">
        <p>{getAlgorithmDescription()}</p>
      </div>
      {getAlgorithmComponent()}
    </div>
  );
};

export default TreeAlgorithmVisualizer;
