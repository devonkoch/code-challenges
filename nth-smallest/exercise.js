'use strict';

function Node(value) {
  this.value = value || null;
  this.leftChild = null;
  this.rightChild = null;
}

function BinarySearchTree() {
  this.root = null;
  this.size = 0;
}

BinarySearchTree.prototype.insert = function(value) {
  var that = this;
  var newNode = new Node(value);

  if (this.root === null) {
    this.size += 1;
    return this.root = newNode;
  }

  function traverse(node) {
    if (value > node.value) {
      if (node.rightChild === null) {
        that.size += 1;
        return node.rightChild = newNode;
      }
      traverse(node.rightChild);
    }
    if (value < node.value) {
      if (node.leftChild === null) {
        that.size += 1;
        return node.leftChild = newNode;
      }
      traverse(node.leftChild);
    }
  }

  traverse(this.root);

};

BinarySearchTree.prototype.findTheNthSmallestNumber = function (nth) {
	var result = [];

	if (nth < 0 || nth > this.size) {
		return 'Exception';
	}

	function traverse(currentNode) {
		if (currentNode === null) { return; }
		traverse(currentNode.leftChild);
		result.push(currentNode.value);
		if(result.length === nth) { return; }
		traverse(currentNode.rightChild);
	}

	traverse(this.root);
	return result[nth - 1];
};



// code for capturing console.log output
var record = [];
(function () {
  var log = console.log;
  console.log = function () {
    record = record.concat(Array.prototype.slice.call(arguments));
    log.apply(this, Array.prototype.slice.call(arguments));
  };
}());



console.log('Node Class')
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var node = new Node();
  return typeof node === 'object';
});

assert(testCount, 'has value property', function(){
  var node = new Node();
  return node.hasOwnProperty('value');
});

assert(testCount, 'has leftChild property', function(){
  var node = new Node();
  return node.hasOwnProperty('leftChild');
});

assert(testCount, 'has rightChild property', function(){
  var node = new Node();
  return node.hasOwnProperty('rightChild');
});

assert(testCount, 'has default value set to null', function(){
  var node = new Node();
  return node.value === null;
});

assert(testCount, 'able to assign a value upon instantiation', function(){
  var node = new Node(5);
  return node.value === 5;
});

assert(testCount, 'able to reassign a value', function(){
  var node = new Node();
  node.value = 5
  return node.value === 5;
});

assert(testCount, 'able to point to left child node', function(){
  var node1 = new Node(5);
  var node2 = new Node(10);
  node1.leftChild = node2;
  return node1.leftChild.value === 10;
});

assert(testCount, 'able to point to right child node', function(){
  var node1 = new Node(5);
  var node2 = new Node(10);
  node1.rightChild = node2;
  return node1.rightChild.value === 10;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Binary Search Tree Class')
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var bst = new BinarySearchTree();
  return typeof bst === 'object';
});

assert(testCount, 'has root property', function(){
  var bst = new BinarySearchTree();
  return bst.hasOwnProperty('root');
});

assert(testCount, 'has size property', function(){
  var bst = new BinarySearchTree();
  return bst.hasOwnProperty('size');
});

assert(testCount, 'default root set to null', function(){
  var bst = new BinarySearchTree();
  return bst.root === null;
});

assert(testCount, 'default size set to zero', function(){
  var bst = new BinarySearchTree();
  return bst.size === 0;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('BinarySearchTree Insert Method')
var testCount = [0, 0];

assert(testCount, 'has insert method', function(){
  var bst = new BinarySearchTree();
  return Object.prototype.toString.apply(bst.insert) === '[object Function]';
});

assert(testCount, 'able to insert a node into empty binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  return bst.size === 1 && bst.root.value === 5;
});

assert(testCount, 'able to insert node to left of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  return bst.size === 2 && bst.root.value === 5 && bst.root.leftChild.value === 3;
});

assert(testCount, 'able to insert node to right of node left of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(4);
  return bst.size === 3 && bst.root.value === 5 && bst.root.leftChild.value === 3 &&
    bst.root.leftChild.rightChild.value === 4;
});

assert(testCount, 'able to insert node to right of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  return bst.size === 2 && bst.root.value === 5 && bst.root.rightChild.value === 8;
});

assert(testCount, 'able to insert node to left of node right of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  bst.insert(7);
  return bst.size === 3 && bst.root.value === 5 && bst.root.rightChild.value === 8 &&
    bst.root.rightChild.leftChild.value === 7;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');



console.log('BinarySearchTree findTheNthSmallestNumber Method')
var testCount = [0, 0];

assert(testCount, 'has findTheNthSmallestNumber method', function(){
  var bst = new BinarySearchTree();
  return Object.prototype.toString.apply(bst.findTheNthSmallestNumber) === '[object Function]';
});

assert(testCount, 'returns value when element exists in binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(16);
  bst.insert(5);
  bst.insert(22);
  bst.insert(2);
  bst.insert(8);
  bst.insert(23);
  return bst.findTheNthSmallestNumber(1) === 2 && bst.findTheNthSmallestNumber(3) === 8;
});

assert(testCount, 'throws exception when nth element does not exist in binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(8);
  bst.insert(4);
  bst.insert(7);
  return bst.findTheNthSmallestNumber(10) === 'Exception';
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');




// function for checking if arrays are equal
function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
    return false;
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

// function for checking if arrays contain same elements 
// (do not need to be in the same order)
function arraysMatching(arr1, arr2){
  if (arr1.length !== arr2.length){
    return false;
  } else {
    var lib = {};
    for (var i = 0; i < arr1.length; i++){
      lib[arr1[i]] = true;
    }
    for (var j = 0; j < arr2.length; j++){
      if (lib[arr2[j]] === undefined){
        return false;
      }
    }
    return true;
  }
}

// custom assert function to handle tests
// Array count : keeps track out how many tests pass and how many total
//   in the form of a two item array i.e., [0, 0]
// String name : describes the test
// Function test : performs a set of operations and returns a boolean
//   indicating if test passed 
function assert(count, name, test){
  if(!count || !Array.isArray(count) || count.length !== 2) { 
    count = [0, '*']; 
  } else {
    count[1]++;
  }
  
  var pass = 'false';
  var errMsg = null;
  try {
    if (test()) { 
      pass = ' true';
      count[0]++;
    } 
  } catch(e) {
    errMsg = e;
  } 
  console.log('  ' + (count[1] + ')   ').slice(0,5) + pass + ' : ' + name);
  if (errMsg !== null) {
    console.log('       ' + errMsg + '\n');
  }
}