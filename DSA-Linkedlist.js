class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    };
}

module.exports = class LinkedList {
    constructor() {
        this.head = null;
    };

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
    // Start at the Head. insert an item if list is null.   
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    };

    insertBefore(newItem, nextItem) {
        let tempNode = this.head
        while (tempNode.next !== null) {
            if (tempNode.next.value == nextItem) {
                let n = new _Node(newItem)
                n.next = tempNode.next
                tempNode.next = n
                return;
            }
            tempNode = tempNode.next
        }
    };

    insertAfter(newItem, prevItem) {
        // Start at the head
        let tempNode = this.head
        while (tempNode.next !== null) {
            if (tempNode.value == prevItem) {
                let newNode = new _Node(newItem)
                let nextNode = tempNode.next

                newNode.next = nextNode
                tempNode.next = newNode
                return;
            }
            tempNode = tempNode.next
        }
    };

    insertAt(newItem, position) {
        let tempNode = this.head
        let newNode = new _Node(newItem)
    
        if (tempNode == null && position !== 0) {
            return;
        } else if (tempNode == null && position == 0) {
            insertFirst(newItem);
        } else if (tempNode !== null && position == 0) {
            newNode.next = this.head;
            this.head = newNode;
          return;
        }

        let current = this.head;
        let previous = null;
        let i = 0;
        while (i < position) {
          previous = current;
          current = current.next;
          if (current == null) {
            break;
          }
          i++;
        }
        newNode.next = current;
        previous.next = newNode;
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
  
  /*removes duplicates from unsorted list. Logarithmic time O(log(n))??? 
  because if input increases in size, the time complexity increases at a slow rate. 

  
  