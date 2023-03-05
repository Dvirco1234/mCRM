export const utilService = {
  delay,
  getRandomInt,
  makeId,
  loadFromStorage,
  saveToStorage,
  debounce
}

function delay(ms = 1500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return (val)? JSON.parse(val) : null
}

function saveToStorage(key, val) {
  localStorage[key] = JSON.stringify(val)
}

function debounce(func, wait = 500) {
  let timeout

  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}


