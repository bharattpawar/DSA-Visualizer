import React, { useEffect, useState, useRef } from 'react';
import TreeVisualization from './TreeAlgorithmVisualization';
import './styles/BST_Operations.css';

const BST_Operations = ({ values }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // Default speed is 1000ms (1 second)
  const insertionPerformed = useRef(false);

  useEffect(() => {
    if (!values || values.length === 0) return;

    const initialNodes = [];
    const initialLinks = [];

    const addNode = (value, parentIndex = null, isLeftChild = false) => {
      const index = initialNodes.length;
      const node = { id: index.toString(), value, visited: false, left: null, right: null };
      initialNodes.push(node);
      if (parentIndex !== null) {
        initialLinks.push({
          source: parentIndex.toString(),
          target: index.toString(),
          isLeftChild,
        });
      }
      return index;
    };

    const buildBST = (values, start, end, parentIndex = null, isLeftChild = false) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const index = addNode(values[mid], parentIndex, isLeftChild);
      buildBST(values, start, mid - 1, index, true);
      buildBST(values, mid + 1, end, index, false);
    };

    const sortedValues = [...values].sort((a, b) => a - b);
    buildBST(sortedValues, 0, sortedValues.length - 1);

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, [values]);

  const startVisualization = () => {
    if (nodes.length === 0 || values.length <= 1 || insertionPerformed.current) return;

    const steps = [];
    const messages = [];

    messages.push(`Problem: Insert the following values into a BST: ${values.join(', ')}.`);
    messages.push(`Solution: We will insert the values one by one, following the BST property.`);

    const remainingValues = values.slice(1);

    const bstInsert = (index, value, nodes, links) => {
      if (index >= nodes.length) return { nodes, links };

      const node = nodes[index];
      if (value < node.value) {
        messages.push(`Step ${messages.length + 1}: Value ${value} < Node ${node.value}: Go left`);
        steps.push(index);
        if (node.left !== null) {
          return bstInsert(node.left, value, nodes, links);
        } else {
          messages.push(`Step ${messages.length + 1}: Inserting ${value} as left child of ${node.value}`);
          const newIndex = nodes.length;
          const newNode = { id: newIndex.toString(), value, visited: false, left: null, right: null };
          const newLink = { source: node.id, target: newIndex.toString(), isLeftChild: true };
          nodes[index].left = newIndex;
          return {
            nodes: [...nodes, newNode],
            links: [...links, newLink],
          };
        }
      } else {
        messages.push(`Step ${messages.length + 1}: Value ${value} >= Node ${node.value}: Go right`);
        steps.push(index);
        if (node.right !== null) {
          return bstInsert(node.right, value, nodes, links);
        } else {
          messages.push(`Step ${messages.length + 1}: Inserting ${value} as right child of ${node.value}`);
          const newIndex = nodes.length;
          const newNode = { id: newIndex.toString(), value, visited: false, left: null, right: null };
          const newLink = { source: node.id, target: newIndex.toString(), isLeftChild: false };
          nodes[index].right = newIndex;
          return {
            nodes: [...nodes, newNode],
            links: [...links, newLink],
          };
        }
      }
    };

    let updatedNodes = [...nodes];
    let updatedLinks = [...links];

    remainingValues.forEach((value) => {
      const result = bstInsert(0, value, updatedNodes, updatedLinks);
      updatedNodes = result.nodes;
      updatedLinks = result.links;
    });

    messages.push("All values have been inserted into the BST. Visualization complete!");

    setMessages(messages);
    setNodes(updatedNodes);
    setLinks(updatedLinks);
    insertionPerformed.current = true;

    setIsRunning(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < messages.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          setIsRunning(false);
          return prevStep;
        }
      });
    }, speed); // Use the speed state for the interval duration

    return () => clearInterval(interval);
  };

  return (
    <div className="bst-operations-container">
      <h3 id="bst-operations-title">BST Operations</h3>
      <div className="speed-control">
        <label htmlFor="speed-slider">Speed:</label>
        <input
          id="speed-slider"
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span>{speed}ms</span>
      </div>
      <TreeVisualization nodes={nodes} links={links} />
      <div className="bst-operations-controls">
        <button onClick={startVisualization} disabled={isRunning || insertionPerformed.current}>
          {insertionPerformed.current ? "Completed" : "Start"}
        </button>
      </div>
      <div className="bst-operations-messages">
        {messages.slice(0, currentStep + 1).map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default BST_Operations;