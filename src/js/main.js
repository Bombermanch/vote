
//HTML элементы
const progressBarCats = document.querySelector(".progress__bar_cats");
const progressBarDogs = document.querySelector(".progress__bar_dogs");
const progressBarParrots = document.querySelector(".progress__bar_parrots");
const btn = document.querySelectorAll(".btn")
const catsCounter = document.querySelector(".progress__num_cats");
const dogsCounter = document.querySelector(".progress__num_dogs");
const parrotsCounter = document.querySelector(".progress__num_parrots");
const progress = document.querySelector(".progress");

// url для запросов
const url = new URL('https://sf-pyw.mosyag.in/sse/vote')
const stats = url + '/stats' // статистика
const voteCatsUrl = url + '/cats' // ссылка голосовать за котов
const voteDogsUrl = url + '/dogs' // ссылка голосовать за собак
const voteParrotsUrl = url + '/parrots' // ссылка голосовать за попугаев


// эвентсорс
const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})
const ES = new EventSource(stats, header)
ES.onerror = error => {
    ES.readyState ? progress.textContent = "Some error" : null;

}

ES.onmessage = message => {	
    let animals = JSON.parse(message.data);

    let catsSumVote = animals.cats,
        dogsSumVote = animals.dogs,
        parrotsSumVote = animals.parrots,
        sum = catsSumVote + dogsSumVote + parrotsSumVote;
    progressBarCats.style.width = `${(catsSumVote/sum)*100}%`;
    progressBarDogs.style.width = `${(dogsSumVote/sum)*100}%`;
    progressBarParrots.style.width = `${(parrotsSumVote/sum)*100}%`;
    catsCounter.innerText = `Кошки: ${animals.cats} (${(animals.cats/sum*100).toFixed(2)}%)`;
    dogsCounter.innerText = `Собаки: ${animals.dogs}  (${(animals.dogs/sum*100).toFixed(2)}%)`;
    parrotsCounter.innerText = `Попугаи: ${animals.parrots}  (${(animals.parrots/sum*100).toFixed(2)}%)` 
   
}

function vote(voteUrl) {
    fetch(voteUrl, {
        method: 'POST',
        body: "",        
        mode: "no-cors"
       
    }).then(alert("Ваш голос принят!"))
}

for (let i = 0; i < btn.length; i++){
    btn[i].addEventListener("click", function(){
        if (btn[i].classList.contains('btn_cats')){
            vote(voteCatsUrl)
           
        }
        else if (btn[i].classList.contains('btn_dogs')) {
            vote(voteDogsUrl)
        }
        else if (btn[i].classList.contains('btn_parrots')) {
            vote(voteParrotsUrl)
        }
    })
}













