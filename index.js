console.log('hello world');

console.log(global.Num);
//undefined

global.Num = 13;

console.log(global.Num);

console.log(process.platform)
//darwin

console.log(process.env.USER);

//events 
//node is non-blocking
const {EventEmitter} = require('events');
const eventEmitter = new EventEmitter();
eventEmitter.on('lunch', ()=>{
    console.log('Yay :)')

})
eventEmitter.emit('lunch');
//1. sync = blocking will need to finish before anything else

// ways to read file
//const{readFile, readFileSync}= require('fs');

// const txt = readFileSync('./hello.txt', 'utf8');
// console.log(txt);

// console.log('after txt')

//2. can make nonblocking by 
// readFile('./hello.txt', 'utf8', (err, txt) => {
//    console.log(txt)
// });

//3. promises

const{readFile} = require('fs').promises;
async function hello(){
    const file = await readFile('./hello.txt', 'utf8');
}

console.log(hello)

console.log('after txt')
// will actually appear before with nonblocking version
//


