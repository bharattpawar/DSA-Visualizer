import React, { useEffect, useState } from 'react';
import TreeVisualization from './TreeAlgorithmVisualization';
import './styles/TreeTraversals.css';

const TreeTraversals = ({ values, start }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000); // Default speed is 1000ms (1 second)

  useEffect(() => {
    const initialNodes = values.map((value, index) => ({
      id: index.toString(),
      value,
      visited: false,
    }));
    const initialLinks = [];
    for (let i = 0; i < values.length; i++) {
      if (2 * i + 1 < values.length) {
        initialLinks.push({ source: i.toString(), target: (2 * i + 1).toString() });
      }
      if (2 * i + 2 < values.length) {
        initialLinks.push({ source: i.toString(), target: (2 * i + 2).toString() });
      }
    }
    setNodes(initialNodes);
    setLinks(initialLinks);
  }, [values]);

  useEffect(() => {
    if (!start || nodes.length === 0) return;

    const steps = [];
    const newMessages = [];

    const inOrderTraversal = (index) => {
      if (index >= nodes.length) return;

      if (index * 2 + 1 < nodes.length) {
        steps.push(index * 2 + 1);
        newMessages.push(`Moving to the left child of node ${nodes[index].value} (node ${nodes[index * 2 + 1].value})`);
        inOrderTraversal(index * 2 + 1);
      }

      steps.push(index);
      newMessages.push(`Visiting node ${nodes[index].value}`);
      nodes[index].visited = true;

      if (index * 2 + 2 < nodes.length) {
        steps.push(index * 2 + 2);
        newMessages.push(`Moving to the right child of node ${nodes[index].value} (node ${nodes[index * 2 + 2].value})`);
        inOrderTraversal(index * 2 + 2);
      }
    };

    inOrderTraversal(0);

    setMessages(newMessages);

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length) {
          setNodes((prevNodes) =>
            prevNodes.map((node, index) =>
              index === steps[prevStep] ? { ...node, visited: true } : node
            )
          );
          return prevStep + 1;
        } else {
          if (prevStep === steps.length) {
            setMessages((prevMessages) => [...prevMessages, "Traversal completed!"]);
          }
          clearInterval(interval);
          return prevStep;
        }
      });
    }, speed); // Use the speed state for the interval duration

    return () => clearInterval(interval);
  }, [start, nodes, speed]);

  return (
    <div className="tree-traversals-container">
      <h3 id="tree-traversals-title">Tree Traversals</h3>
      <div className="speed-control">
        <label htmlFor="speed-slider" className='speedfont'>Speed:</label>
        <input
          id="speed-slider"
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span className='speedfont2'>{speed}ms</span>
      </div>
      <TreeVisualization nodes={nodes} links={links} />
      <div className="tree-traversals-messages">
        {messages.slice(0, currentStep + 1).map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default TreeTraversals;