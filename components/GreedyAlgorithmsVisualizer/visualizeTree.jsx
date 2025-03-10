

export const visualizeTree = (tree, svgElement) => {
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