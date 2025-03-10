// Bubble Sort
export const bubbleSort = (array) => {
    const steps = [];
    const explanations = [];
    const states = []; // Track the state of each bar
    let n = array.length;
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Mark the bars being compared as "active"
        const currentState = array.map((_, idx) => (idx === i || idx === i + 1 ? 'active' : 'default'));
        steps.push([...array]);
        states.push([...currentState]);
        explanations.push(`Comparing ${array[i]} and ${array[i + 1]}`);
  
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
          explanations.push(`Swapped ${array[i]} and ${array[i + 1]}`);
        }
      }
      // Mark the last sorted bar as "sorted"
      const sortedState = array.map((_, idx) => (idx >= n - 1 ? 'sorted' : 'default'));
      states.push([...sortedState]);
      n--;
    } while (swapped);
  
    steps.push([...array]);
    states.push(array.map(() => 'sorted')); // All bars are sorted
    explanations.push("Array is sorted.");
    return { steps, states, explanations };
  };
  
  // Selection Sort
  export const selectionSort = (array) => {
    const steps = [];
    const explanations = [];
    const states = []; // Track the state of each bar
    let n = array.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      steps.push([...array]);
      states.push(array.map((_, idx) => (idx === i ? 'active' : 'default')));
      explanations.push(`Finding the minimum element from index ${i} to ${n - 1}`);
  
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        explanations.push(`Swapped ${array[i]} and ${array[minIndex]}`);
      }
  
      steps.push([...array]);
      states.push(array.map((_, idx) => (idx <= i ? 'sorted' : 'default')));
    }
  
    steps.push([...array]);
    states.push(array.map(() => 'sorted')); // All bars are sorted
    explanations.push("Array is sorted.");
    return { steps, states, explanations };
  };
  
  // Insertion Sort
  export const insertionSort = (array) => {
    const steps = [];
    const explanations = [];
    const states = []; // Track the state of each bar
    let n = array.length;
  
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      steps.push([...array]);
      states.push(array.map((_, idx) => (idx === i ? 'active' : 'default')));
      explanations.push(`Inserting ${key} into the sorted subarray`);
  
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
  
      array[j + 1] = key;
      steps.push([...array]);
      states.push(array.map((_, idx) => (idx <= i ? 'sorted' : 'default')));
    }
  
    steps.push([...array]);
    states.push(array.map(() => 'sorted')); // All bars are sorted
    explanations.push("Array is sorted.");
    return { steps, states, explanations };
  };
  
  // Merge Sort
  export const mergeSort = (array) => {
    const steps = [];
    const explanations = [];
    const states = []; // Track the state of each bar
  
    const merge = (left, right) => {
      let result = [];
      let i = 0,
        j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
  
      return result.concat(left.slice(i)).concat(right.slice(j));
    };
  
    const sort = (arr) => {
      if (arr.length <= 1) return arr;
  
      const mid = Math.floor(arr.length / 2);
      const left = sort(arr.slice(0, mid));
      const right = sort(arr.slice(mid));
  
      steps.push([...left, ...right]);
      states.push(arr.map((_, idx) => (idx < mid ? 'active' : 'default')));
      explanations.push(`Merging ${left} and ${right}`);
  
      return merge(left, right);
    };
  
    const sortedArray = sort(array);
    steps.push([...sortedArray]);
    states.push(array.map(() => 'sorted')); // All bars are sorted
    explanations.push("Array is sorted.");
    return { steps, states, explanations };
  };
  
  // Quick Sort
  export const quickSort = (array) => {
    const steps = [];
    const explanations = [];
    const states = []; // Track the state of each bar
  
    const sort = (arr) => {
      if (arr.length <= 1) return arr;
  
      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];
  
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
  
      steps.push([...left, pivot, ...right]);
      states.push(arr.map((_, idx) => (idx === arr.length - 1 ? 'active' : 'default')));
      explanations.push(`Partitioning around pivot ${pivot}`);
  
      return [...sort(left), pivot, ...sort(right)];
    };
  
    const sortedArray = sort(array);
    steps.push([...sortedArray]);
    states.push(array.map(() => 'sorted')); // All bars are sorted
    explanations.push("Array is sorted.");
    return { steps, states, explanations };
  };