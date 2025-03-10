import React, { useEffect, useState } from 'react';
import TreeVisualization from './TreeAlgorithmVisualization';
import './styles/LCA.css';

const LCA = ({ values, node1, node2, start }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const initialNodes = values.map((value, index) => ({
      id: index.toString(),
      value,
      visited: false,
      left: 2 * index + 1 < values.length ? (2 * index + 1).toString() : null,
      right: 2 * index + 2 < values.length ? (2 * index + 2).toString() : null,
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

  const startVisualization = () => {
    if (nodes.length === 0 || node1 === undefined || node2 === undefined) return;

    const steps = [];
    const newMessages = [];

    const findLCA = (index, n1, n2) => {
      if (index >= nodes.length) return null;

      const node = nodes[index];
      steps.push(index);
      newMessages.push(`Visiting node ${node.value}`);

      if (node.value === n1 || node.value === n2) {
        newMessages.push(`Found node ${node.value}`);
        return node;
      }

      const leftLCA = findLCA(2 * index + 1, n1, n2);
      const rightLCA = findLCA(2 * index + 2, n1, n2);

      if (leftLCA && rightLCA) {
        newMessages.push(`Lowest Common Ancestor of ${n1} and ${n2} is ${node.value}`);
        return node;
      }

      return leftLCA ? leftLCA : rightLCA;
    };

    findLCA(0, node1, node2);

    setMessages(newMessages);
    setCurrentStep(0);
    setIsRunning(true);

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
          clearInterval(interval);
          setIsRunning(false);
          return prevStep;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (start) {
      startVisualization();
    }
  }, [start]);

  return (
    <div className="lca-container">
      <h3>Lowest Common Ancestor (LCA)</h3>
      <TreeVisualization nodes={nodes} links={links} currentStep={currentStep} />
      <div className="lca-controls">
        <button onClick={startVisualization} disabled={isRunning}>
          Start
        </button>
      </div>
      <div className="messages">
        {messages.slice(0, currentStep + 1).map((message, index) => (
          <div key={index} className={`message ${index === currentStep ? 'active' : ''}`}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LCA;