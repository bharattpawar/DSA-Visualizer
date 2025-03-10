import React, { useState } from 'react';
import ActivitySelection from './ActivitySelection';
import HuffmanCoding from './HuffmanCoding';
import GreedyAlgorithmsVisualization from './GreedyAlgorithmsVisualization';
import './styles/GreedyAlgorithms.css';

const GreedyAlgorithmsVisualizer = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('greedy');

    const handleAlgorithmChange = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

    return (
        <div className="greedy-algorithms">
            <h2>Greedy Algorithms</h2>
            <div className="algorithm-selector">
                <label htmlFor="algorithm">Select Algorithm: </label>
                <select
                    id="algorithm"
                    value={selectedAlgorithm}
                    onChange={handleAlgorithmChange}
                >
                    <option value="greedy">Greedy Algorithm</option>
                    <option value="activity">Activity Selection</option>
                    <option value="huffman">Huffman Coding</option>
                </select>
            </div>

            {selectedAlgorithm === 'greedy' && <GreedyAlgorithmsVisualization />}
            {selectedAlgorithm === 'activity' && <ActivitySelection />}
            {selectedAlgorithm === 'huffman' && <HuffmanCoding />}
        </div>
    );
};

export default GreedyAlgorithmsVisualizer;