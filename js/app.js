let productsNames =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

let leftImageEl = document.getElementById('left');
let rightImageEl = document.getElementById('right');
let middleImageEL = document.getElementById('middle');
let attempts = 25;

let displayListButtonEl = document.getElementById('displayList');
let mainContainerListEl = document.getElementById('mainContainerList');
let mainContainerImagesAndDescEl = document.getElementById('mainContainerImagesAndDesc');

let products  = [];
let productsLabels = [];
let productsViewedNum = [];
let productsClickedNum = [];
//define a constructor for available products
function Product(image){
  this.imageName = image.split('.')[0];
  this.imagePath = `images/${image}`;
  this.clickedNum= 0;
  this.viewedNum = 0;
  productsLabels.push(this.imageName);
  products.push(this);
}

//fill the list with available products
for (let i = 0; i < productsNames.length; i++) {
  new Product(productsNames[i]);
}

//generate integer random number less than the number of available products
function generateRandomNumber(){
  return Math.floor( Math.random()*productsNames.length);
}

let leftIndex;
let rightIndex;
let middleIndex;
let randomIndexs=[];

//generate three different random numbers 
function createThreeRandomIndexes(){

  let randomIndexes = [];
  while (randomIndexes.length !== 3){
    let rand = generateRandomNumber();
    if(!randomIndexes.includes(rand)){
      randomIndexes.push(rand);

    }
  }
  return randomIndexes;
}
//check if two arrays are absolutly different from each other
function compareTwoArrays(first,second){
  let equal  = false;
  for (let i = 0; i < first.length; i++) {
    if(second.includes(first[i])){
      equal = true;
      break;
    }
  }
  return equal;
}


//render three images on screen
function renderThreeRandomImages(){
  let tempIndexes = createThreeRandomIndexes();
  if(randomIndexs.length === 0){
    randomIndexs = tempIndexes;
  }else{
    while(compareTwoArrays(randomIndexs,tempIndexes)){
      tempIndexes = createThreeRandomIndexes();
    }
    randomIndexs = tempIndexes;
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


//display list of most seen products and most clicked products
function displayReport(e){
  e.preventDefault();
  mainContainerListEl.innerHTML='';
  mainContainerListEl.style.display = 'inline-block';
  mainContainerListEl.style.verticalAlign='top';
  mainContainerImagesAndDescEl.style.display = 'inline-block';
  mainContainerImagesAndDescEl.style.verticalAlign='top';
  mainContainerListEl.style.width='30%';
  mainContainerImagesAndDescEl.style.width='60%';
  let productsLocale= JSON.parse(localStorage.getItem('products'));
  for (let i = 0; i < productsLocale.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = `${productsLocale[i].imageName} had ${productsLocale[i].clickedNum} votes, and was seen ${productsLocale[i].viewedNum} times.`;
    mainContainerListEl.appendChild(liEl);

  }

}




let attempt = 1;

//function responds to the click event on each image and regenerate three different images
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


    let productsLocal = JSON.parse(localStorage.getItem('products'));
    if( productsLocal === null){

      productsLocal = products;


      for (let i = 0; i < productsLocal.length; i++) {
        productsViewedNum.push(productsLocal[i].viewedNum);
        productsClickedNum.push(productsLocal[i].clickedNum);

      }
      localStorage.setItem('products',JSON.stringify(productsLocal));

    }else{
      for (let i = 0; i < productsLocal.length; i++) {
        productsLocal[i].viewedNum+=products[i].viewedNum;
        productsLocal[i].clickedNum+=products[i].clickedNum;
        productsViewedNum.push(productsLocal[i].viewedNum);
        productsClickedNum.push(productsLocal[i].clickedNum);

      }
      localStorage.setItem('products',JSON.stringify(productsLocal));

    }
    localStorage.setItem('productsViewedNum',JSON.stringify(productsViewedNum));
    localStorage.setItem('productsClickedNum',JSON.stringify(productsClickedNum));
    displayListButtonEl.style.display = 'inline-block';
    document.getElementById('myChart').style.display = 'block';
    renderChart();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });


    leftImageEl.removeEventListener('click',generateRandomImages);
    rightImageEl.removeEventListener('click',generateRandomImages);
    middleImageEL.removeEventListener('click',generateRandomImages);
  }

}







//render chart  to display the collected data
function renderChart(){

  let ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels:productsLabels,
      datasets: [{
        label: '# of Votes',
        data: JSON.parse(localStorage.getItem('productsClickedNum')),
        backgroundColor: [
          'rgb(255, 99, 132)',
        ],
        // borderColor: [
        //   'rgba(0, 99, 132, 1)',
        //   'rgba(0, 162, 235, 1)',
        //   'rgba(0, 206, 86, 1)',
        //   'rgba(0, 192, 192, 1)',
        //   'rgba(0, 102, 255, 1)',
        //   'rgba(0, 159, 64, 1)'
        // ],
        borderWidth: 2
      },{
        label: '# of Viewed',
        data: JSON.parse(localStorage.getItem('productsViewedNum')),
        backgroundColor: [
          'rgb(54, 162, 235)',
        ],
        // borderColor: [
        //   'rgba(0, 99, 132, 1)',
        //   'rgba(0, 162, 235, 1)',
        //   'rgba(0, 206, 86, 1)',
        //   'rgba(0, 192, 192, 1)',
        //   'rgba(0, 102, 255, 1)',
        //   'rgba(0, 159, 64, 1)'
        // ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


