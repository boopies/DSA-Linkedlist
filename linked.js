// In the previous checkpoint, you learned that arrays store data in contiguous memory blocks. You also learned that the size of arrays could not easily be changed after they are allocated. This makes insertion and deletion from the beginning or middle of arrays inefficient. To prevent reallocation due to running out of space, or wasting space by allocating more than you need, you need to know the size of the data ahead of time, which often is not possible. Therefore more space than needed would typically be allocated. Even then, as the data grows, this "extra" space may be filled, and a larger space will need to be allocated and all existing data will have to be copied.

// Linked lists are data structures that overcome these problems by allocating blocks of memory on demand. These blocks of memory are connected by a mechanism called "linking." 

// Here is an implementation of a generic node class.

class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  
  // Notice that the node class is named with a _ (underscore). The underscore simply indicates that the node class is a private class that should not be accessible by anyone else other than the linked list class. Any time the linked list class wants to create a new node, it creates an instance of the node class. The node class's constructor accepts a variable value that holds the data. Each node also has a next variable that serves as a pointer to the next node.
  
  // Operations in a linked list
  // The primary operations in a linked list are insert, remove, and get (find).
  
  
  // Insertion
  // There can be 3 different implementations of the insert operation in a list. An item can be inserted
  
  // at the beginning of the list (insertFirst).
  // at the end of the list (insertLast).
  // anywhere in the list, between 2 nodes (insert, insertAt).
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertFirst(item) {
      this.head = new _Node(item, this.head);
    }
  
    insertBefore(newItem, nextItem) {
      let tempNode = this.head
      // what if you're on that value? Even though you have an insert in front of list, this must be considered because it might be positon specific. He doesn't care where it is, it just must be in front of that item
      while (tempNode.next !== null) {
        if (tempNode.next.value == nextItem) {
          // you're getting confused at all the points tempnode is being reassigned
          let n = new _Node(newItem) // the next node here is undefined
          n.next = tempNode.next // now the next is defined
          tempNode.next = n
          // for Athena to be before Boomer, the tempNode at this point is Apollo. n is created as value: Athena , next node[Boomer]
          // tempNode here, NOW, is Apollo, so it is assigning the next value, which needs a node, to teh created n node, which is the above stated one
          return;
        }
        tempNode = tempNode.next
      }
    };
  
    insertAfter(prevItem, newItem) {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        if (tempNode.value == prevItem) {
          let n = new _Node(newItem)
          n.next = tempNode.next
          tempNode.next = n
          return;
        }
        tempNode = tempNode.next;
      }
    };
  
    insertAt(newItem, position) {
      let tempNode = this.head
      let n = new _Node(newItem)
  
      if (tempNode == null && position !== 0) {
        return;
      } else if (tempNode == null && position == 0) {
        insertFirst(newItem);
      } else if (tempNode !== null && position == 0) {
        n.next = this.head;
        this.head = n
        return;
      }
  
      let current = this.head
      let previous = null;
      let i = 0;
      while (i < position) {
        previous = current
        current = current.next
        if (current == null) {
          break;
        }
        i++;
      }
      n.next = current;
      previous.next = n;
    };
  
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item);
      }
      else {
        let tempNode = this.head;
        // must go through the list of nodes to find last
        // while this.head.next !== null
        // the next is the POINTER. Pointer points to next node
        // head is the beginning of the list 
        // I suppose 
        while (tempNode.next !== null) {
          // last node must point to null
          tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    };
  
    find(item) {
      // Start at the head
      let currNode = this.head;
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // Check for the item 
      while (currNode.value !== item) {
        /* Return null if it's the end of the list 
           and the item is not on the list */
        if (currNode.next === null) {
          return null;
        }
        else {
          // Otherwise, keep looking 
          currNode = currNode.next;
        }
      }
      // Found it
      return currNode;
    };
  
    remove(item) {
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // If the node to be removed is head, make the next node head
      if (this.head.value === item) {
        this.head = this.head.next;
        return;
      }
      // Start at the head
      let currNode = this.head;
      // Keep track of previous
      let previousNode = this.head;
  
      while ((currNode !== null) && (currNode.value !== item)) {
        // Save the previous node 
        // so remember: previousNode equals the old value of currNode
        // and now the new value of currNode is currNode.next, which is not what previousNode is equal to because of where and when it was assigned
        previousNode = currNode;
        currNode = currNode.next;
      }
      if (currNode === null) {
        console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
    };
  
    // reverse() {
    //   var currentnode = this.head;
    //   var prevnode = null;
    //   var nextnode;
    //   while (currentnode !== null) {
    //     nextnode = currentnode.next;
    //     currentnode.next = prevnode;
    //     prevnode = currentnode;
    //     currentnode = nextnode;
    //   }
    //   this.head = prevnode;
    // }
  
    reverseRecur() {
      if (!this.head) {
        return;
      }
  
      function reverseRE(current) {
  
        if (!current.next) {
          return current;
        } // the last node will stop here and not proceed below. it will be the head
  
        /* 
         then the second to last node will be the first to proceed below
         the last node will point to the second to last
         the second to last node will point to null
         proceed with other nodes in the call stack until the original first node 
        */
        var head = reverseRE(current.next);
  
        var nextnode = current.next;
        nextnode.next = current;
        current.next = null;
        return head;
      }
      this.head = reverseRE(this.head);
    };
  
    logNthFromLast(head, n) {
      let main_ptr = head
      let ref_ptr = head
      let count = 0;
      if (head !== null) {
        while (count < n) {
          if (ref_ptr === null) {
            console.log('number is greater than items on list')
            return;
          }
          ref_ptr = ref_ptr.next;
          count += 1;
        }
      }
  
      while (ref_ptr !== null) {
        main_ptr = main_ptr.next
        ref_ptr = ref_ptr.next
      }
      return main_ptr
    }
  
    middleOfTheList(head) {
      let slow_ptr = head;
      let fast_ptr = head;
      if (head !== null) {
        while (fast_ptr !== null && fast_ptr.next != null) {
          fast_ptr = fast_ptr.next.next;
          slow_ptr = slow_ptr.next;
        }
        console.log('The middle pointer is: ', slow_ptr)
      }
    }
  
    hasCycle(head) {
      if (head === null) {
        return false;
      }
      // alwqays make null pointer checks, which could be null and then account for it in your conditions. The fast_ptr.next may or may not be necessary, but keep it in. 
      let slow_ptr = head;
      let fast_ptr = head.next; // twice as fast, will eventually meet like a race track
      while (fast_ptr !== null && fast_ptr.next !== null && slow_ptr !== null) {
        if (fast_ptr == slow_ptr) {
          return true;
        }
        fast_ptr = fast_ptr.next.next
        slow_ptr = slow_ptr.next
      }
      return false;
    }
  
  
  }
  
  // The linked list has a head to indicate the beginning of the list. The head always contains the 1st node. In this case, we start with an empty list, represented by null.
  
  // Inserting at the beginning of the list can be achieved by the following steps:
  
  // Create a new node item
  // Point the head to that new node
  
  // Inserting at the end of the list is a bit more complex and can be achieved by the following steps:
  
  // Create a new node item
  // Check to see if the list is empty, if it is, then insert the new item as the only item in the list
  // Start at the beginning of the list and move through the list until you reach the end of the list
  // Set the end node's next pointer to the new node
  // The new node's next pointer is null (indicating that the new node now is the last node on the list)
  
  //  Inserting at the beginning of the list is an O(1) operation since you are inserting at only 1 place, the 1st position, regardless of the length of the list. Inserting at the end of the list requires iterating over all of the nodes individually in sequence until you reach the end. This makes the performance of inserting at the end to be O(n).
  
  
  // Retrieval
  // Retrieving values from the linked list is straightforward. You can just traverse the list, comparing the value stored in each node with the value you are searching. When the item is found, return the node. The following code snippet shows the implementation of the retrieval (find) operation.
  
  
  // Removal
  // When deleting an item, there are 3 cases that you need to consider. You can
  
  // delete from the beginning of the list.
  // delete from the end of the list.
  // delete a node between 2 other nodes.
  
  // The 1st item in a list indicates the start of the list, which as you have learned is indicated by head. If you delete the 1st item in a list, you need to change the head to indicate the new 1st item on the list. Otherwise, you find the node before the node you are removing and update its next pointer to skip over the removed node. For example, let's say in the following list of fruit, you want to delete Dragon fruit. You have to start at the head of the list and find the node that contains "Dragon fruit".
  
  // After you find the node, take the previous node's next pointer (the node prior to Dragon fruit) and point it to the node that is after Dragon fruit.
  
  // Cache locality
  // As you have seen, there are small but significant differences in how linked lists and arrays perform. It seems like it should not make too much difference which you choose. So why do we tend to use arrays more often than linked lists? There is a final performance characteristic which hasn't been discussed yet: cache locality. To understand that, you need to understand a little bit about how your CPU works.
  
  // In our current model, when the CPU tries to access data it loads it directly from the RAM. Memory access is relatively slow. However, to speed things up, CPU manufacturers started introducing small memory caches into the processor itself. When the processor accesses data from memory, it also loads some of the data stored nearby into the caches. The theory is that if you have been accessing some data, then the likelihood is that you want to access the nearby data too. Because the CPU can access data from its caches more quickly than it can pull data from the RAM, this makes your code run faster.
  
  // Creating a singly linked list
  // Write a function main. Within the function, using the linked list class above, create a linked list with the name SLL and add the following items to your linked list: Apollo, Boomer, Helo, Husker, Starbuck.
  // Add Tauhida to the list.
  // Remove Husker from the list.
  // Implement a function called insertBefore() in the class that inserts a new node before a given node containing a key.
  // Implement a function called insertAfter() in the class that inserts a new node after a node containing the key.
  // Implement a function called insertAt() that inserts an item at a specific position in the linked list.
  // Add Athena before Boomer using your insertBefore() function.
  // Add Hotdog after Helo using the insertAfter() method.
  // Using the insertAt() method insert Kat in the 3rd position of the list.
  // Remove Tauhida from the list.
  
  function main(arr) {
    const SLL = new LinkedList
    for (let i = 0; i < arr.length; i++) {
      SLL.insertLast(arr[i])
    }
  
    // getSize(SLL)
    // isEmpty(SLL);
    // findPrevious('Starbuck', SLL);
    // findLast(SLL);
    // WhatDoesThisProgramDo(SLL)
  
    // SLL.reverseRecur()
    // SLL.logNthFromLast(SLL.head, 1)
    // display(SLL)
  
    SLL.middleOfTheList(SLL.head)
  
    // SLL.insertFirst('Tauhida');
    // SLL.remove('Husker')
    // SLL.remove('Tauhida')
    // SLL.insertBefore('Athena', 'Boomer');
    // SLL.insertAfter('Helo', 'Hotdog')
    // SLL.insertAt('Kat', '3')
  
    // console.log('Boomer: ', SLL.find('Boomer'))
    // console.log('Apollo: ', SLL.find("Apollo"))
    // console.log('Husker: ', SLL.find('Husker'))
    // console.log(SLL.find('Apollo'))
    // console.log('Athena:', SLL.find("Athena"))
    // console.log('Hotdog: ', SLL.find('Hotdog'))
    // console.log('Helo: ', SLL.find('Helo'))
    // console.log('Kat: ', SLL.find('Kat'))
    // console.log(SLL.find('Tauhida'))
  
    return SLL;
  }
  
  // main(['Apollo', 'Boomer', 'Helo', 'Husker', 'Starbuck']);
  
  // Supplemental functions for a linked list
  // Implement the following functions that operate on your linked list class. Note that these should be free functions instead of methods of the linked list class, so implement them outside the linked list class. Test each function using the list created in exercise 1.
  
  // display: displays the linked list
  // size: returns the size of the linked list
  // isEmpty: finds if the list is empty or not (without using the size() function)
  // findPrevious: finds the node before the item you are looking for
  // findLast: returns the last node in the linked list
  
  function display(linkedList) {
    let tempNode = linkedList.head
    // to prevent infinite loop for 
    while (tempNode !== null) {
      console.log(tempNode)
      tempNode = tempNode.next
    }
  }
  
  function getSize(linkedList) {
    let tempNode = linkedList.head
    let i = 0;
    while (tempNode !== null) {
      i += 1;
      tempNode = tempNode.next
    }
  
    console.log('The length of your linkedList is: ', i)
  }
  
  function isEmpty(linkedList) {
    if (linkedList.head === null) {
      console.log('Empty')
    } else {
      console.log('Not Empty');
    }
  }
  
  function findPrevious(item, linkedList) {
    let tempNode = linkedList.head;
    if (tempNode.value === item) {
      console.log('prevNode: Null')
    }
    while (tempNode.next !== null) {
      if (tempNode.next.value === item) {
        console.log('prevNode: ', tempNode)
      }
      tempNode = tempNode.next
    }
  }
  
  function findLast(linkedList) {
    let tempNode = linkedList.head;
    if (tempNode === null) {
      console.log('Unpopulated list')
      // this tempNode is above, so always first item
    }
    while (tempNode.next !== null) {
      tempNode = tempNode.next;
    }
    console.log('Last Item: ', tempNode.value)
  }
  
  // Mystery program
  // Analyze the following function (without running it in an IDE) to determine what problem it is trying to solve. What is the time complexity of this algorithm?
  
  function WhatDoesThisProgramDo(lst) {
    let current = lst.head;
    // console.log('current: ', current)
    while (current !== null) {
      let newNode = current;
      // console.log('newNode: ', newNode)
      while (newNode.next !== null) {
        // this eliminates 2 consecutive same
        if (newNode.next.value === current.value) {
          // skips over following repeated list item 
          newNode.next = newNode.next.next;
        }
        else {
          newNode = newNode.next;
        }
      }
      current = current.next; // this triggers outside whle loop to go again and compares. it's like 2 for-loops comparing i + j. but j keeps moving on till the end to find a duplicate that compares to i. If it doesnt, i gets moved to next "index" value and the i.next triggers the inner loop, as it does not === null 
    }
  }
  
  // answer: removes duplicates from unsorted list. Logarithmic time O(log(n))??? because if input increases in size, the time complexity increases at a slow rate. 
  
  // Reverse a list
  // Write an algorithm to reverse a linked list. The time complexity of your algorithm should be linear (O(n)). For this exercise, notice we are not asking you just to print the linked list in reverse or use another linked list to store the value in reverse order. Your program should reverse the direction of a given singly linked list. In other words, all pointers should point backward. BONUS: Solve this problem using both recursive and iterative algorithms.
  
  // see above in linkedList class for solutions
  
  
  // 3rd from the end
  // Write an algorithm to find the 3rd element from the end of a linked list. Note You may be tempted to add a length property to your linked list class. The length property is not a typical property of linked list, therefore don't make any modification to the linked list class that is provided to you.
  
  // See linkedlist class for solution 
  
  // Middle of a list
  // Write an algorithm to find the middle element of a linked list. Note You may be tempted to add a length property to your linked list class. The length property is not a typical property of linked list, therefore don't make any modification to the linked list class that is provided to you. Also, finding the size of the linked list using the size() function and dividing it by half will not find the correct middle of the linked list. So, don't use either of these approaches.
  
  // Cycle in a list
  // Write an algorithm to find whether a linked list has a cycle (i.e., whether a node in the list has its next value pointing to an earlier node in the list). For this exercise, create a linked list with the name CycleList. Be sure to insert nodes in the list so that it has a cycle. Then test your program with a cycleList function.
  
  // should make all the functions into methods belonging to linked list class 
  const CycleList = new LinkedList
  CycleList.insertLast('A')
  CycleList.insertLast('B')
  CycleList.insertLast('C')
  CycleList.insertLast('D')
  CycleList.insertLast('E')
  CycleList.insertLast('F')
  CycleList.insertLast('G')
  CycleList.find('E').next = CycleList.find('A')
  
  CycleList.hasCycle(CycleList.head);
  
  // Sorting a list
  // Write an algorithm that will sort a given linked list. For example given a list such as 3->2->5->7->1, your program will output the sorted version of this list which will be 1->2->3->5->7. You may not use another list or any other data structure such as an array to store the data. Also, you can only go through the list once, O(n) runtime.
  
  const sortList = new LinkedList()
  
  
  sortList.insertLast(3)
  sortList.insertLast(8)
  sortList.insertLast(10)
  sortList.insertLast(5)
  sortList.insertLast(15)
  sortList.insertLast(7)
  sortList.insertLast(1)
  
  
  
  
  // if unruly or reusable, create new function.  
  function sortLinkedList(linkedList) {
    let currentNode = linkedList.head
    let head = linkedList.head
    let storeNode;
    let shouldSort = true;
   
  
    // traverse nodes so long as there's a value next to current node
    // while list is still unsorted, keep going. 
    while (shouldSort) {
      // Reset shouldSort to false to continue inner looping
      shouldSort = false;
    
      while (currentNode.next !== null) {
        if (currentNode.value > currentNode.next.value) {
          // swap the values of the current and next node
          storeNode = currentNode.value
          currentNode.value = currentNode.next.value
          currentNode.next.value = storeNode
          shouldSort = true
        }
        currentNode = currentNode.next
      
      }
      if(!currentNode.next) {
        currentNode = linkedList.head
      }
    }
  }
  
  sortLinkedList(sortList)
  display(sortList)
  
  // recursive O(n) solution 
  
  // function swapNodes(head_ref, currX, currY, prevY) {
  //   // new head
  //   head_ref = currY;
  
  //   //adjust links
  //   prevY.next = currX;
  
  //   // swap next pointers
  //   let temp = currY.next;
  //   currY.next = currX.next
  //   currX.next = temp
  //   return head_ref;
  // }
  
  // // main function 
  // function sort(head_ref) {
  //   if(head_ref === null) {
  //     return null;
  //   }
  
  //   head_ref = sortLinkedList(head_ref);
  //   return head_ref
  // }
  
  // function sortLinkedList(head) {
  //   if(head === null) {
  //     return head; 
  //   }
  //    // 'min' - pointer to store the node having  
  //     // minimum data value  
  //   let min = head;
  //   let beforeMin = null;
  //   let ptr = head
  
  //   while(ptr.next !== null) {
  //     // if true, then update 'min' and 'beforeMin'  
  //     if(ptr.next.value < min.value) {
  //       min = ptr.next
  //       beforeMin = ptr
  //     }
  //   }
  //    // if 'min' and 'head' are not same,  
  //     // swap the head node with the 'min' node  
  //   if(min != head) {
  //     list.head = swapNodes(head, head, min, beforeMin)
  //   }
  //   // recursively sort the remaining list
  //   head.next = sortLinkedList(head.next)
  //   return head
  // }
  
  
  
  
  
  // void sort(node **start)
  // {
  //     if (((*start)->next == NULL) || (*start == NULL))
  //     {
  //         return;
  //     }
  //     node *min = findmin(*start);
  //     swap(*start, min, start);
  //     sort(&((*start)->next));
  // }
  
  // void swap(node *p1, node *p2, node **start)
  // {
  //     node *p1pre = NULL;
  //     node *p1curr = *start;
  //     while (p1curr!=p1)
  //     {
  //         p1pre = p1curr;
  //         p1curr = p1curr->next;
  //     }
  //     node *p2pre = NULL;
  //     node *p2curr = *start;
  //     while (p2curr != p2)
  //     {
  //         p2pre = p2curr;
  //         p2curr = p2curr->next;
  //     }
  //     if (p1pre != NULL)
  //     {
  //         p1pre->next = p2curr;
  //     }
  //     else
  //     {
  //         *start = p2curr;
  //     }
  //     if (p2pre != NULL)
  //     {
  //         p2pre->next = p1curr;
  //     }
  //     else
  //     {
  //         *start = p1curr;
  //     }
  //     node *temp = p2curr->next;
  //     p2curr->next = p1curr->next;
  //     p1curr->next = temp;
  // }
  
  // node* findmin(node *start)
  // {
  //     int flag = 0;
  //     if (start == NULL)
  //     {
  //         cout << "list is empty" << endl;
  //     }
  //     else
  //     {
  //         node *curr = start->next;
  //         node *min = start;
  //         while (curr->next != NULL)
  //         {
  //             if (min->value > curr->value)
  //             {
  //                 min = curr;
  //                 flag++;
  //             }
  //             curr = curr->next;
  //         }
  //         if ((curr->next == NULL) && (min->value > curr->value))
  //         {
  //             min = curr;
  //             flag++;
  //         }
  //         if (flag > 0)
  //         {
  //             return min;
  //         }
  //     }
  // }