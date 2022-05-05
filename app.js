const $btn = document.querySelector('.btn-group');
const $playerone = document.querySelector('.one-player-score');
const $playertwo = document.querySelector('.two-player-score');
const $scoreOption = document.querySelector('.score-option');
let goalScore = 1;
let gameover = false;
let winner = ''

class scoreList {
  static instance;
  constructor() {
    if (scoreList.instance) {
      return scoreList.instance;
    }
    this.el = document.querySelector('.score-list')
    scoreList.instance = this;
  }
  hide() {
    this.el.classList.toggle('hide')
  }
};

class player { // 플레이어 생성
  constructor(scoreboard) {
    this.scoreboard = scoreboard
    this.score = parseInt(scoreboard.innerText);
  }

  add() {
    this.score += 1
    this.scoreboard.innerText = this.score
    return this
  }

  reset() {
    this.score = 0
    this.scoreboard.innerText = this.score
    gameover = false
    winner.scoreboard.classList.remove('win')
    return this
  }
};

const $scoreList = new scoreList();
const playerone = new player($playerone);
const playertwo = new player($playertwo);
const matchClass = (e, cl) => {
  return e.target.classList.contains(cl)
};


$btn.addEventListener('click', (e) => {
  if (!gameover) { // 게임오버 전
    if (e.target.nodeName === 'BUTTON') {
      matchClass(e, 'primary') && playerone.add();
      matchClass(e, 'secondary') && playertwo.add();
      matchClass(e, 'tertiary') && playerone.reset();
      matchClass(e, 'tertiary') && playertwo.reset();
    }
    if (goalScore == playerone.score || goalScore == playertwo.score) {
      gameover = true

      winner = (goalScore == playerone.score) ? playerone : playertwo //우승자 판별
      winner.scoreboard.classList.add('win')
      
    }
  } else { //게임오버 후
    if (e.target.nodeName === 'BUTTON') {      
      matchClass(e, 'tertiary') && playerone.reset();
      matchClass(e, 'tertiary') && playertwo.reset();       
    }
  }
});

$scoreOption.addEventListener('click', () => {
  $scoreList.hide();
});

$scoreList.el.addEventListener('click', (e) => {
  goalScore = parseInt(e.target.innerText);
  $scoreList.hide();
  $scoreOption.innerText = goalScore;
});




