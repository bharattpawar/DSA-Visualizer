import React, { useState } from 'react';
import StackVisualization from './StackVisualization';
import './styles/StackVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]); // Stack state
  const [message, setMessage] = useState(''); // Message to display
  const [inputValue, setInputValue] = useState(''); // State for user input

  // Handle push operation
  const handlePush = (value) => {
    setStack([...stack, value]); // Add value to the stack
    setMessage(`Pushed ${value} to the stack`);
  };

  // Handle pop operation
  const handlePop = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty. Cannot pop.');
      return;
    }
    const newStack = [...stack];
    const poppedValue = newStack.pop(); // Remove the top element
    setStack(newStack);
    setMessage(`Popped ${poppedValue} from the stack`);
  };

  // Handle peek operation
  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty. Nothing to peek.');
      return;
    }
    const topValue = stack[stack.length - 1]; // Get the top element
    setMessage(`Peeked ${topValue} from the stack`);
  };

  // Handle clear operation
  const handleClear = () => {
    setStack([]); // Clear the stack
    setMessage('Stack cleared.');
  };

  // Handle user input for push
  const handlePushInput = () => {
    if (!inputValue) {
      setMessage('Please enter a value.');
      return;
    }
    handlePush(parseInt(inputValue)); // Push the entered value
    setInputValue(''); // Clear the input field
  };

  return (
    <div className="stack-visualizer">
      <h1>Stack Visualizer</h1>
      <div className="controls">
        {/* Input field for user-defined value */}
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
        />
        {/* Button to push the entered value */}
        <button onClick={handlePushInput}>Push</button>
        {/* Button to push a random value */}
        <button onClick={() => handlePush(Math.floor(Math.random() * 100))}>
          Push Random
        </button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <StackVisualization stack={stack} />
      <div className="message">{message}</div>
    </div>
  );
};

export default StackVisualizer;