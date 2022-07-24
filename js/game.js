const $grid = document.querySelector('.grid')
const $player = document.querySelector('.player')
const $timer = document.querySelector('.timer')
const $modal = document.querySelector('.modal')
const $btnExit = document.getElementById('exit')
const $btnPlay = document.getElementById('play')

const images = [
  'Ahri',
  'Annie',
  'Graves',
  'Jinx',
  'Leblanc',
  'LeeSin',
  'Riven',
  'Sett',
  'Yasuo',
  'Lux'
]
let firstCard = ''
let secondCard = ''

const clearCards = () => { firstCard = ''; secondCard = '' }

const toggleModal = () => {
  document.getElementById('player').innerHTML = `Parabéns ${localStorage.getItem('player')}, você terminou o jogo em ${$timer.innerHTML} segundos.`
  if ($modal.style.display == 'block') {
    $modal.style.display = 'none'
    return
  }
  $modal.style.display = 'block'
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')
  if (disabledCards.length == 20) {
    toggleModal()
    disabledCards.forEach(i => i.classList.remove('disabled-card'))
    clearInterval(this.intervalId)
  }
}

const checkCards = () => {
  if (firstCard.dataset.champion == secondCard.dataset.champion) {
    firstCard.firstChild.classList.add('disabled-card')
    secondCard.firstChild.classList.add('disabled-card')
    clearCards()
    checkEndGame()
  }
  else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')
      clearCards()
    }, 500)
  }
}

const revealCard = ({ target }) => {
  const card = target.parentNode

  if (card.className.includes('reveal-card'))
    return

  if (firstCard == '') {
    card.classList.add('reveal-card')
    firstCard = card
    return
  } else if (secondCard == '') {
    card.classList.add('reveal-card')
    secondCard = card
  }
  checkCards()
}

const createCard = (imageName) => {
  const $card = document.createElement('div')
  const $front = document.createElement('div')
  const $back = document.createElement('div')

  $card.classList.add('card')
  $front.classList.add('face', 'front')
  $back.classList.add('face', 'back')

  $front.style.backgroundImage = `url(../images/${imageName}.jpg)`
  $card.dataset.champion = imageName

  $card.appendChild($front)
  $card.appendChild($back)

  $card.addEventListener('click', revealCard)
  return $card
}

const loadGame = () => {
  const suffleArray = [...images, ...images].sort(() => Math.random() - 0.5)
  suffleArray.forEach(image => $grid.appendChild(createCard(image)))
}

const startTimer = () => {
  if (this.intervalId != '') {
    clearInterval(this.intervalId)
    $timer.innerHTML = 00
  }
  this.intervalId = setInterval(() => {
    const currentTime = Number($timer.innerHTML)
    $timer.innerHTML = currentTime + 1
  }, 1000);
}

const setPlayerName = () => ($player.innerHTML = localStorage.getItem('player'))

const start = () => {
  loadGame()
  startTimer()
  setPlayerName()
}

const reset = () => {
  document.querySelectorAll('.card').forEach(ele => ele.remove())
  toggleModal()
  start()
}

$btnExit.onclick = () => window.location = '/pages/index.html'
$btnPlay.onclick = () => reset()
window.onload = () => start()

