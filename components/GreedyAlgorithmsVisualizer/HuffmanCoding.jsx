
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { generateRandomValues } from './utils/randomValueGenerator';
import { buildHuffmanTree } from './utils/huffmanTree';
import { animate } from './utils/animation';
import './styles/HuffmanCoding.css';

const HuffmanCoding = () => {
    const [characters, setCharacters] = useState([]);
    const [codes, setCodes] = useState({});
    const [tree, setTree] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [stepByStepExplanation, setStepByStepExplanation] = useState([]);
    const svgRef = useRef();

    const handleRandomValues = () => {
        const randomValues = generateRandomValues(5, 1, 20);
        setCharacters(randomValues);
        setExplanation('Random frequencies generated. Click "Build Huffman Tree" to visualize the tree and generate codes.');
        setCodes({});
        setTree(null);
        setStepByStepExplanation([]);
    };

    const handleUserInput = (event) => {
        const inputValues = event.target.value.split(',').map(Number);
        setCharacters(inputValues);
        setExplanation('Frequencies entered. Click "Build Huffman Tree" to visualize the tree and generate codes.');
        setCodes({});
        setTree(null);
        setStepByStepExplanation([]);
    };

    const buildHuffmanTreeHandler = () => {
        if (characters.length === 0) {
            setExplanation('Please enter frequencies or generate random values.');
            return;
        }

        const steps = [];
        steps.push('Step 1: Start with the given frequencies.');
        steps.push(`Frequencies: ${characters.join(', ')}`);

        const huffmanTree = buildHuffmanTree(characters);
        setTree(huffmanTree);

        steps.push('Step 2: Build the Huffman tree by repeatedly combining the two nodes with the smallest frequencies.');
        steps.push('Step 3: Assign binary codes to each character by traversing the tree.');

        const huffmanCodes = {};
        const traverse = (node, code = '') => {
            if (node.char) {
                huffmanCodes[node.char] = code;
                steps.push(`Assigned code: ${node.char} -> ${code}`);
                return;
            }
            traverse(node.left, code + '0');
            traverse(node.right, code + '1');
        };

        traverse(huffmanTree);
        setCodes(huffmanCodes);
        setExplanation('Huffman tree built. Codes generated for each character.');
        setStepByStepExplanation(steps);
        animate(document.querySelectorAll('.character'), 500);
    };

    useEffect(() => {
        if (tree && svgRef.current) {
            visualizeTree(tree, svgRef.current);
        }
    }, [tree]);

    const visualizeTree = (tree, svgElement) => {
        const svg = d3.select(svgElement);
        svg.selectAll('*').remove(); // Clear previous visualization

        const width = 400;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

        const root = d3.hierarchy(tree, (d) => [d.left, d.right].filter(Boolean));
        treeLayout(root);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Draw links
        g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkVertical()
                .x((d) => d.x)
                .y((d) => d.y)
            )
            .style('stroke', '#999')
            .style('stroke-width', 2)
            .style('fill', 'none');

        // Draw nodes
        const nodes = g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.x},${d.y})`);

        nodes.append('circle')
            .attr('r', 10)
            .style('fill', '#69b3a2')
            .style('stroke', '#999')
            .style('stroke-width', 2);

        nodes.append('text')
            .attr('dy', '0.31em')
            .attr('x', (d) => d.children ? -15 : 15)
            .style('text-anchor', (d) => d.children ? 'end' : 'start')
            .text((d) => d.data.char || d.data.freq);
    };

    return (
        <div className="huffman-coding">
            <h3>Huffman Coding</h3>
            <button onClick={handleRandomValues}>Generate Random Frequencies</button>
            <input type="text" placeholder="Enter frequencies (e.g., 5,9,12)" onChange={handleUserInput} />
            <button onClick={buildHuffmanTreeHandler}>Build Huffman Tree</button>
            <div className="characters">
                <h4>Frequencies:</h4>
                {characters.map((freq, index) => (
                    <div key={index} className="character">
                        Character {index + 1}: {freq}
                    </div>
                ))}
            </div>
            <div className="codes">
                <h4>Huffman Codes:</h4>
                {Object.entries(codes).map(([char, code]) => (
                    <div key={char}>{char}: {code}</div>
                ))}
            </div>
            <div className="tree-visualization">
                <h4>Huffman Tree Visualization:</h4>
                <svg ref={svgRef} width="400" height="300"></svg>
            </div>
            <div className="explanation">
                <h4>Explanation:</h4>
                <p>{explanation}</p>
                <h4>Step-by-Step Process:</h4>
                <ul>
                    {stepByStepExplanation.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HuffmanCoding;