// mutable variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Arm"];
// Non-mutable variables
const button1_store = document.querySelector("#button1");
const button2_cave = document.querySelector("#button2");
const button3_dragon = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpTest");
const healthText = document.querySelector("#healthText");
const goldText  = document.querySelector("#goldText");
const monsterStatus = document.querySelector("#monsterStatus");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
    {
        name: "Arm",
        power: 5
    },
    {
        name: "Stick",
        power: 30
    },
    { 
        name: "Fação",
        power: 50
    },
    {
        name:"Argumentos",
        power:100
    }
];
const monsters = [
    {
        name: "Alvinho",
        lvl: 1,
        health: 20
    },
    {
        name: "Elton",
        lvl: 6,
        health: 60
    },
    {
        name: "Fishengon",
        lvl: 10,
        health: 140
    },
    {
        name: "Dragon",
        lvl: 20,
        health: 500
    }
];

const locations = [
    {
        name: "Town Square",
        "button text": [
            "Go to Store" , "Go to Cave" , "Fight Dragon"
        ],
        "button functions": [goStore, goCave, fightDragon],
        text: "U are in the town Square. U see the direction of the \"Store\""
    },
    {
        name: "Store",
        "button text" : [ 
            "Buy 10 health ( 10 gold )", "Buy Weapon ( 30 gold )", "Go to Town Square"
        ],
        "button functions" : [buyHealth , buyWeapon, goTown],
        text: "U enterred the Store"
    },
    {
        name: "Cave",
        "button text" : [ 
            "fight Alvinho", "fight Elton", "fight Big Fat Peixe"
        ],
        "button functions" : [fightAlvinho , fightElton, fightFish],
        text: "U enterred the Store"
    }
];
// initialize buttons
button1_store.onclick = goStore;
button2_cave.onclick = goCave;
button3_dragon.onclick = fightDragon;
//Functions
function update(location) {
    button1_store.innerText = location["button text"][0];
    button2_cave.innerText = location["button text"][1];
    button3_dragon.innerText = location["button text"][2];
    button1_store.onclick = location["button functions"][0];
    button2_cave.onclick = location["button functions"][1];
    button3_dragon.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown(){
    update(locations[0]);
}
function goStore(){
    update(locations[1]);

}
function goCave(){
    update(locations[2]);
}
function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
        health.innerText = health;
    }
    else{
        text.innerText = "U poor thief Dog!"
    }
}
function buyWeapon(){
    if(currentWeapon < weapons.length - 1 ){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "U have a new weapon, a "+newWeapon;
            inventory.push[newWeapon];
            text.innerText+= "And u now have it in ur inventory"
        }
        else{
            text.innerText = "U poor thief Dog!"
        }
    }
    else{
        text.innerText= "U already have the Strongest Weapon! U can sell it though";
        button2_cave.innerText = "15 Gold";
        button2_cave = sellWeapon;
        
    }
}
function sellWeapon(){
    if(inventory.length > 1){
        gold+= 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "U just sold a " + currentWeapon + ".";
        text.innerText = "U now Have "+ inventory;
    }
    else{
        text.innerText = "U cannot sell ur DAMN ARM lmao";
    }
}
function fightDragon(){
    
}
function fightAlvinho(){
    
}
function fightElton(){
    
}
function fightFish(){
    
}

