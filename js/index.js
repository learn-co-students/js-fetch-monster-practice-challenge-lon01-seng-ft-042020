const mForm = document.querySelector('#create-monster')
const monstersDetails = document.querySelector('#monster-container')
const baseUrl = 'http://localhost:3000'
const monsterUrl = baseUrl + '/monsters?_limit=10&_page='

const nextButton = document.getElementById('forward')
nextButton.addEventListener('click', () => paginate('next'))

const backButton = document.getElementById('back')
backButton.addEventListener('click', () => paginate('back'))


document.getElementById('back')


function renderMonsters(page_num=1){
    monstersDetails.innerHTML = ""
    monstersDetails.dataset.currentPage = page_num
    return fetch(monsterUrl + `${page_num}`)
    .then(resp => resp.json())
    .then((monsters) => monsters.forEach((monster) => makeOneMonster(monster)));
}

function makeOneMonster(monster){
    const div = document.createElement('div')
    div.className = 'monster-info'

    const pName = document.createElement('p')
    pName.innerText = monster.name
    const pAge = document.createElement('p')
    pAge.innerText = monster.age
    const pDescription = document.createElement('p')
    pDescription.innerText = monster.description

    div.append(pName, pAge, pDescription)
    monstersDetails.append(div)
}

function monsterForm(monster) {
    const form = document.createElement('form')

    const inputName = document.createElement('input')
    inputName.setAttribute('type', 'text')
    inputName.setAttribute('name', 'monster name')
    
    const inputAge = document.createElement('input')
    inputAge.setAttribute('type', 'text')
    inputAge.setAttribute('age', 'monster age')
    
    const inputDescription = document.createElement('input')
    inputDescription.setAttribute('type', 'text')
    inputDescription.setAttribute('description', 'monster description')

    const submitbtn = document.createElement('input')
    submitbtn.setAttribute('type', 'submit')
    submitbtn.setAttribute('value', 'Create Monster Button')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        post(e, monster)
        form.reset()
    })

    form.append(inputName, inputAge, inputDescription, submitbtn)
    mForm.append(form)
}

function post(e, monster) {
let object = {
name: e.target[0].value,
age: e.target[1].value,
description: e.target[2].value
};

let configObject = {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
},
body: JSON.stringify(object)
};

fetch(monsterUrl, configObject)
.then(resp => resp.json())
.then(data => makeOneMonster(data))
.catch(error => console.log(error));
}

function paginate(direction) {
    let currentPage = monstersDetails.dataset.currentPage 
    if (direction === 'back') {
        currentPage--
    } else {
        currentPage++
    }
    currentPage = Math.min(Math.max(currentPage, 1), 100)
    renderMonsters(currentPage)
}

function callPaginateNext() {
    paginate('next')
}

monsterForm()
renderMonsters()