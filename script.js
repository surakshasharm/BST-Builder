// Node class for BST
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// BST class with recursive methods
class BST {
  constructor() {
    this.root = null;
  }

  // Insert recursively
  insert(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(node.left, value);
    } else if (value > node.data) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  // Find minimum value node
  findMin(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  // Delete recursively
  delete(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.delete(node.left, value);
    } else if (value > node.data) {
      node.right = this.delete(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let temp = this.findMin(node.right);
      node.data = temp.data;
      node.right = this.delete(node.right, temp.data);
    }

    return node;
  }

  // Inorder traversal
  inorder(node, result = []) {
    if (node !== null) {
      this.inorder(node.left, result);
      result.push(node.data);
      this.inorder(node.right, result);
    }
    return result;
  }
}

// Create tree instance
const tree = new BST();

// Insert node from input
function insertNode() {
  const val = parseInt(document.getElementById("insertInput").value);
  if (!isNaN(val)) {
    tree.root = tree.insert(tree.root, val);
    showOutput();
    document.getElementById("insertInput").value = '';
  }
}

// Delete node from input
function deleteNode() {
  const val = parseInt(document.getElementById("deleteInput").value);
  if (!isNaN(val)) {
    tree.root = tree.delete(tree.root, val);
    showOutput();
    document.getElementById("deleteInput").value = '';
  }
}

// Display inorder traversal
function showOutput() {
  const result = tree.inorder(tree.root);
  document.getElementById("output").textContent = 
    result.length ? result.join(' → ') : 'Tree is empty.';
}

