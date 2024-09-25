const searchInput = document.getElementById("search-input");
const btn = document.getElementById("search-button");
const disName = document.getElementById("pokemon-name");
const disId = document.getElementById("pokemon-id");
const disWeight = document.getElementById("weight");
const disHeight = document.getElementById("height");
const disTypes = document.getElementById("types");
const disHp = document.getElementById("hp");
const disAttack = document.getElementById("attack");
const disDefense = document.getElementById("defense");
const spAtk = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const img = document.createElement("img");    
    img.id = "sprite";
    document.getElementById("pokemon-img-container").appendChild(img);


const fetchData = () => {
    const inputVal = searchInput.value.toLowerCase();
    
    if (!inputVal) {
        alert("Please input name or ID");
        return;
    }
    
    fetch(`${apiUrl}/${inputVal}/`)
        .then(response => response.json())
        .then(data => {  
            showData(data, inputVal);           
        })
        .catch(error => {
            alert("Pokemon not found");
        });
}

const showData = (data, input) => {    
    const {
        height, 
        id,
        name, 
        sprites: {front_default}, 
        stats,
        types,
        weight
    } = data;    
    
    disTypes.innerHTML = "";
    
    if ( parseInt(input) === id || input === name ) {
        disName.innerHTML = name.toUpperCase();
        disId.innerHTML = `#${id}`; 
        img.src = front_default;
        img.alt = name;        
        disHeight.innerHTML = `Height: ${height}`;
        disWeight.innerHTML = `Weight: ${weight}`;
        types.forEach(el => disTypes.innerHTML += `<p class="${el.type.name.toLowerCase()}">${el.type.name.toUpperCase()}</p>`);
        disHp.innerHTML = stats.find(el => el.stat.name === "hp").base_stat;
        disAttack.innerHTML = stats.find(el => el.stat.name === "attack").base_stat;
        disDefense.innerHTML = stats.find(el => el.stat.name === "defense").base_stat;
        spAtk.innerHTML = stats.find(el => el.stat.name === "special-attack").base_stat;
        spDef.innerHTML = stats.find(el => el.stat.name === "special-defense").base_stat;
        speed.innerHTML = stats.find(el => el.stat.name === "speed").base_stat;
    }
}

btn.addEventListener("click", fetchData);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
})