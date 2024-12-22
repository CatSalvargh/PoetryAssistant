import { Queue } from "../data/queue.js"; 
import { kickOff } from "./fetchData.js";


window.start = function() {
        const rhymes = new Queue;
        document.getElementById('submit').addEventListener('click', kickOff(rhymes));
}














































//end of kick off

// import { Queue } from "../data/queue.js"; 

// const result = []

// function renderHTML() {
//         const rhymes = new Queue;
//         async function fetchData() {
//             const input = document.getElementById('userWord').value.toLowerCase();
//             const url1 = 'dictionary.json'
//             const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

//             try {
//                 const dictResponse = await fetch(url1)
//                 .then(res => {
//                     const dictionary = res.json();
//                     return dictionary
//                 });

//                 const dictionary = dictResponse;

//                 dictionary.forEach(word =>{            
//                     fetchDictionary(word.word)
//                 });

//                 const userResponse = await fetch(url2)
//                 .then(res => {
//                     const userdata = res.json();
//                     return userdata
//                 });

//                 const userData = userResponse;

//                 findRhymes(result, userData);
//                 let loop = rhymes.size();

//                 for (let i = 0; i < loop ; i++){
//                     document.querySelector('ul').insertAdjacentHTML("beforeend", `<li> ${rhymes.items[rhymes.front]} </li>`);
//                     rhymes.dequeue();
//                 }

//                 rhymes.print();
//                 console.log(rhymes.isEmpty());

//             } catch (error) {
//                 console.log('error caught!');
//                 console.log(error);
//             }
//         }

//         fetchData();

//         function findRhymes(arr, userArr) {
//             const userWordPh = userArr[0].phonetic.slice(-3, -1);

//             arr.forEach(wordArr => {
//                 const dataWordPh = wordArr[0].phonetic.slice(-3, -1);
//                 if (userWordPh == dataWordPh) {
//                     rhymes.enqueue(wordArr[0].word);
//                 }
//             });

//             rhymes.print();
//             return rhymes;
//         } 

//         async function fetchDictionary(word) {
            
//             try {
//                 fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
//                 .then(res => res.json()).then( data => {
//                     result.push(data)
//                 })
//             } catch (error) {
//                 console.log('aargh');
//             }

//             return result
//         }

// }


