let dictionary;
let result;
let userWord;
let rymhingWords;

function preload(){
	dictionary = loadTable('./data/Words_Phonetics.csv', 'csv', 'header');//Headers: word phonetic ph-end-3 ph-end-2
}

function setup() {
    createCanvas(600, 600);
    result = [];
    //normalize words to avoid case sensitivity errors
    userWord = 'flush'.toLowerCase();
    findMatchingWords();
 
    //Final Outout:
    document.querySelector('.result').innerHTML = `Your word is: ${toTitleCase(userWord)} <br><br> Here are some words that rhyme with it: <br><br> ${result}`;
}

function findMatchingWords(){
    //userW will be the input from user // dataW will be determined by matching the userW by itenerating through the words in the dictionary
    let userWordph = (dictionary.findRow(userWord, 'word')).getString('ph-end-2');  
    rymhingWords = dictionary.findRows(userWordph, 'ph-end-2');

    rymhingWords.forEach(word => {
        console.log(rymhingWords[0],  word.arr[0]);
        console.log(rymhingWords[0].arr[0],  word.arr[0]);
        if(rymhingWords[0].arr[0] !== word.arr[0]){
         result.push(toTitleCase(word.arr[0]));
        }
    });
    return result;
    //check for duplicates/amend if
}

//End result to TitleCase
function toTitleCase(str){
    str = str.split('');
    let titleStr = [str[0].toUpperCase()];
    for (let i = 1; i < str.length; i++) {
        titleStr += str[i]
    }
    return titleStr;
}

//validate form input
function validate() {
    let userWord = document.getElementById('userWord');

    if (userWord.value == ''){
        alert('Please enter a word');
    }

}

