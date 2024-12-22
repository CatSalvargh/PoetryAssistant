const result = []

export function kickOff(queue) {    
    fetchData(queue)
}

export async function fetchData(queue) {
let input = document.getElementById('userWord').value.toLowerCase();
const url1 = 'dictionary.json'
const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

try {
    const dictResponse = await fetch(url1)
    .then(res => {
        const dictionary = res.json();
        return dictionary
    });

    const dictionary = dictResponse;

    dictionary.forEach(word =>{            
        fetchDictionary(word.word)
    });

    const userResponse = await fetch(url2)
    .then(res => {
        const userdata = res.json();
        return userdata
    });

    const userData = userResponse;

    findRhymes(result, userData, queue);
    
    console.log(queue.isEmpty());
    queue.print();
    updateHTML(queue);

} catch (error) {
    console.log('error caught!');
    console.log(error);
}
}

export async function fetchDictionary(word) {
            
    try {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json()).then( data => {
            result.push(data)
        })
    } catch (error) {
        console.log('aargh');
    }

    return result
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

function updateHTML(queue){
    let loop = queue.size();
    for (let i = 0; i < loop ; i++){
        document.querySelector('ul').insertAdjacentHTML("beforeend", `<li> ${queue.items[queue.front]} </li>`);
        queue.dequeue();
    }
    queue.print();
    console.log(queue.isEmpty());
}