const fetchData = () =>{
    const promise = new Promise((resolve,reject) =>{
        setTimeout(()=>{
            resolve('done');
        },1500);
    
    });
    return promise;
}

setTimeout (() =>{
    console.log('time is done');
    fetchData().then(text =>{
        console.log(text);
        return fetchData(); //또 done 을 resolve함
    })
    .then(text2=>{
        console.log(text2);
    });
},1)//1. timeout

console.log('hello');
console.log('hi')








// const person  ={
//     name : "max",
//     age : 29,
//     greet : function(){
//         console.log("normal function="+ this.name);
//         // const arr = ()=>{
//         //     console.log("arr function ="+this.name)
//         // }
//         // arr();
//     }
// }
// const printName = (person) =>{
//     console.log(person.name);
// }

// const printName = ({name}) =>{
//     console.log(name);
// }
// printName(person);

// const {name,age} = person;
// console.log(name , age)

// // person.greet();
// const copiedPerson = {...person}
// console.log(copiedPerson)
//  const hobbies = ['sports','cooking'];

//  const [hobby1,hobby2] = hobbies ; 
//  console.log(hobby1,hobby2);


 // //const copied = hobbies.slice();
// const copied = [...hobbies]; //엘리멘트들 다 가져와 새배열 만듬

// console.log(copied);

// rest operator

// const toArray = (a1,a2,a3) =>{
//     return [a1,a2,a3];
// }
// console.log(toArray(1,2,3)); //만약 4를 더 넣고싶으면?


// const toArray = (...args) =>{
//     return args;
// }
// console.log(toArray(1,2,3,7,4,2)); //만약 4를 더 넣고싶으면?
