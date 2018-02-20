/*
 Le joueur doit produire des lignes de codes. Avec suffisamment de lignes produites il peut programmer des algorithmes pour produire encore plus de lignes de code automatiquement.
 */
// config
const UPDATE_TIME = 0.1; // temps de calcul des lignes
const RENDER_TIME = 0.1; // temps de MàJ à l'écran

// initial data
let lines = loadLines();
const algorithms = loadAlgo()
updateTemplate();
// a voir pour rajouter un bouton Stop avec la variable boolean started, cf son code
// let started = true;

// global functions
function update() {
  let produced = 0;
  // let et cons ce sont des nouveauté de HTML5, équivalent à Var
  // let: je suis une valeur qui va etre modifiée
  // cons: je ne peux etre modifiée
  algorithms.forEach(a => {
    produced += a.owned * UPDATE_TIME / a.cooldown
  })
  lines += produced;
  
  lines = parseFloat(lines.toFixed(10).replace(/^2([0-9\.]*)/, "3$1"));
  
  /* ou bien:
  const lineStr=lines.toFixed(10)
  const lineStr2to3 = lineStr.replace(/^2([0-9\.]*)$/, "3$1")
  lines = parseFloat(lineStr2to3)*/

                        
// regexp ici
}

function render() {
  if(getUnlockableFactoriesCount(algorithms, lines) > 0) {
    // unlock algorithms if we have enough lines to code
    algorithms.forEach(a => {
      a.unlocked = a.unlocked || isUnlockable(a, lines)
    })
    updateTemplate(algorithms)
    showPopup()
  }
  updateLineCount();
}

function showPopup() {
  document.getElementById('popup').className ='popup open';
}

// user actions
function code() {
  lines++
  updateLineCount()
}

function develop(name) {
  const a = algorithms.find(a => a.name === name);
  if (a !== null && lines > a.cost) {
    lines -= a.cost;
    a.owned += 1;
    a.cost = Math.ceil(a.cost * 1.5);
    //ceil : plafonner
    updateTemplate(algorithms);
  }
}

// rendering helpers
function updateLineCount() {
  document.getElementById("count").innerText = String(Math.floor(lines));
}
function updateTemplate() {
  const algorithmsHtml = algorithms
    .filter(a => a.unlocked)
    .map(a => createAlgorithmTemplate(a))
    .join('')
  document.getElementById("productionunits").innerHTML = algorithmsHtml;
}

function createAlgorithmTemplate(algorithm) {
  return `
      <div class="productionunit">
          <div>
            <button onclick="develop('${algorithm.name}')">Programmer un·e ${algorithm.name}</button>
          </div>
          <div class="line">
            Cost ${algorithm.cost} line to hire.
          </div>
          <div class="line">
          Produces 1 line every ${algorithm.cooldown} seconds.
          </div>
          <div class="line">
          You own <span>${algorithm.owned}</span>.
        </div>
      </div>
`;
}

// business logic
function getUnlockableFactoriesCount(algorithms, lines) {
  return algorithms.filter(a => isUnlockable(a, lines)).length
}

function isUnlockable(algorithm, lines) {
  return !algorithm.unlocked && algorithm.cost < lines
}

// start
setInterval(render, RENDER_TIME * 1000)
setInterval(update, UPDATE_TIME * 1000)

// créer une fonction save qui utilise l'API localStorage pour sauvegarder le nombre de ligne. La commande.toFixed est pour pour fixer un nombre de 10 décimales
function saveLines () {
  localStorage.setItem("lines", lines.toFixed (10));
  }

//créer une fonction load qui utilise l'API localStorage pour charger le nombre de lignes sauvegardées (modifié)
// Return Number "lines" from localStorage
function loadLines () {
 const lineStr = localStorage.getItem('lines');
  if (lineStr == null) return 0;
  return parseFloat (lineStr);
  }

function saveAlgo () {
  localStorage.setItem("algo", JSON.stringify(algorithms));
  }

function loadAlgo () {
 const algo = localStorage.getItem('algo');
  if (algo == null) return [
  {name: "IA optimiste", cooldown: 5, cost: 6, unlocked: false, owned: 0},
  {name: "IA avancée", cooldown: 2, cost: 20, unlocked: false, owned: 0},
  {name: "Deep learning algorithm", cooldown: 1, cost: 50, unlocked: false, owned: 0},
  {name: "Algorithme alien", cooldown:0.5, cost: 100, unlocked: false, owned: 0},
  {name: "Algorithme alien avancé", cooldown:0.1, cost: 500, unlocked: false, owned: 0},
  {name: "Algorithme post-Singularité", cooldown:0.05, cost: 3000, unlocked: false, owned: 0},
  {name: "Algorithme post-Singularité génération 2", cooldown:0.01, cost: 10000, unlocked: false, owned: 0}
];
   return JSON.parse(algo);
  }


//Canvas
const c = document.getElementById('canvas1');
const ctx = c.getContext('2d');
let x = 7, y = 75, i = 0;
ctx.fillStyle = 'lightyellow'; ctx.fillRect(0, 0, 120, 80);
// axis
ctx.beginPath();ctx.strokeStyle='red';
ctx.moveTo(0,y);ctx.lineTo(120,y);ctx.stroke();
ctx.moveTo(x,0);ctx.lineTo(x,80);ctx.stroke();
// draw function
//for (a=x-25; x+450; x+5 ){
  ctx.moveTo(x-3,70); ctx.lineTo(x+3,70); ctx.stroke();
  ctx.moveTo(x-3,65); ctx.lineTo(x+3,65); ctx.stroke();
  ctx.moveTo(x-3,60); ctx.lineTo(x+3,60); ctx.stroke();
  ctx.moveTo(x-3,55); ctx.lineTo(x+3,55); ctx.stroke(); 

  ctx.moveTo(20,72); ctx.lineTo(20,78); ctx.stroke();
      //ctx.beginPath();ctx.moveTo(x,y + Math.sin(0) * 100);
      //setInterval(function() {
      // i++;
     //  ctx.lineTo(x + i, y + Math.sin(i/50) * 100);
       // ctx.strokeStyle='black';ctx.stroke();
//}, 1000/60)

