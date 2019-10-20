// const infix = "A-B+(M^N)*(O+P)-Q/R^S*T+Z";
const infix = "a+b*c-d/e^f";
// const replaceNum = {'A':1,'B':2,'M':3,'N':4,'O':5,'P':6,'Q':7,'R':8,'S':9,'T':10,'Z':11};
const replaceNum = {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6};

const infixLength = infix.length-1;
const operators = ['+','-','*','/','^'];
const parentheses = ['(',')','[',']','{','}'];
const openBr = ['(','{','['];
const closeBr = [')','}',']'];
const precedence = [
    {"at":10,operator:"("},
    {"at":10,operator:")"},
    {"at":10,operator:"{"},
    {"at":10,operator:"}"},
    {"at":10,operator:"["},
    {"at":10,operator:"]"},
    {"at":9,operator:"^"},
    {"at":8,operator:"*"},
    {"at":8,operator:"/"},
    {"at":7,operator:"+"},
    {"at":7,operator:"-"}
];

var stack = [];
var postfix = [];

for(let i=0; i<infix.length; i++){
    let incoming = infix[i];
    let stackTop = stack[stack.length-1];

    if(isOperator(incoming)){
        if(isStackEmpty(stack) || isStackTopIsParentheses(stackTop)){
            stack.push(incoming);
            continue;
        }
        let precedenceOfIncoming = precedence.find(x => x.operator == incoming).at;
        checkRules(stack,precedenceOfIncoming,incoming);
        
    }else if(isParentheses(incoming)){
        calParentheses(incoming);
    }else{
        postfix.push(incoming);
    }
}

function checkRules(stack,precedenceOfIncoming,incoming){
    let stackTop = stack[stack.length-1];
    if(stackTop){
        let precedenceOfStack = precedence.find(x => x.operator == stackTop).at;
        if(precedenceOfIncoming < precedenceOfStack){
            postfix.push(stackTop);
            stack.pop();
            checkRules(stack,precedenceOfIncoming,incoming);
        }else if(precedenceOfIncoming > precedenceOfStack){
            stack.push(incoming);
        }else{
            if(!isPower(incoming)){
                postfix.push(stackTop);
                stack.pop();
                stack.push(incoming);
            }else{
                stack.push(incoming);
            }
        }
    }else{
        stack.push(incoming);
    }
}

function calParentheses(incoming){
    if(incoming == "(" || incoming == "[" || incoming == "{"){
        stack.push(incoming);
    }else{
        let openBracket = getOpenBracket(incoming);
        let indexOfOpenBracket = stack.indexOf(openBracket);
        for(let i = indexOfOpenBracket + 1; i <= stack.length - 1; i++){
            postfix.push(stack[i]);
            stack.pop();
        }
        stack.pop();
    }
}

function isOperator(arg){
    return operators.includes(arg);    
}

function isParentheses(arg){
    return parentheses.includes(arg);
}

function isStackhaveParentheses(){
    return parentheses.filter(element => stack.includes(element)).length;
}

function isStackTopIsParentheses(stackTop){
    return openBr.includes(stackTop);
}

function isPower(incoming){
    return incoming == '^';
}

function getOpenBracket(incoming){
    if(incoming == ")"){
        return "(";
    }
    if(incoming == "}"){
        return "{";
    }
    if(incoming == "]"){
        return "[";
    }
}

function isStackEmpty(stack){
    return stack.length > 0 ? false : true;
}

/*generate output*/
// console.log(stack); 
stack.reverse().forEach(function(val){
    postfix.push(val);
});
var postfix = postfix.join("");
/*end*/


String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

var postFixStack = [];
for(let i = 0; i < postfix.length; i++){
    let incoming = postfix[i];
    if(isOperator(incoming)){
        let oparand1 = postFixStack[postFixStack.length-2];
        let oparand2 = postFixStack[postFixStack.length-1];
        let opration =   '(' + oparand1 + incoming + oparand2 + ')';
        postFixStack.pop();
        postFixStack.pop();
        postFixStack.push(opration);
    }else{
        postFixStack.push(incoming);
    }
}

var postFixwithNum = postfix.allReplace(replaceNum);
var finalInfix = postFixStack.pop();
var finalInfixWithNum = finalInfix.allReplace(replaceNum);

console.log('Infix: '+infix);
console.log(infix.allReplace(replaceNum));

console.log('Postfix: '+postfix);
console.log('Postfix with num: '+postFixwithNum);
console.log('Convert Postfix to infix: '+finalInfix);
console.log(finalInfixWithNum);




