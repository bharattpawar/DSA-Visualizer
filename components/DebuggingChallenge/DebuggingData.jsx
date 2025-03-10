export const debuggingData = [
    {
      id: 1,
      language: "JavaScript",
      code: `function add(a, b) {
    return a + b;
  }
  
  console.log(add(2, '3')); // Output: "23"`,
      description: "This function is supposed to add two numbers, but it's concatenating them instead. Find the bug!",
      hints: [
        "Check the data types of the inputs.",
        "JavaScript uses the `+` operator for both addition and concatenation.",
        "Convert the inputs to numbers before adding them.",
      ],
      solution: `function add(a, b) {
    return Number(a) + Number(b);
  }`,
    },
    {
      id: 2,
      language: "Python",
      code: `def divide(a, b):
    return a / b
  
  print(divide(10, 0))  # Output: ZeroDivisionError`,
      description: "This function divides two numbers but crashes when dividing by zero. Handle the error!",
      hints: [
        "Check for division by zero before performing the operation.",
        "Use a try-except block to handle the error.",
        "Return a meaningful message when division by zero occurs.",
      ],
      solution: `def divide(a, b):
    try:
      return a / b
    except ZeroDivisionError:
      return "Error: Division by zero is not allowed."`,
    },
    {
      id: 3,
      language: "JavaScript",
      code: `const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => {
    num * 2;
  });
  
  console.log(doubled); // Output: [undefined, undefined, undefined, undefined, undefined]`,
      description: "This code is supposed to double each number in the array, but it's returning `undefined`. Find the bug!",
      hints: [
        "Check the return value of the `map` function.",
        "The arrow function is missing a `return` statement.",
        "Add a `return` statement inside the arrow function.",
      ],
      solution: `const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => {
    return num * 2;
  });`,
    },
  ];