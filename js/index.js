document.addEventListener('DOMContentLoaded', () => {

getAllMonsters();
createMonsterForm();
})

const buttonForward = document.getElementById('forward');
const buttonBack = document.getElementById('back');
const monstersURL = `http://localhost:3000/monsters/`
const container = document.getElementById('monster-container');
let page =1

function createMonsterDiv(monster) {
    const div = document.createElement('div');
    div.id = monster.id;
    div.innerHTML = `<h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}.</p>`;
    return div
}

function renderMonster(monster) {
    const div = createMonsterDiv(monster);
    container.append(div);
}

function renderAllMonsters(monstersArray) {
    monstersArray.forEach(monster => renderMonster(monster));
}

function getAllMonsters() {
    container.innerHTML = "";
    fetch(`${monstersURL}?_limit=10&_page=${page}`)
    .then(resp => resp.json())
    .then(data => renderAllMonsters(data))
    .catch(error => console.log(error))
}


const divForm = document.getElementById('create-monster');


function createMonsterForm() {
    const form = document.createElement('form');
    form.id = "monster-form";
    form.innerHTML = `<input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">`
    const button = document.createElement('button');
    button.innerText = "Create";
    form.append(button);
    form.addEventListener('submit', e => createNewMonster(e))

    divForm.append(form)
}

function createNewMonster(e) {
    e.preventDefault();
    // console.log(e)
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
    
    fetch(monstersURL, configObject)
    .then(resp => resp.json())
    .then(newMonster => {
        const container = document.getElementById('monster-container');
        const div = createMonsterDiv(newMonster);
        const child = document.getElementById('1');
        container.insertBefore(div, child);
    })
    .catch(error => console.log(error));
}

buttonForward.addEventListener('click', e => movePageForward(e))
buttonBack.addEventListener('click', e => movePageBack(e))

function movePageForward(e) {
    // e.preventDefault();
    page +=1;
    getAllMonsters();
}

function movePageBack(e) {
    // e.preventDefault();
    page -=1;
    getAllMonsters();
}


