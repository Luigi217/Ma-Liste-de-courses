const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const img = new Image();
img.src = './img/avatars/avatar_1_173.png';

const charactersNbr = 9;

const avatars = [];
for(let i=0; i < charactersNbr; i++) {
  avatars[i] = new Image();
  avatars[i].src = './img/avatars/avatar_' + (i+1) + '.png';
}

const sticky = new Image();
sticky.src = './img/resources/stickyNotes.png';

const emptyBasket = new Image();
emptyBasket.src = './img/resources/basketEmpty.png';

const fullBasket = new Image();
fullBasket.src = './img/resources/basketFull.png';

const items = [];
items.push('Sel', 'Baguette', 'Fraises', 'Rosbif');

const defaultFont = '24px Verdana';

// Timer
let T = 3;
ctx.font = defaultFont; //'24px Verdana';
ctx.textAlign = 'center';

const noms = [];
noms.push('Andréa', 'Camille', 'Claude', 'Dominique', 'Sasha');

function getLvl() {
  return this.lvlNow; // Hmmm....
}

const game = {
  lvl_1: {
    nbrPersons: 2,
    nbrItems: 2
  },
  lvl_2: {
    nbrPersons: 2,
    nbrItems: 3
  },
  lvl_3: {
    nbrPersons: 3,
    nbrItems: 3
  },
  lvl_4: {
    nbrPersons: 3,
    nbrItems: 4
  },
  lvl_5: {
    nbrPersons: 4,
    nbrItems: 4
  },
  lvl_6: {
    nbrPersons: 4,
    nbrItems: 6
  },
  //getLvl: this.lvl_1

  /*characters_: { // liste des personnages avec pour chacun leur liste de courses
    name_ ,
    avatar_ ,
    itemsList: []
  }*/
};
class Character {
  constructor(name, avatar) {
    this.name = name || 'NOM';
    this.avatar = avatar || '9';
    this.itemsList = [];
  }

  addItemToList(item){
    if(this.itemsList.includes(item))
      this.itemsList.push(item);
  }
}
///////////////////////////////////////////////////////
// Init an array containing all the characters
const availableCharacters = [];
for (let i = 0; i < charactersNbr; i++)
  availableCharacters[i] = i;

const charactersArrays = [];
for(let i = 0; i < charactersNbr; i++) {
  let nbr, randIndex;// = 0;

  randIndex = Math.floor(Math.random() * availableCharacters.length);

  nbr = availableCharacters[randIndex];

  charactersArrays[i] = new Character(noms[availableCharacters[nbr]]);
  // Removes 1 element at index randIndex
  // It removes the characterNbr form the array of available nbrs
  // so it wont be selectable by any other character
  availableCharacters.splice(randIndex, 1);



}
///////////////////////////////////////////////////////

let nbrP = 0;
let nbrI = 0;

// We keep a trace of the asked items in this array
let itemsArray; // itemsList in Character object for each item
// Could be used to store all the asked items and shuffle it

function initGame() {
  // lvl_1
  nbrP = game.lvl_1.nbrPersons;
  nbrI = game.lvl_1.nbrItems;

  // Initialize the asked items array
  // Length = nbr of elements multiplied by nbr of people
  itemsArray = new Array(nbrP * nbrI);
  console.log(itemsArray.length);

}

function coloredFrame(startX = 20, startY = 20,
  color1 = 'red', color2 = 'yellow') {
  ctx.beginPath();
  ctx.lineWidth = '6';
  ctx.strokeStyle = color1;
  ctx.rect(startX, startY, img.width, img.height);
  ctx.stroke();
  // On réutilise le même tracé mais affiché jaune et moins épais
  ctx.lineWidth = '2';
  ctx.strokeStyle = color2;
  ctx.stroke();
}

function canvasVgrid3(x = 1) {
  ctx.beginPath();
  ctx.moveTo(x * c.width / 3, 0);
  ctx.lineTo(x * c.width / 3, c.height);
  ctx.stroke();
}

function canvasHgrid3(x = 1) {
  ctx.beginPath();
  ctx.moveTo(0, x * c.height / 3);
  ctx.lineTo(c.width, x * c.height / 3);
  ctx.stroke();
}

// Calculates squares coordinates before using coloredFrame()
function coloredFrame2(x, y, color1, color2) {
  const xRectC = (x / 3 * c.width) + (((c.width / 3) - img.width)) / 2;
  const yRectC = ((y - 1) * c.height / 3) + ((c.height - img.height)) / 2;
  coloredFrame(xRectC, yRectC, color1, color2);
}

function drawImg2(x, y, image = img) {
  const xRectC = (x / 3 * c.width) + (((c.width / 3) - image.width)) / 2;
  const yRectC = ((y - 1) * c.height / 3) + ((c.height - image.height)) / 2;
  ctx.drawImage(image, xRectC, yRectC);
}

const doTheThing = () => {
  ctx.fillText('Insérer compteur ici : ' + T--, c.width / 2, c.height / 2);
};
const countdownXs = (X = 10) => {
  // Ne pas déclarer le compteur ici
  T = X;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    doTheThing();
    if (T < 0) {
      clearInterval(interval);
      //ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'yellow';
      ctx.fillText('BOOM!', c.width / 2, c.height / 2);
    }
  }, 1000);
};

const drawCanvasGrid3 = () => {
  canvasVgrid3();
  canvasVgrid3(2);
  canvasHgrid3();
  canvasHgrid3(2);
};
const drawColoredFrames3 = () => {
  coloredFrame2(0, 1);
  coloredFrame2(1, 0, 'green');
  coloredFrame2(2, 1, 'blue');
  coloredFrame2(2, 2, 'magenta');
};

function drawStickyOld() { // Ok. On initialise les coords que l'on retourne
                           // Draw the shopping list sticky notes w/ right
                           // coordinates
  let x, y;
  x = (c.width + sticky.width / 4) / 2;
  y = (c.height - sticky.height) / 2;
  ctx.drawImage(sticky, x, y);
  return [x, y];
}

function drawStickyPartOne() {
  this.xNow = (c.width + sticky.width / 4) / 2;
  this.yNow = (c.height - sticky.height) / 2;
  ctx.drawImage(sticky, this.xNow, this.yNow);
}
function initTextCoordsPartOne() {
  this.xNow += (sticky.width / 2);
  this.yNow += (0.2 * sticky.height);
  ctx.textAlign = 'center';
  ctx.font = defaultFont;
}
function diplay1stElemOnSticky() {
  this.yNow += .2 * sticky.height;
  ctx.fillText(items[1], this.xNow, this.yNow);
}
function display2ndElemOnSticky() {
  this.yNow += .2 * sticky.height;
  ctx.fillText(items[3], this.xNow, this.yNow);
}
function drawAvatarPartOne() {
  this.xNow = (c.width / 2 - img.width) / 2;
  this.yNow = (c.height - img.height) / 2;
  ctx.drawImage(img, this.xNow, this.yNow, img.width, img.height);
}
function displayAvatarName() {
  ctx.textAlign = 'center';
  ctx.font = defaultFont;
  ctx.fillStyle = 'black';
  this.xNow += img.width / 2;
  this.yNow += 1.15 * img.height;
  //ctx.fillText(noms[1], this.xNow, this.yNow);
  ctx.fillText('Camille Dupont', this.xNow, this.yNow);
}
function displayTitlePartOneEnd() {
  let x, y;
  x = 0.25 * c.width; // 10%
  y = 0.1 * c.height; // 10%
  ctx.textAlign = 'end';
  //ctx.font = 'bold 24px Verdana';
  ctx.font = 'bold ' + defaultFont;
  ctx.fillText('Niveau 1 ', x, y); // TODO handle lvl
  //ctx.fillText('Niveau ' + game.getLvl , x, y);
  ctx.textAlign = 'start';
  ctx.font = defaultFont;
  x += 0.05 * c.width;
  //ctx.fillText(' Vous avez 2 listes de courses à retenir', x, y);
  //ctx.fillText(' Vous avez ' + game.getLvl.nbrPersons +' listes de courses à
  // retenir', x, y);
  ctx.fillText(' Vous avez ' + game.lvl_1.nbrPersons +
    ' listes de courses à retenir', x, y);
}
const coordsObjPartOne = {
  xNow: 0,
  yNow: 0,
  drawSticky: drawStickyPartOne,
  initText: initTextCoordsPartOne,
  display1stElem: diplay1stElemOnSticky,
  display2ndElem: display2ndElemOnSticky,
  drawAvatar: drawAvatarPartOne,
  displayName: displayAvatarName
};


//function displayBasketCenter(basket, title) {
const displayBasketCenter = (basket, title) => {
  let x, y;
  // Display the title
  x = c.width / 2;
  y = 0.1 * c.height;
  ctx.textAlign = 'center';
  ctx.font = defaultFont;
  ctx.fillStyle = 'black';
  ctx.fillText(title, x, y);
  // Display the image
  x = (c.width - 1 * basket.width) / 2;
  y = (c.height - 1 * basket.height) / 2; // A remonter un peu ?
  ctx.drawImage(basket, x, y);
};
const displayEmptyBasket = () => {
  displayBasketCenter(emptyBasket,
    'Vous avez retenu les listes et vous partez au marché');
};
const displayFullBasket = () => {
  displayBasketCenter(fullBasket,
    'Vous revenez du marché et votre panier est désormais rempli.');
};
const resetCanvas = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.font = defaultFont;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
};

const allez1 = () => {
  // Grid
  drawCanvasGrid3();
  // Colored squares
  drawColoredFrames3();
  // Draws avatar_1 in the grid's top left square
  drawImg2(0, 0);
  // Starts a countdown of 10 seconds if no parameter is given
  countdownXs(3);
};
const allez3 = () => {
  //initGame();
};
const firstPart = () => {
  // Niveau 1 - Vous avez 2 listes de courses à retenir
  displayTitlePartOneEnd();

  // Displays the sticky notes img
  coordsObjPartOne.drawSticky();

  // Initialize coordinates for writing the shopping list text, according to
  // the sticky coords
  coordsObjPartOne.initText();

  // Display the 1st elem
  coordsObjPartOne.display1stElem();

  // Display a 2nd elem
  coordsObjPartOne.display2ndElem();

  // Draw the avatar img
  coordsObjPartOne.drawAvatar();
  // Display their name
  coordsObjPartOne.displayName();

  setTimeout(firstPartEnd, 3000);
};
const firstPartEnd = () => {
  /*ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, c.width, c.height);*/
  resetCanvas();
  displayEmptyBasket();
  setTimeout(secondPartStart, 3000);
};
const secondPartStart = () => {
  resetCanvas();
  displayFullBasket();
  setTimeout(secondPart, 3000);
};

const displayLvl = () => {
  ctx.fillStyle = 'black';
  ctx.textAlign = 'start';
  ctx.fillText('Niveau 1', .03 * c.width, .07 * c.height);
};
const displayTitlePartTwo = () => {
  let x, y;
  x = .6 * c.width;
  y = .07 * c.height;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  //ctx.font = 'bold ' + defaultFont;
  ctx.fillText('Vous souvenez-vous de ce que vous ont ', x, y);
  ctx.fillText('demandé vos proches ?', x, y + 35);
  // TODO: find a better way for line breaks
};
const drawDropRects = () => {
  this.x1 = .1 * c.width;
  this.y = 2 / 3 * c.height;
  this.w = c.width / 4;
  this.h = c.height / 4;
  ctx.strokeStyle = 'gray';
  ctx.rect(this.x1, this.y, this.w, this.h);
  ctx.stroke();

  this.x2 = c.width - (this.x1 + this.w); // Symmetrical
  ctx.rect(this.x2, this.y, this.w, this.h);
  ctx.stroke();
};
const drawAvatarPartTwo = () => {
  this.x1 += w / 2;
  this.y -= h / 6;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(noms[3], this.x1, this.y);

  this.x2 += w / 2;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(noms[0], this.x2, this.y);

  /*this.x1 -= img.width / 2;
  this.y -= img.height + 0;*/
  this.x1 -= avatars[6].width / 2;
  this.y -= 9/7*avatars[6].height + 0;
  ctx.drawImage(avatars[6], this.x1, this.y);

  this.x2 -= avatars[6].width / 2;
  ctx.drawImage(avatars[7], this.x2, this.y);
};
const coordsObjPartTwo = {
  x1: 0,
  y: 0,
  x2: 0,
  w: 0,
  h: 0,
  drawDropRects: drawDropRects,
  drawAvatar: drawAvatarPartTwo
};

const secondPart = () => {
  resetCanvas();
  displayLvl();
  displayTitlePartTwo();

  coordsObjPartTwo.drawDropRects();
  coordsObjPartTwo.drawAvatar();
};

const letsGo = () => {
  firstPart();
  //setTimeout(firstPartEnd, 3000);
  //setTimeout(secondPartStart, 6000);
};

window.onload = letsGo;
//window.onload = secondPart;
