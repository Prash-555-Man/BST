# Tree Visualizer with Theme Support

A web-based interactive tree visualization tool that supports Binary Search Trees (BST), Min Heaps, and Max Heaps with a beautiful dark/light theme interface.

## Features
- only for uiux

### Data Structure Support
- Binary Search Tree (BST)
- Min Heap
- Max Heap

### Tree Operations
- Insert nodes
- Delete nodes
- Search nodes
- Random tree generation
- Tree balancing
- Clear tree

### Tree Traversals
- Inorder
- Preorder
- Postorder
- Level Order

### User Interface
- Modern, clean design
- Responsive layout
- Dark/Light theme support with system preference detection
- Theme persistence across sessions
- Interactive visualization
- Zoom controls for tree view

## Project Structure

```
├── index.html          # Main HTML file with application structure
├── styles.css          # CSS styles with theme variables and components
├── theme.js           # Theme switching functionality
├── README.md          # Project documentation (you are here)
```

## Theme Implementation

The application implements a comprehensive theming system with:

- CSS Variables for consistent theming
- Automatic system theme detection
- Manual theme toggle via UI
- Theme persistence using localStorage
- Smooth transitions between themes

### Theme Variables

The application uses CSS variables for consistent theming across components:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #212529;
    /* ... and more variables */
}
```

## Usage

1. Open `index.html` in a modern web browser
2. Use the theme toggle button (☀️/🌙) in the header to switch between light and dark themes
3. Your theme preference will be automatically saved
4. Select your desired data structure (BST, Min Heap, or Max Heap)
5. Use the operation buttons to interact with the tree
6. View different traversals using the traversal buttons

## Browser Compatibility

The application is compatible with modern browsers that support:
- CSS Custom Properties (Variables)
- CSS Grid and Flexbox
- Local Storage API
- ES6+ JavaScript features

## Last Updated
2025-01-13
