import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles/TreeAlgorithmVisualization.css';

const TreeVisualization = ({ nodes, links, width = 800, height = 600, currentStep }) => {
  const d3Container = useRef(null);

  // Initialize the tree layout
  const initializeTree = (nodes, links, width, height) => {
    const root = d3.hierarchy(nodes[0], (d) => {
      const children = [];
      links.forEach(link => {
        if (link.source === d.id) {
          const childNode = nodes.find(node => node.id === link.target);
          if (childNode) {
            children.push(childNode);
          }
        }
      });
      return children.length > 0 ? children : null;
    });

    return d3.tree()
      .size([height - 100, width - 100])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5))
      (root);
  };

  // Draw links between nodes
  const drawLinks = (svg, treeData) => {
    svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
  };

  // Draw nodes and labels
  const drawNodes = (svg, treeData, currentStep) => {
    const node = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => {
        if (d.data.id === currentStep?.toString()) {
          return 'orange';
        }
        return d.data.visited ? 'green' : 'steelblue';
      });

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => (d.children ? -28 : 28))
      .style('text-anchor', d => (d.children ? 'end' : 'start'))
      .text(d => d.data.value);
  };

  // Clear the SVG and redraw the tree
  const updateTree = () => {
    if (!nodes || nodes.length === 0 || !d3Container.current) return;

    const svg = d3.select(d3Container.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous visualization

    const treeData = initializeTree(nodes, links, width, height);
    drawLinks(svg, treeData);
    drawNodes(svg, treeData, currentStep);
  };

  useEffect(() => {
    updateTree();
  }, [nodes, links, width, height, currentStep]);

  return (
    <div className="tree-visualization-container">
      <svg ref={d3Container}></svg>
    </div>
  );
};

export default TreeVisualization;