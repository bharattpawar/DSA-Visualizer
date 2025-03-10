export const generateRandomValues = (count, min, max) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const generateRandomActivities = (count, min, max) => {
    return Array.from({ length: count }, () => {
        const start = Math.floor(Math.random() * (max - min + 1)) + min;
        const end = start + Math.floor(Math.random() * (max - start + 1));
        return { start, end };
    });
};

export const handleInput = (setValues) => (event) => {
    const inputValues = event.target.value.split(',').map(Number);
    setValues(inputValues);
};