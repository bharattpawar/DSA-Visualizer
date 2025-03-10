export const quizData = {
    arrays: [
      {
        question: "What is the time complexity of accessing an element in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "Arrays provide constant-time access to elements using their index."
      },
      {
        question: "Which of the following is a disadvantage of arrays?",
        options: ["Fixed size", "Fast access", "Memory efficiency", "Easy to implement"],
        answer: "Fixed size",
        explanation: "Arrays have a fixed size, which can lead to wasted memory or the need for resizing."
      },
      {
        question: "What is the time complexity of searching for an element in an unsorted array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "In the worst case, you may need to check every element in the array."
      },
      {
        question: "What is the time complexity of inserting an element at the end of a dynamic array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "Dynamic arrays allow amortized constant-time insertion at the end."
      },
      {
        question: "Which of the following is true about arrays?",
        options: ["They use contiguous memory", "They are dynamic in size", "They are slower than linked lists for random access", "They cannot store duplicate elements"],
        answer: "They use contiguous memory",
        explanation: "Arrays store elements in contiguous memory locations."
      },
      {
        question: "What is the time complexity of deleting an element from the middle of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Deleting an element from the middle requires shifting all subsequent elements."
      },
      {
        question: "Which of the following is a use case for arrays?",
        options: ["Storing a list of names", "Implementing a stack", "Implementing a queue", "All of the above"],
        answer: "All of the above",
        explanation: "Arrays are versatile and can be used for various purposes."
      },
      {
        question: "What is the space complexity of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Arrays require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is a disadvantage of dynamic arrays?",
        options: ["They waste memory", "They require resizing", "They have slow access time", "They cannot store elements of different types"],
        answer: "They require resizing",
        explanation: "Dynamic arrays may need to resize, which can be an expensive operation."
      },
      {
        question: "What is the time complexity of reversing an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Reversing an array requires swapping elements, which takes linear time."
      }
    ],
    linkedLists: [
      {
        question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "Insertion at the beginning of a singly linked list is a constant-time operation."
      },
      {
        question: "Which of the following is true about linked lists?",
        options: ["They have fixed size", "They use contiguous memory", "They allow dynamic memory allocation", "They are slower than arrays for random access"],
        answer: "They allow dynamic memory allocation",
        explanation: "Linked lists dynamically allocate memory for each node, allowing flexible size."
      },
      {
        question: "What is the time complexity of searching for an element in a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "In the worst case, you may need to traverse the entire list."
      },
      {
        question: "Which of the following is a disadvantage of linked lists?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They have slow access time",
        explanation: "Linked lists have O(n) access time compared to O(1) for arrays."
      },
      {
        question: "What is the time complexity of deleting an element from the end of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "You need to traverse the entire list to reach the last element."
      },
      {
        question: "Which of the following is a use case for linked lists?",
        options: ["Implementing a stack", "Implementing a queue", "Implementing a hash table", "All of the above"],
        answer: "All of the above",
        explanation: "Linked lists are versatile and can be used for various purposes."
      },
      {
        question: "What is the space complexity of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Linked lists require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is true about doubly linked lists?",
        options: ["They have faster access time than singly linked lists", "They use less memory than singly linked lists", "They allow traversal in both directions", "They cannot be used to implement stacks"],
        answer: "They allow traversal in both directions",
        explanation: "Doubly linked lists have pointers to both the next and previous nodes."
      },
      {
        question: "What is the time complexity of reversing a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Reversing a singly linked list requires traversing the entire list."
      },
      {
        question: "Which of the following is a disadvantage of doubly linked lists?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They waste memory",
        explanation: "Doubly linked lists require extra memory for the previous pointer."
      }
    ],
    stacks: [
      {
        question: "What is the principle of stack data structure?",
        options: ["FIFO", "LIFO", "Random Access", "Priority Order"],
        answer: "LIFO",
        explanation: "Stacks follow the Last-In-First-Out (LIFO) principle."
      },
      {
        question: "Which operation is used to add an element to the stack?",
        options: ["Push", "Pop", "Peek", "Dequeue"],
        answer: "Push",
        explanation: "The 'Push' operation adds an element to the top of the stack."
      },
      {
        question: "What is the time complexity of the 'Pop' operation in a stack?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "The 'Pop' operation removes the top element in constant time."
      },
      {
        question: "Which of the following is a use case for stacks?",
        options: ["Undo functionality in text editors", "Implementing a queue", "Storing a list of names", "All of the above"],
        answer: "Undo functionality in text editors",
        explanation: "Stacks are commonly used for undo/redo operations."
      },
      {
        question: "What is the time complexity of the 'Peek' operation in a stack?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "The 'Peek' operation retrieves the top element without removing it."
      },
      {
        question: "Which of the following is true about stacks?",
        options: ["They are dynamic in size", "They use contiguous memory", "They are slower than arrays for random access", "They cannot store elements of different types"],
        answer: "They are dynamic in size",
        explanation: "Stacks can grow or shrink dynamically depending on the implementation."
      },
      {
        question: "What is the space complexity of a stack?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Stacks require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is a disadvantage of stacks?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They require resizing",
        explanation: "Stacks may need to resize, which can be an expensive operation."
      },
      {
        question: "What is the time complexity of reversing a stack?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Reversing a stack requires popping and pushing all elements."
      },
      {
        question: "Which of the following is true about stack implementations?",
        options: ["They can be implemented using arrays", "They can be implemented using linked lists", "They can be implemented using hash tables", "All of the above"],
        answer: "All of the above",
        explanation: "Stacks can be implemented using various data structures."
      }
    ],
    queues: [
      {
        question: "What is the principle of queue data structure?",
        options: ["FIFO", "LIFO", "Random Access", "Priority Order"],
        answer: "FIFO",
        explanation: "Queues follow the First-In-First-Out (FIFO) principle."
      },
      {
        question: "Which operation is used to remove an element from the queue?",
        options: ["Push", "Pop", "Dequeue", "Peek"],
        answer: "Dequeue",
        explanation: "The 'Dequeue' operation removes an element from the front of the queue."
      },
      {
        question: "What is the time complexity of the 'Enqueue' operation in a queue?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "The 'Enqueue' operation adds an element to the end of the queue in constant time."
      },
      {
        question: "Which of the following is a use case for queues?",
        options: ["Implementing a stack", "Implementing a priority queue", "Storing a list of names", "All of the above"],
        answer: "Implementing a priority queue",
        explanation: "Queues are commonly used for priority-based scheduling."
      },
      {
        question: "What is the time complexity of the 'Dequeue' operation in a queue?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "The 'Dequeue' operation removes an element from the front of the queue in constant time."
      },
      {
        question: "Which of the following is true about queues?",
        options: ["They are dynamic in size", "They use contiguous memory", "They are slower than arrays for random access", "They cannot store elements of different types"],
        answer: "They are dynamic in size",
        explanation: "Queues can grow or shrink dynamically depending on the implementation."
      },
      {
        question: "What is the space complexity of a queue?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Queues require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is a disadvantage of queues?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They require resizing",
        explanation: "Queues may need to resize, which can be an expensive operation."
      },
      {
        question: "What is the time complexity of reversing a queue?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Reversing a queue requires dequeuing and enqueuing all elements."
      },
      {
        question: "Which of the following is true about queue implementations?",
        options: ["They can be implemented using arrays", "They can be implemented using linked lists", "They can be implemented using hash tables", "All of the above"],
        answer: "All of the above",
        explanation: "Queues can be implemented using various data structures."
      }
    ],
    trees: [
      {
        question: "What is the height of a binary tree with only one node?",
        options: ["0", "1", "2", "Undefined"],
        answer: "0",
        explanation: "The height of a tree with only one node is 0."
      },
      {
        question: "Which traversal visits the root node last?",
        options: ["Inorder", "Preorder", "Postorder", "Levelorder"],
        answer: "Postorder",
        explanation: "Postorder traversal visits the root node after visiting the left and right subtrees."
      },
      {
        question: "What is the time complexity of searching for an element in a binary search tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(log n)",
        explanation: "Binary search trees allow logarithmic-time search in the average case."
      },
      {
        question: "Which of the following is a disadvantage of binary trees?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They waste memory",
        explanation: "Binary trees may waste memory if they are unbalanced."
      },
      {
        question: "What is the time complexity of inserting an element into a binary search tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(log n)",
        explanation: "Binary search trees allow logarithmic-time insertion in the average case."
      },
      {
        question: "Which of the following is a use case for trees?",
        options: ["Implementing a stack", "Implementing a queue", "Implementing a hash table", "All of the above"],
        answer: "All of the above",
        explanation: "Trees are versatile and can be used for various purposes."
      },
      {
        question: "What is the space complexity of a binary tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Binary trees require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is true about binary search trees?",
        options: ["They are dynamic in size", "They use contiguous memory", "They are slower than arrays for random access", "They cannot store elements of different types"],
        answer: "They are dynamic in size",
        explanation: "Binary search trees can grow or shrink dynamically."
      },
      {
        question: "What is the time complexity of deleting an element from a binary search tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(log n)",
        explanation: "Binary search trees allow logarithmic-time deletion in the average case."
      },
      {
        question: "Which of the following is true about tree implementations?",
        options: ["They can be implemented using arrays", "They can be implemented using linked lists", "They can be implemented using hash tables", "All of the above"],
        answer: "All of the above",
        explanation: "Trees can be implemented using various data structures."
      }
    ],
    graphs: [
      {
        question: "Which algorithm is used to find the shortest path in an unweighted graph?",
        options: ["Dijkstra's", "BFS", "DFS", "Kruskal's"],
        answer: "BFS",
        explanation: "Breadth-First Search (BFS) is used to find the shortest path in an unweighted graph."
      },
      {
        question: "What is the time complexity of Dijkstra's algorithm with a binary heap?",
        options: ["O(V)", "O(V log V)", "O(V²)", "O(E log V)"],
        answer: "O(E log V)",
        explanation: "Dijkstra's algorithm with a binary heap has a time complexity of O(E log V)."
      },
      {
        question: "Which of the following is a disadvantage of graphs?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They waste memory",
        explanation: "Graphs may waste memory if they are sparse."
      },
      {
        question: "What is the time complexity of depth-first search (DFS) on a graph?",
        options: ["O(V)", "O(V log V)", "O(V²)", "O(V + E)"],
        answer: "O(V + E)",
        explanation: "DFS visits each vertex and edge once, resulting in O(V + E) time complexity."
      },
      {
        question: "Which of the following is a use case for graphs?",
        options: ["Implementing a stack", "Implementing a queue", "Implementing a hash table", "All of the above"],
        answer: "All of the above",
        explanation: "Graphs are versatile and can be used for various purposes."
      },
      {
        question: "What is the space complexity of a graph?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Graphs require space proportional to the number of elements they store."
      },
      {
        question: "Which of the following is true about graph implementations?",
        options: ["They can be implemented using arrays", "They can be implemented using linked lists", "They can be implemented using hash tables", "All of the above"],
        answer: "All of the above",
        explanation: "Graphs can be implemented using various data structures."
      },
      {
        question: "What is the time complexity of Kruskal's algorithm?",
        options: ["O(V)", "O(V log V)", "O(V²)", "O(E log V)"],
        answer: "O(E log V)",
        explanation: "Kruskal's algorithm has a time complexity of O(E log V)."
      },
      {
        question: "Which of the following is true about graph traversals?",
        options: ["BFS is faster than DFS", "DFS is faster than BFS", "BFS and DFS have the same time complexity", "BFS and DFS have different use cases"],
        answer: "BFS and DFS have different use cases",
        explanation: "BFS and DFS are used for different purposes, such as shortest path and cycle detection."
      },
      {
        question: "Which of the following is a disadvantage of adjacency matrix representation of graphs?",
        options: ["They waste memory", "They have slow access time", "They require resizing", "They cannot store elements of different types"],
        answer: "They waste memory",
        explanation: "Adjacency matrices may waste memory if the graph is sparse."
      }
    ]
  };