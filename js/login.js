const $input = document.querySelector('.login-input')
const $button = document.querySelector('.login-button')
const $form = document.querySelector('.login-form')

const validateInput = ({ target }) => {
  const { value } = target
  value.length >= 3
    ? $button.removeAttribute('disabled')
    : $button.setAttribute('disabled', true)
}

const handleSubmit = (event) => {
  event.preventDefault()
  const player = $input.value

  localStorage.setItem('player', player)
  window.location = '/pages/game.html'
}

$input.addEventListener('input', validateInput)
$form.addEventListener('submit', handleSubmit)