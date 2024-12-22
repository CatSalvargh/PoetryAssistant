export class Queue {
    constructor() {
        this.items = {}
        //objects are not indexed, so we need to manually set the front and the end of the queue:
        this.rear = 0
        this.front = 0
    }

   //Operations
    // 1. Enqueue:
    enqueue(element) {
        this.items[this.rear] = element
        this.rear++
        // asign element to the front of the queue (position this.rear = 0 = {key 0: element})
        //increase the rear by 1 to keep track of index: 0, 1...
    }

    //2. Dequeue
    dequeue() {
        const item = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return item
        //delete item at the front position and increment front by 1 to keep track of the had of the queue
    }

    //3. isEmpty()
    isEmpty() {
        return this.rear - this.front === 0;
        // if the difference between rear and front is 0 the queue is empty
    }

    //4. peek()
    peek() {
        return this.items[this.front]
    }

    //5. Size
    size() {
        return this.rear - this.front
    }

    //6. print
    print() {
        console.log(this.items);
    }

}