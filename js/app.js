let productsNames =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

let leftImageEl = document.getElementById('left');
let rightImageEl = document.getElementById('right');
let middleImageEL = document.getElementById('middle');
let attempts = 25;

let displayListButtonEl = document.getElementById('displayList');
let mainContainerListEl = document.getElementById('mainContainerList');
let mainContainerImagesAndDescEl = document.getElementById('mainContainerImagesAndDesc');

let products  = [];
function Product(image){
  this.imageName = image.split('.')[0];
  this.imagePath = `images/${image}`;
  this.clickedNum= 0;
  this.viewedNum = 0;
  products.push(this);
}


for (let i = 0; i < productsNames.length; i++) {
  new Product(productsNames[i]);
}


function generateRandomNumber(){
  return Math.floor( Math.random()*productsNames.length);
}

let leftIndex;
let rightIndex;
let middleIndex;
function renderThreeRandomImages(){
  let randomIndexs =[];
  while (randomIndexs.length !==3){
    let rand = generateRandomNumber();
    if(!randomIndexs.includes(rand)){
      randomIndexs.push(rand);

    }
  }
  console.log(randomIndexs);
  leftIndex = randomIndexs[0];
  rightIndex = randomIndexs[1];
  middleIndex = randomIndexs[2];

  leftImageEl.setAttribute('src',products[leftIndex].imagePath);
  rightImageEl.setAttribute('src',products[rightIndex].imagePath);
  middleImageEL.setAttribute('src',products[middleIndex].imagePath);
  products[leftIndex].viewedNum++;
  products[rightIndex].viewedNum++;
  products[middleIndex].viewedNum++;
}


renderThreeRandomImages();


leftImageEl.addEventListener('click',generateRandomImages);
rightImageEl.addEventListener('click',generateRandomImages);
middleImageEL.addEventListener('click',generateRandomImages);

displayListButtonEl.addEventListener('click',displayReport);

function displayReport(e){
  e.preventDefault();
  mainContainerListEl.innerHTML='';
  mainContainerListEl.style.display = 'inline-block';
  mainContainerImagesAndDescEl.style.display = 'inline-block';
  mainContainerListEl.style.width='30%';
  mainContainerImagesAndDescEl.style.width='67%';
 
  for (let i = 0; i < products.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = `${products[i].imageName} had ${products[i].clickedNum} votes, and was seen ${products[i].viewedNum} times.`;
    mainContainerListEl.appendChild(liEl);

  }

}


let attempt = 1;
function generateRandomImages(e){

  let imageClicked = e.target.id;
  if(attempt <= attempts){
    if(imageClicked === 'left'){
      products[leftIndex].clickedNum++;
      renderThreeRandomImages();
    }else if(imageClicked === 'right'){
      products[rightIndex].clickedNum++;
      renderThreeRandomImages();
    }else{
      products[middleIndex].clickedNum++;
      renderThreeRandomImages();
    }
    attempt++;
  }else{
    displayListButtonEl.style.display = 'inline-block';
    leftImageEl.removeEventListener('click',generateRandomImages);
    rightImageEl.removeEventListener('click',generateRandomImages);
    middleImageEL.removeEventListener('click',generateRandomImages);
  }
}


