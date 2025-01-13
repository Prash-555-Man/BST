// Binary Search Tree Node Class
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree Implementation
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.nodeRadius = 25;
        this.levelHeight = 60;
        this.animationSpeed = 500;
    }

    // Core BST Operations
    insert(value) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            this.visualize();
            this.logOperation(`Inserted ${value} as root`);
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    this.logOperation(`Inserted ${value} to the left of ${current.value}`);
                    break;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    this.logOperation(`Inserted ${value} to the right of ${current.value}`);
                    break;
                }
                current = current.right;
            } else {
                this.logOperation(`Value ${value} already exists in the tree`);
                return;
            }
        }
        this.visualize();
    }

    delete(value) {
        const removeNode = (node, value) => {
            if (!node) {
                return null;
            }

            if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                // Case 1: Leaf node
                if (!node.left && !node.right) {
                    this.logOperation(`Deleted leaf node ${value}`);
                    return null;
                }
                // Case 2: Node with one child
                if (!node.left) {
                    this.logOperation(`Deleted node ${value} and replaced with right child`);
                    return node.right;
                }
                if (!node.right) {
                    this.logOperation(`Deleted node ${value} and replaced with left child`);
                    return node.left;
                }
                // Case 3: Node with two children
                let minRight = node.right;
                while (minRight.left) {
                    minRight = minRight.left;
                }
                node.value = minRight.value;
                node.right = removeNode(node.right, minRight.value);
                this.logOperation(`Replaced ${value} with successor ${minRight.value}`);
                return node;
            }
        };

        this.root = removeNode(this.root, value);
        this.visualize();
    }

    search(value) {
        let current = this.root;
        let path = [];
        
        while (current) {
            path.push(current.value);
            if (value === current.value) {
                this.logOperation(`Found ${value}. Path: ${path.join(' -> ')}`);
                this.highlightPath(path);
                return true;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        this.logOperation(`Value ${value} not found. Searched path: ${path.join(' -> ')}`);
        return false;
    }

    // Tree Traversal Methods
    inorderTraversal() {
        const result = [];
        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                result.push(node.value);
                traverse(node.right);
            }
        };
        traverse(this.root);
        this.logOperation(`Inorder traversal: ${result.join(' -> ')}`);
        return result;
    }

    preorderTraversal() {
        const result = [];
        const traverse = (node) => {
            if (node) {
                result.push(node.value);
                traverse(node.left);
                traverse(node.right);
            }
        };
        traverse(this.root);
        this.logOperation(`Preorder traversal: ${result.join(' -> ')}`);
        return result;
    }

    postorderTraversal() {
        const result = [];
        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                result.push(node.value);
            }
        };
        traverse(this.root);
        this.logOperation(`Postorder traversal: ${result.join(' -> ')}`);
        return result;
    }

    // Visualization Methods
    visualize() {
        const canvas = document.getElementById('tree-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!this.root) return;

        // Calculate tree dimensions
        const treeHeight = this.getHeight(this.root);
        canvas.height = treeHeight * this.levelHeight + 50;
        canvas.width = Math.pow(2, treeHeight) * 50;

        // Draw tree
        this.drawNode(ctx, this.root, canvas.width / 2, 40, canvas.width / 4);
    }

    drawNode(ctx, node, x, y, offset) {
        if (!node) return;

        // Draw node circle
        ctx.beginPath();
        ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
        ctx.strokeStyle = '#2E7D32';
        ctx.stroke();

        // Draw node value
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px Arial';
        ctx.fillText(node.value, x, y);

        // Draw left child
        if (node.left) {
            ctx.beginPath();
            ctx.moveTo(x - this.nodeRadius, y + this.nodeRadius);
            ctx.lineTo(x - offset, y + this.levelHeight - this.nodeRadius);
            ctx.strokeStyle = '#666';
            ctx.stroke();
            this.drawNode(ctx, node.left, x - offset, y + this.levelHeight, offset / 2);
        }

        // Draw right child
        if (node.right) {
            ctx.beginPath();
            ctx.moveTo(x + this.nodeRadius, y + this.nodeRadius);
            ctx.lineTo(x + offset, y + this.levelHeight - this.nodeRadius);
            ctx.strokeStyle = '#666';
            ctx.stroke();
            this.drawNode(ctx, node.right, x + offset, y + this.levelHeight, offset / 2);
        }
    }

    highlightPath(path) {
        const canvas = document.getElementById('tree-canvas');
        const ctx = canvas.getContext('2d');
        
        // Redraw tree
        this.visualize();
        
        // Highlight path
        let current = this.root;
        let x = canvas.width / 2;
        let y = 40;
        let offset = canvas.width / 4;
        
        for (let i = 1; i < path.length; i++) {
            const nextValue = path[i];
            
            // Draw highlighted node
            ctx.beginPath();
            ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = '#FFC107';
            ctx.fill();
            ctx.strokeStyle = '#FFA000';
            ctx.stroke();
            
            // Draw node value
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '14px Arial';
            ctx.fillText(current.value, x, y);
            
            // Update position for next node
            if (nextValue < current.value) {
                x -= offset;
                current = current.left;
            } else {
                x += offset;
                current = current.right;
            }
            y += this.levelHeight;
            offset /= 2;
        }
        
        // Highlight final node
        ctx.beginPath();
        ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFC107';
        ctx.fill();
        ctx.strokeStyle = '#FFA000';
        ctx.stroke();
        
        ctx.fillStyle = '#000000';
        ctx.fillText(current.value, x, y);
    }

    getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    logOperation(message) {
        const log = document.getElementById('operation-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = message;
        log.insertBefore(entry, log.firstChild);
        
        // Limit log entries
        while (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }
}

// Initialize BST and attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    const bst = new BinarySearchTree();
    
    // Insert button handler
    document.getElementById('insert-btn').addEventListener('click', () => {
        const input = document.getElementById('node-value');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            bst.insert(value);
            input.value = '';
        } else {
            alert('Please enter a valid number');
        }
    });

    // Delete button handler
    document.getElementById('delete-btn').addEventListener('click', () => {
        const input = document.getElementById('node-value');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            bst.delete(value);
            input.value = '';
        } else {
            alert('Please enter a valid number');
        }
    });

    // Search button handler
    document.getElementById('search-btn').addEventListener('click', () => {
        const input = document.getElementById('node-value');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            bst.search(value);
            input.value = '';
        } else {
            alert('Please enter a valid number');
        }
    });

    // Traversal button handlers
    document.getElementById('inorder-btn').addEventListener('click', () => bst.inorderTraversal());
    document.getElementById('preorder-btn').addEventListener('click', () => bst.preorderTraversal());
    document.getElementById('postorder-btn').addEventListener('click', () => bst.postorderTraversal());

    // Handle window resize
    window.addEventListener('resize', () => bst.visualize());
});

// Canvas Drawing Utilities
class TreeVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodeRadius = 25;
        this.levelHeight = 80;
        this.tree = new BinarySearchTree();
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = 400;
        this.draw();
    }

    // Draw the entire tree
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.tree.root) {
            this.drawNode(this.tree.root, this.canvas.width / 2, 50, this.canvas.width / 4);
        }
    }

    // Draw a single node
    drawNode(node, x, y, offset) {
        // Draw node circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fill();
        this.ctx.strokeStyle = '#2E7D32';
        this.ctx.stroke();

        // Draw node value
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(node.value, x, y);

        // Draw children
        if (node.left) {
            this.ctx.beginPath();
            this.ctx.moveTo(x - this.nodeRadius * Math.cos(Math.PI/4), 
                           y + this.nodeRadius * Math.sin(Math.PI/4));
            this.ctx.lineTo(x - offset + this.nodeRadius * Math.cos(Math.PI/4),
                           y + this.levelHeight - this.nodeRadius * Math.sin(Math.PI/4));
            this.ctx.strokeStyle = '#2E7D32';
            this.ctx.stroke();
            this.drawNode(node.left, x - offset, y + this.levelHeight, offset / 2);
        }

        if (node.right) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + this.nodeRadius * Math.cos(Math.PI/4),
                           y + this.nodeRadius * Math.sin(Math.PI/4));
            this.ctx.lineTo(x + offset - this.nodeRadius * Math.cos(Math.PI/4),
                           y + this.levelHeight - this.nodeRadius * Math.sin(Math.PI/4));
            this.ctx.strokeStyle = '#2E7D32';
            this.ctx.stroke();
            this.drawNode(node.right, x + offset, y + this.levelHeight, offset / 2);
        }
    }
}

// Navigation Handling
document.addEventListener('DOMContentLoaded', () => {
    // Section Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.parentElement.classList.add('active');
            }
        });
        document.getElementById(sectionId).classList.add('active-section');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            sidebar.classList.contains('active').toString());
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.checked = isDark;
    }

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked);
    });

    // Initialize theme based on system preference
    setTheme(prefersDarkScheme.matches);

    // Code Editor Setup
    if (document.getElementById('code-editor')) {
        // Initialize Monaco Editor
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            const editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: `// Write your BST implementation here
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    // Add your methods here
}`,
                language: 'javascript',
                theme: document.body.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs',
                minimap: { enabled: false },
                automaticLayout: true
            });

            // Language selection handling
            const languageSelect = document.getElementById('language-select');
            languageSelect.addEventListener('change', () => {
                monaco.editor.setModelLanguage(editor.getModel(), languageSelect.value);
            });

            // Run code button handling
            const runButton = document.getElementById('run-code');
            const consoleOutput = document.getElementById('console-output');
            const clearConsole = document.getElementById('clear-console');

            runButton.addEventListener('click', () => {
                try {
                    const code = editor.getValue();
                    // Create a new Function to run the code in a sandbox
                    const runCode = new Function(code);
                    consoleOutput.innerHTML = 'Code executed successfully!';
                    runCode();
                } catch (error) {
                    consoleOutput.innerHTML = `Error: ${error.message}`;
                }
            });

            clearConsole.addEventListener('click', () => {
                consoleOutput.innerHTML = '';
            });

            // Update editor theme when app theme changes
            themeToggle.addEventListener('change', () => {
                editor.updateOptions({
                    theme: themeToggle.checked ? 'vs-dark' : 'vs'
                });
            });
        });
    }

    // Challenge card interactions
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        const startButton = card.querySelector('.btn');
        startButton.addEventListener('click', () => {
            const challenge = card.querySelector('h3').textContent;
            showSection('playground');
            // TODO: Load challenge specific code template
        });
    });

    // Interview question interactions
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach(item => {
        const viewSolutionBtn = item.querySelector('.btn.secondary');
        const practiceBtn = item.querySelector('.btn.primary');

        viewSolutionBtn.addEventListener('click', () => {
            // TODO: Show solution modal
            alert('Solution viewer coming soon!');
        });

        practiceBtn.addEventListener('click', () => {
            const question = item.querySelector('h4').textContent;
            showSection('playground');
            // TODO: Load question specific code template
        });
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Tree Visualizer
    const canvas = document.getElementById('tree-canvas');
    const visualizer = new TreeVisualizer(canvas);

    // Theme toggling
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.setAttribute('data-theme', 
            themeToggle.checked ? 'dark' : 'light');
    });

    // Button event listeners
    document.getElementById('insert-btn').addEventListener('click', () => {
        const input = document.getElementById('node-value');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            visualizer.tree.insert(value);
            visualizer.draw();
            input.value = '';
        }
    });

    document.getElementById('search-btn').addEventListener('click', () => {
        const input = document.getElementById('node-value');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            visualizer.tree.search(value);
            input.value = '';
        }
    });

    // Initialize with light theme
    document.body.setAttribute('data-theme', 'light');
});

// Theory content templates
const theoryContent = {
    'intro': {
        title: 'Introduction to BST',
        content: `
            <h2>Binary Search Tree (BST)</h2>
            <p>A Binary Search Tree is a node-based binary tree data structure which has the following properties:</p>
            <ul>
                <li>The left subtree of a node contains only nodes with keys lesser than the node's key.</li>
                <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
                <li>The left and right subtree each must also be a binary search tree.</li>
            </ul>
            <h3>Time Complexity</h3>
            <ul>
                <li>Search: O(h) where h is height of tree</li>
                <li>Insert: O(h)</li>
                <li>Delete: O(h)</li>
            </ul>
        `
    },
    'operations': {
        title: 'BST Operations',
        content: `
            <h2>Basic Operations</h2>
            <h3>Insertion</h3>
            <p>To insert a new node:</p>
            <ol>
                <li>Start at the root</li>
                <li>Compare the inserting value with root</li>
                <li>If less than root, go to left subtree</li>
                <li>If greater than root, go to right subtree</li>
                <li>Repeat until we find a leaf node</li>
                <li>Insert new node at leaf position</li>
            </ol>
            <h3>Deletion</h3>
            <p>Three cases to consider:</p>
            <ul>
                <li>Node to be deleted is leaf</li>
                <li>Node has one child</li>
                <li>Node has two children</li>
            </ul>
        `
    },
    'complexity': {
        title: 'Time Complexity',
        content: `
            <h2>BST Time Complexity</h2>
            <table>
                <tr>
                    <th>Operation</th>
                    <th>Average Case</th>
                    <th>Worst Case</th>
                </tr>
                <tr>
                    <td>Search</td>
                    <td>O(log n)</td>
                    <td>O(n)</td>
                </tr>
                <tr>
                    <td>Insert</td>
                    <td>O(log n)</td>
                    <td>O(n)</td>
                </tr>
                <tr>
                    <td>Delete</td>
                    <td>O(log n)</td>
                    <td>O(n)</td>
                </tr>
            </table>
            <p>Note: Worst case occurs when tree becomes a linear chain (skewed tree)</p>
        `
    },
    'advanced': {
        title: 'Advanced Concepts',
        content: `
            <h2>Advanced BST Concepts</h2>
            <h3>Self-balancing BSTs</h3>
            <ul>
                <li>AVL Trees</li>
                <li>Red-Black Trees</li>
                <li>Splay Trees</li>
            </ul>
            <h3>Applications</h3>
            <ul>
                <li>Implementation of database indices</li>
                <li>File systems</li>
                <li>Symbol tables in compilers</li>
            </ul>
        `
    }
};

// Challenge templates
const challengeTemplates = {
    'Height of BST': `
// Challenge: Calculate the height of a Binary Search Tree
// Return the height of the tree (number of edges in longest path from root to leaf)

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function getHeight(root) {
    // Your code here
    
}

// Test cases
const root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
root.left.left = new Node(3);
console.log(getHeight(root)); // Should print 2
`,
    'Balanced BST': `
// Challenge: Convert Sorted Array to Balanced BST
// Given a sorted array, create a balanced BST

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function sortedArrayToBST(nums) {
    // Your code here
    
}

// Test case
const arr = [1, 2, 3, 4, 5, 6, 7];
const root = sortedArrayToBST(arr);
`,
    'AVL Tree': `
// Challenge: Implement AVL Tree
// Implement an AVL tree with auto-balancing

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }
    
    // Implement these methods:
    // getHeight(node)
    // getBalance(node)
    // rightRotate(y)
    // leftRotate(x)
    // insert(value)
    
}
`
};

// Interview question templates
const interviewTemplates = {
    'Validate BST': `
// Question: Write a function to determine if a binary tree is a valid BST
// A valid BST is defined as follows:
// - The left subtree of a node contains only nodes with keys less than the node's key
// - The right subtree of a node contains only nodes with keys greater than the node's key
// - Both the left and right subtrees must also be binary search trees

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function isValidBST(root) {
    // Your code here
    
}
`,
    'Lowest Common Ancestor': `
// Question: Find the lowest common ancestor of two nodes in a BST
// Given a binary search tree (BST), find the lowest common ancestor (LCA) 
// of two given nodes in the BST

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function lowestCommonAncestor(root, p, q) {
    // Your code here
    
}
`,
    'Kth Smallest Element': `
// Question: Find the kth smallest element in a BST
// Given a binary search tree, write a function to find the kth smallest element in it

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function kthSmallest(root, k) {
    // Your code here
    
}
`
};

document.addEventListener('DOMContentLoaded', () => {
    // Store the original topic list HTML
    const topicListHTML = document.querySelector('.topic-list').outerHTML;

    // Theory Hub Route Handling
    const theoryLinks = document.querySelectorAll('.topic-card a');
    theoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = link.getAttribute('href').split('/')[1];
            const content = theoryContent[route];
            
            const theorySection = document.getElementById('theory');
            const contentDiv = theorySection.querySelector('.theory-content');
            
            // Create back button
            const backBtn = document.createElement('button');
            backBtn.className = 'btn secondary';
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Topics';
            
            // Create content wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.innerHTML = content.content;
            
            // Clear existing content and add new content
            contentDiv.innerHTML = '';
            contentDiv.appendChild(backBtn);
            contentDiv.appendChild(contentWrapper);
            
            // Back button handler
            backBtn.addEventListener('click', () => {
                contentDiv.innerHTML = topicListHTML;
                // Reattach event listeners to new topic cards
                const newTheoryLinks = contentDiv.querySelectorAll('.topic-card a');
                newTheoryLinks.forEach(newLink => {
                    newLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newRoute = newLink.getAttribute('href').split('/')[1];
                        const newContent = theoryContent[newRoute];
                        
                        // Clear and update content
                        contentDiv.innerHTML = '';
                        const newBackBtn = document.createElement('button');
                        newBackBtn.className = 'btn secondary';
                        newBackBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Topics';
                        
                        const newContentWrapper = document.createElement('div');
                        newContentWrapper.innerHTML = newContent.content;
                        
                        contentDiv.appendChild(newBackBtn);
                        contentDiv.appendChild(newContentWrapper);
                        
                        // Attach event listener to new back button
                        newBackBtn.addEventListener('click', () => {
                            contentDiv.innerHTML = topicListHTML;
                            // Recursively reattach event listeners
                            const reattachedLinks = contentDiv.querySelectorAll('.topic-card a');
                            reattachedLinks.forEach(reLink => {
                                reLink.addEventListener('click', arguments.callee);
                            });
                        });
                    });
                });
            });
        });
    });

    // ... (previous navigation and theme code remains the same)

    // Code Editor Functionality
    if (document.getElementById('code-editor')) {
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            let editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: '// Write your code here',
                language: 'javascript',
                theme: document.body.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs',
                minimap: { enabled: false },
                automaticLayout: true
            });

            // Language selection handling
            const languageSelect = document.getElementById('language-select');
            languageSelect.addEventListener('change', () => {
                monaco.editor.setModelLanguage(editor.getModel(), languageSelect.value);
            });

            // Run code button handling
            const runButton = document.getElementById('run-code');
            const consoleOutput = document.getElementById('console-output');
            const clearConsole = document.getElementById('clear-console');

            runButton.addEventListener('click', () => {
                const originalConsole = { log: console.log, error: console.error };
                let output = [];

                // Override console methods
                console.log = (...args) => {
                    output.push(args.map(arg => String(arg)).join(' '));
                };
                console.error = (...args) => {
                    output.push('Error: ' + args.map(arg => String(arg)).join(' '));
                };

                try {
                    const code = editor.getValue();
                    eval(code); // Using eval for demonstration. In production, use a safer method
                    consoleOutput.innerHTML = output.join('\n');
                } catch (error) {
                    consoleOutput.innerHTML = `Error: ${error.message}`;
                }

                // Restore console methods
                console.log = originalConsole.log;
                console.error = originalConsole.error;
            });

            clearConsole.addEventListener('click', () => {
                consoleOutput.innerHTML = '';
            });

            // Challenge card handling
            const challengeCards = document.querySelectorAll('.challenge-card');
            challengeCards.forEach(card => {
                const startButton = card.querySelector('.btn');
                startButton.addEventListener('click', () => {
                    const challenge = card.querySelector('h3').textContent;
                    showSection('playground');
                    editor.setValue(challengeTemplates[challenge] || '// Challenge template not found');
                });
            });

            // Interview question handling
            const questionItems = document.querySelectorAll('.question-item');
            questionItems.forEach(item => {
                const viewSolutionBtn = item.querySelector('.btn.secondary');
                const practiceBtn = item.querySelector('.btn.primary');
                const question = item.querySelector('h4').textContent;

                viewSolutionBtn.addEventListener('click', () => {
                    const modal = document.createElement('div');
                    modal.className = 'modal';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <h3>${question} - Solution</h3>
                            <pre><code>${getSolution(question)}</code></pre>
                            <button class="btn secondary">Close</button>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    
                    modal.querySelector('button').addEventListener('click', () => {
                        modal.remove();
                    });
                });

                practiceBtn.addEventListener('click', () => {
                    showSection('playground');
                    editor.setValue(interviewTemplates[question] || '// Question template not found');
                });
            });
        });
    }
});

// Helper function to get solutions (you can add actual solutions here)
function getSolution(question) {
    // Add your solution implementations here
    return `// Solution for ${question}\n// Coming soon...`;
}
