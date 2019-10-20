'use strict';

const size = 5;
var queue = new Array(size);
var front = -1;
var rear = -1;

function enqueue(x){
    if(rear == size - 1){
        console.log("Overflow");
    }else if(front == -1 && rear == -1){
        front = rear = 0;
        queue[rear] = x;
    }else{
        rear++;
        queue[rear] = x;
    }
}

function dequeue(){
    if(front == -1 && rear == -1){
        console.log("Queue is empty");
    }else if(front == rear){
        delete queue[front];
        front = rear = -1;
    }else{
        delete queue[front];
        front++;
    }
}

function display(){
    if(front == -1 && rear == -1){
        console.log("Queue is empty");
    }else{
        for(let i = front; i < rear + 1; i++){
            console.log(queue[i]);
        }
    }
}

function peek(){
    if(front == -1 && rear == -1){
        console.log("Queue is empty");
    }else{
        console.log(queue[front]);
    }
}

enqueue(5);
enqueue(50);
enqueue(125);
enqueue(1);
enqueue(2);
enqueue(3);
display();