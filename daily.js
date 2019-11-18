const axios = require('axios')

const name = 'name.surname'
const passwd = '<haslo>'
const url = '<ulrWithoutLastSlash>'
const channel = '#<channelName>'
//jak true to wyśle, jak false to tylko wypisze
const send = false

const first = [
  'Dopracowanie',
  'Usprawnienie',
  'Ulepszenie',
  'Updatowanie',
  'Doskonalenie',
  'Porządkowanie',
  'Unowocześnienie',
  'Dokańczanie',
  'Sprawdzanie',
  'Poprawki',
  'Optymalizacja',
]
const second = ['starych', 'nowych', 'istotnych', 'ważnych', 'najnowszych', 'decydujących', 'kluczowych']
const third = [
  'fragmentów kodu',
  'modułów',
  'plików',
  'migracji',
  'testów e2e',
  'testów jednostkowych',
  'branchy',
  'endpointów',
  'commitów',
  'merge requestów',
]

async function login() {
  let res = await axios.post(url + '/api/v1/login', { user: name, password: passwd })

  const userId = res.data.data.userId
  const authToken = res.data.data.authToken
  return { userId, authToken }
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomDaily() {
  return `${random(first)} ${random(second)} ${random(third)}`
}

async function sendDaily(auth) {
  const msg = `Co zrobiłem/robię:
    - ${randomDaily()}
    Co będę robił:
    - ${randomDaily()}
    Blokery/problemy/wątpliwości:
    - brak`
  console.log(msg)
  if (send) {
    let res = await axios.post(
      url + '/api/v1/chat.postMessage',
      { channel, msg: msg },
      {
        headers: {
          'X-Auth-Token': auth.authToken,
          'X-User-Id': auth.userId,
        },
      },
    )
  }
}
async function main() {
  const auth = send ? await login() : {}
  sendDaily(auth)
}

main()
