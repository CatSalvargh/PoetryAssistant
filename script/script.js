var dictionary;
let normalizedUser;
let normalizedData;

function preload(){
	dictionary = loadTable('./data/Words_Phonetics.csv', 'csv', 'header');
    //Headers: word	phonetic	ph-end-3	ph-end-2
}

function setup() {
createCanvas(600, 600);

//normalize words to avoid case sensitivity errors
normalizedUser = 'See'.toLowerCase();
normalizedData = 'Tree'.toLowerCase();

// toTitleCase('test');
document.querySelector('.result').innerHTML = `Your word is <br> ${toTitleCase(normalizedUser)} <br><br> Here is a word that rhymes with it: <br> ${toTitleCase(findMatchingWords(normalizedUser, normalizedData))}`;

}

function findMatchingWords(userW, dataW){
//userW will be the input from user // dataW will be determined by matching the userW by itenerating through the words in the dictionary
const userWord = dictionary.findRow(userW, 'word');
const dataWord = dictionary.findRow(dataW, 'word');

console.log(userWord.getString('ph-end-3') == dataWord.getString('ph-end-3'));

return dataWord.getString('word');

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