const LinkedList = require('./DSA-Linkedlist')

function main(arr) {
    const SLL = new LinkedList
    for (let i = 0; i < arr.length; i++) {
      SLL.insertLast(arr[i])
    };

    SLL.insertLast('Tauhida');
    SLL.remove('Husker');
    SLL.insertBefore('Athena', 'Boomer');
    SLL.insertAfter('Hotdog', 'Helo')
    SLL.insertAt('Kat', 3)

    console.log(SLL.find('Kat'))
    return SLL;
  }

 console.log(main(['Apollo', 'Boomer', 'Helo', 'Husker', 'Starbuck']))




 function WhatDoesThisProgramDo(lst) {
    let current = lst.head;
    while (current !== null) {
        let newNode = current;
        while (newNode.next !== null) {
            if (newNode.next.value === current.value) {
                newNode.next = newNode.next.next;
            }
            else {
                newNode = newNode.next;
            }
        }
        current = current.next;
    }
}