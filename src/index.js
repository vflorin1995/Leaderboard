import './style.css';

const list = document.querySelector('.items');
const playerName = document.querySelector('.name');
const playerScore = document.querySelector('.score');
const submit = document.querySelector('.submit');
const refresh = document.querySelector('.refresh');

const apiKey = 'SVuoD7OpR0ZoVo2RZZhq';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`;

refresh.addEventListener('click', async () => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data = data.result;
      list.innerHTML = '';
      data.forEach((element) => {
        const listElement = document.createElement('ul');
        listElement.classList = 'flex';
        const name = document.createElement('li');
        name.innerText = `${element.user}:`;
        const score = document.createElement('li');
        score.innerText = element.score;
        listElement.append(name, score);
        list.append(listElement);
      });
    });
});

submit.addEventListener('click', async () => {
  const object = {
    user: playerName.value,
    score: playerScore.value,
  };
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
    .then((response) => response.json());
  playerName.value = '';
  playerScore.value = '';
});