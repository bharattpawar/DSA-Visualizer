import React, { useEffect, useState } from 'react';
import TreeVisualization from './TreeAlgorithmVisualization';
import './styles/AVL_Rotations.css';

const AVL_Rotations = ({ values }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [steps, setSteps] = useState([]); // Stores { message, nodesToHighlight }

  // Initialize tree structure
  useEffect(() => {
    if (!values || values.length === 0) return;

    const initialNodes = values.map((value, index) => ({
      id: index.toString(),
      value,
      visited: false,
      height: 1,
      left: 2 * index + 1 < values.length ? (2 * index + 1).toString() : null,
      right: 2 * index + 2 < values.length ? (2 * index + 2).toString() : null,
    }));

    const initialLinks = [];
    for (let i = 0; i < values.length; i++) {
      if (initialNodes[i].left) {
        initialLinks.push({ source: i.toString(), target: initialNodes[i].left });
      }
      if (initialNodes[i].right) {
        initialLinks.push({ source: i.toString(), target: initialNodes[i].right });
      }
    }

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, [values]);

  const startVisualization = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    setMessages([]);
    setSteps([]);

    // Clone nodes and links for simulation
    const simulatedNodes = JSON.parse(JSON.stringify(nodes));
    const simulatedLinks = JSON.parse(JSON.stringify(links));
    const newSteps = [];

    const getHeight = (index) => {
      if (!simulatedNodes[index]) return 0;
      return simulatedNodes[index].height;
    };

    const updateHeight = (index) => {
      if (!simulatedNodes[index]) return;
      const leftHeight = getHeight(simulatedNodes[index].left);
      const rightHeight = getHeight(simulatedNodes[index].right);
      simulatedNodes[index].height = Math.max(leftHeight, rightHeight) + 1;
    };

    const rotateRight = (index) => {
      const leftChildIndex = simulatedNodes[index].left;
      if (!leftChildIndex) return;

      const node = simulatedNodes[index];
      const leftChild = simulatedNodes[leftChildIndex];

      // Swap positions
      [node.value, leftChild.value] = [leftChild.value, node.value];
      [node.left, leftChild.left] = [leftChild.left, node.left];
      [node.right, leftChild.right] = [leftChild.right, node.right];

      updateHeight(index);
      updateHeight(leftChildIndex);

      newSteps.push({
        message: `Rotating right at node ${node.value}`,
        highlight: [index, leftChildIndex],
      });
    };

    const rotateLeft = (index) => {
      const rightChildIndex = simulatedNodes[index].right;
      if (!rightChildIndex) return;

      const node = simulatedNodes[index];
      const rightChild = simulatedNodes[rightChildIndex];

      // Swap positions
      [node.value, rightChild.value] = [rightChild.value, node.value];
      [node.left, rightChild.left] = [rightChild.left, node.left];
      [node.right, rightChild.right] = [rightChild.right, node.right];

      updateHeight(index);
      updateHeight(rightChildIndex);

      newSteps.push({
        message: `Rotating left at node ${node.value}`,
        highlight: [index, rightChildIndex],
      });
    };

    const balance = (index) => {
      if (!simulatedNodes[index]) return;

      const leftHeight = getHeight(simulatedNodes[index].left);
      const rightHeight = getHeight(simulatedNodes[index].right);
      const balanceFactor = leftHeight - rightHeight;

      if (balanceFactor > 1) {
        rotateRight(index);
      } else if (balanceFactor < -1) {
        rotateLeft(index);
      }

      if (simulatedNodes[index].left) balance(simulatedNodes[index].left);
      if (simulatedNodes[index].right) balance(simulatedNodes[index].right);
    };

    // Perform balancing and collect steps
    balance(0);
    setSteps(newSteps);
    setMessages(newSteps.map(step => step.message));
  };

  // Run animation when steps change
  useEffect(() => {
    if (!isRunning || steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          // Highlight nodes for this step
          const newNodes = nodes.map((node, index) => ({
            ...node,
            visited: steps[prev].highlight.includes(index),
          }));
          setNodes(newNodes);
          return prev + 1;
        } else {
          setIsRunning(false);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, steps, speed]);

  return (
    <div className="avl-rotations-container">
      <h3>AVL Rotations</h3>
      <div className="controls">
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>
        <button onClick={startVisualization} disabled={isRunning}>
          {isRunning ? "Running..." : "Start"}
        </button>
      </div>
      <TreeVisualization nodes={nodes} links={links} currentStep={currentStep} />
      <div className="messages">
        {messages.slice(0, currentStep + 1).map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default AVL_Rotations;