console.log("Code in this file",process.argv);
const arr=process.argv[2];
// const arr=[5,6,10,40,3];
console.log(arr,typeof arr);

//1st method
// let max=arr[0];

// arr.forEach((num)=>
// {
//     if(max<num)  {
//         max=num;  }
// })
// console.log("Max number is: ",max);

// 2nd method in one line

console.log(Math.max(...arr));