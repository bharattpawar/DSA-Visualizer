// Linear Search Algorithm
export const linearSearch = (array, target) => {
  const steps = [];
  const explanations = [];

  for (let i = 0; i < array.length; i++) {
    steps.push(i);
    explanations.push(`Checking index ${i}: Is ${array[i]} equal to ${target}?`);
    if (array[i] === target) {
      explanations.push(`Found ${target} at index ${i}!`);
      return { steps, explanations, found: true };
    }
  }

  return { steps, explanations, found: false }; // "Not found" message will be added in the component
};

// Binary Search Algorithm
export const binarySearch = (array, target) => {
  const steps = [];
  const explanations = [];

  // Check if the array is sorted
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      explanations.push("Error: Array must be sorted for binary search.");
      return { steps, explanations, found: false, error: true };
    }
  }

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push(mid);
    explanations.push(`Checking index ${mid}: Is ${array[mid]} equal to ${target}?`);

    if (array[mid] === target) {
      explanations.push(`Found ${target} at index ${mid}!`);
      return { steps, explanations, found: true };
    } else if (array[mid] < target) {
      explanations.push(`${array[mid]} is less than ${target}. Searching the right half.`);
      left = mid + 1;
    } else {
      explanations.push(`${array[mid]} is greater than ${target}. Searching the left half.`);
      right = mid - 1;
    }
  }

  return { steps, explanations, found: false }; // "Not found" message will be added in the component
};