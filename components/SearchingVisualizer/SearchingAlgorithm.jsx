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

/*
  Time Complexity of Linear Search:
  - Best Case: O(1) (when the target is at the first position)
  - Average Case: O(n)
  - Worst Case: O(n) (when the target is at the last position or not present)

  Space Complexity of Linear Search: O(1)
*/

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

/*
  Time Complexity of Binary Search:
  - Best Case: O(1) (when the target is at the middle position)
  - Average Case: O(log n)
  - Worst Case: O(log n) (when the target is not present in the array)

  Space Complexity of Binary Search: O(1)
*/