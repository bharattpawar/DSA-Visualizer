import React, { useState } from 'react';
import QueueVisualization from './QueueVisualization';
import './styles/QueueVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]); // Queue state
  const [message, setMessage] = useState(''); // Message to display
  const [inputValue, setInputValue] = useState(''); // State for user input

  // Handle enqueue operation
  const handleEnqueue = (value) => {
    setQueue([...queue, value]); // Add value to the end of the queue
    setMessage(`Enqueued ${value} to the queue`);
  };

  // Handle dequeue operation
  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty. Cannot dequeue.');
      return;
    }
    const [dequeuedValue, ...newQueue] = queue; // Remove the first element
    setQueue(newQueue);
    setMessage(`Dequeued ${dequeuedValue} from the queue`);
  };

  // Handle peek operation
  const handlePeek = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty. Nothing to peek.');
      return;
    }
    const frontValue = queue[0]; // Get the front element
    setMessage(`Front of the queue: ${frontValue}`);
  };

  // Handle clear operation
  const handleClear = () => {
    setQueue([]); // Clear the queue
    setMessage('Queue cleared.');
  };

  // Handle user input for enqueue
  const handleEnqueueInput = () => {
    if (!inputValue) {
      setMessage('Please enter a value.');
      return;
    }
    handleEnqueue(parseInt(inputValue)); // Enqueue the entered value
    setInputValue(''); // Clear the input field
  };

  return (
    <div className="queue-visualizer">
      <h1>Queue Visualizer</h1>
      <div className="controls">
        {/* Input field for user-defined value */}
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
        />
        {/* Button to enqueue the entered value */}
        <button onClick={handleEnqueueInput}>Enqueue</button>
        {/* Button to enqueue a random value */}
        <button onClick={() => handleEnqueue(Math.floor(Math.random() * 100))}>
          Enqueue Random
        </button>
        <button onClick={handleDequeue}>Dequeue</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <QueueVisualization queue={queue} />
      <div className="message">{message}</div>
    </div>
  );
};

export default QueueVisualizer;