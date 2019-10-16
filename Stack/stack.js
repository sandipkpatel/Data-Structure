'use strict';

const size = 5;
var stack = new Array(size);
var where = -1;

function push(val){
    if(where == size - 1){
        console.log("Stack is full");
    }else{
        where++;
        stack[where] = val; 
    }
    
}

function pop(){
    if(where == -1){
        console.log("Stack is empty");
    }else{
        let item = stack[where];
        delete stack[where];
        where--;
        console.log(`%c ${item} poped out`,'background:red;color:#fff');
    }
}

function peek(){
    if(where == -1){
        console.log("Stack is empty");
    }else{
        console.log(`${stack[where]}`);
    }
}

function display(){
    console.log(stack.join(" "));
}

push(1);
push(2);
push(3);
pop();
pop();
push(4);
push(5);
push(6);
push(7);
push(8);
push(9);
pop();
pop();
pop();
pop();
pop();
pop();
pop();
pop();
display();