export const animate = (elements, delay) => {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.backgroundColor = '#ffcc00'; // Highlight color
        }, index * delay);
    });
};