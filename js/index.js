let page = 20;
let finalPage;
const numOfResultsPerPage = 50;

// API
const BASE_URL = "http://localhost:3000";
const JUST_MONSTERS_URL = BASE_URL + "/monsters";
const MONSTERS_URL = BASE_URL + `/monsters/?_limit=${numOfResultsPerPage}&_page=`;

fetch(JUST_MONSTERS_URL)
  .then((r) => r.json())
  .then((allMonsters) => {
    const totalMonsters = allMonsters.length;
    const totalPages = totalMonsters / numOfResultsPerPage;
    finalPage = totalPages;
  });
// GLOBAL VARIABLES
const monCon = document.querySelector("#monster-container");
const monNew = document.querySelector("#create-monster");
const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");

// POST FETCH
const postData = (url, data) => {
  const configObject = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, configObject).then((res) => res.json());
};

// GET FETCH
const getData = (url) => {
  return fetch(url).then((response) => response.json());
};

// CODING BEGINS...
getData(MONSTERS_URL + page).then((monsters) => renderMonsters(monsters));

const renderMonsters = (monsters) => {
  monsters.forEach((monster) => renderMonster(monster));
};

const renderMonster = (monster) => {
  const div = document.createElement("div");

  const name = document.createElement("h2");
  name.innerText = monster.name;

  const age = document.createElement("h4");
  age.innerText = monster.age;

  const desc = document.createElement("p");
  desc.innerText = monster.description;

  monCon.append(div);
  div.append(name, age, desc);
};

const form = document.createElement("form");
form.setAttribute("id", "monster-form");

const nameInput = document.createElement("input");
nameInput.setAttribute("id", "name");
nameInput.placeholder = "name...";

const ageInput = document.createElement("input");
ageInput.setAttribute("id", "age");
ageInput.placeholder = "age...";

const descInput = document.createElement("input");
descInput.setAttribute("id", "description");
descInput.placeholder = "description...";

const createBtn = document.createElement("button");
createBtn.type = "submit";
createBtn.innerText = "Create";

monNew.append(form);
form.append(nameInput, ageInput, descInput, createBtn);

form.addEventListener("submit", (event) => handleSubmit(event));

const handleSubmit = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const age = event.target.age.value;
  const description = event.target.description.value;

  const formEntry = { name, age, description };
  //const { name, age, desc } = formEntry

  // console.log(formEntry)
  postData(JUST_MONSTERS_URL, formEntry).then((monster) =>
    renderMonster({ ...monster })
  );

  form.reset();
};

forwardBtn.addEventListener("click", (e) => {
  if (page < finalPage) {
    page++;
    monCon.innerText = "";
    getData(MONSTERS_URL + page).then((monsters) => renderMonsters(monsters));
  }
});

backBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
  }

  monCon.innerText = "";
  getData(MONSTERS_URL + page).then((monsters) => renderMonsters(monsters));
});
