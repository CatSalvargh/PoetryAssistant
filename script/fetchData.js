const result = []

export function kickOff(queue, synonymQueue, whattoDo) {    
    fetchData(queue, synonymQueue, whattoDo)
}

export async function fetchData(queue, synonymQueue, whattoDo) {
let input = document.getElementById('userWord').value.toLowerCase();
const url1 = 'dictionary.json'
const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

try {
    const dictionary = await fetch(url1)
    .then(res => {
        const dictionary = res.json();
        return dictionary
    });

    dictionary.forEach(word =>{            
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.word}`)
        .then(res => res.json()).then( data => {
            result.push(data)
        })
    });

    const userData = await fetch(url2)
    .then(res => {
        const userdata = res.json();
        return userdata
    });

    if (whattoDo == 'rhymes'){
        findRhymes(result, userData, queue);
        updateHTML(queue, whattoDo);
    } else if(whattoDo == 'synonyms'){
        findSynonyms(userData, synonymQueue);
        updateHTML(synonymQueue, whattoDo);
    }

} catch (error) {
    console.log('error caught!');
    console.log(error);
}
}

export function findRhymes(arr, userArr, queue) {
    const userWordPh = userArr[0].phonetic.slice(-3, -1);

    arr.forEach(wordArr => {
        const dataWordPh = wordArr[0].phonetic.slice(-3, -1);
        if (userWordPh == dataWordPh && userArr[0].word!= wordArr[0].word) {
            queue.enqueue(wordArr[0].word);
        } 
    });
    return queue;
} 

function updateHTML(queue, whattoDo){
    let loop = queue.size();
    for (let i = 0; i < loop ; i++){
        document.getElementById('result').innerHTML = `Here are some ${whattoDo}`
        document.querySelector('ul').insertAdjacentHTML("beforeend", `<li> ${queue.items[queue.front]} </li>`);
        queue.dequeue();
    }
    console.log(queue.isEmpty());
}

export function findSynonyms(wordObj, queue) {

    wordObj[0].meanings[0].synonyms.forEach((e)=> {
        queue.enqueue(e)
    });

    if (queue.isEmpty()) {
        queue.enqueue(`I couldn't find a synonym for that word, here is a link to definition:  ${(wordObj[0].sourceUrls[0])}`);
    }

    return queue;
}