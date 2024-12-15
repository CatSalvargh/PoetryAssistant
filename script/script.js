let dictionary;
let result;
let userWord;
let rymhingWords;

function preload(){
	dictionary = loadTable('./data/Words_Phonetics.csv', 'csv', 'header');
    //Headers: word phonetic ph-end-3 ph-end-2
}

function setup() {
    createCanvas(600, 600);
}

//function called on submit click, to check for words and update the html on the result area
function renderHTML() {
    result = [];
    let updateHTML = '';
    findMatchingWords();

    document.getElementById('result').innerHTML = `Your word is: ${toTitleCase(userWord)} <br><br> Here are some words that rhyme with it: <br><br>`;

    result.forEach((word) => {
        updateHTML += `<li class="matching-word">${toTitleCase(word)}</li>`
    })

    document.querySelector('.final-list').innerHTML = updateHTML;
}


//find matching words and return them (no dupes) in an array
function findMatchingWords(){
    userWord = document.getElementById('userWord').value.toLowerCase();
    if (userWord == ''){
        alert('Please enter a word');
    } else{
        let userWordph = (dictionary.findRow(userWord, 'word')).getString('ph-end-2');  
        let rymhingWords = dictionary.findRows(userWordph, 'ph-end-2');
      
        rymhingWords.forEach(wordArr => {
            if (!result.includes(wordArr.arr[0])){
                if (userWord != wordArr.arr[0]){
                result.push((wordArr.arr[0]));
                }
            }
        });
    }
    return result;
}

//Helper function to show result as TitleCase
function toTitleCase(str){
    str = str.split('');
    let titleStr = [str[0].toUpperCase()];
    for (let i = 1; i < str.length; i++) {
        titleStr += str[i].toLowerCase();
    }
    return titleStr;
}
