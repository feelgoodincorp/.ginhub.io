// setTimeout(removeTitle, 3000);

// window.addEventListener('click', removeTitle);

// function removeTitle() {
//   document.querySelector('h2').style.display = "none";
// }

// class App {
//     constructor() {
//         this.canvas = document.querySelector("#flowers");
//         this.ctx = this.canvas.getContext('2d');
//       this.flowers = [];
//     }

//     init() {
//         this.initVars();
//         this.initEvents();
      
//       this.update();
//     }

//     initVars() {
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//     }

//     initEvents() {
//         window.addEventListener('resize', this.resize.bind(this));
//         window.addEventListener('click', this.createFlower.bind(this));
//     }
  
//   createFlower(e) {
//     e.preventDefault;
//     let mX = e.clientX, mY = e.clientY;
//     let flower = new Flower(this.ctx, mX, mY);
//     this.flowers.push(flower);
//   }
  
//   update() {
//     requestAnimationFrame(this.update.bind(this));
    
//     this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    
//     this.flowers.forEach((e, i) => {
//       if(e.opacity <= 0) {
//         this.flowers.splice(i, 1);
//       }else {
//         if(e.canUpdate){
//           e.update();
//         }else {
//           e.draw();
//         }
//       }
//     })
//   }

//     resize() {
//         this.canvas.width = window.offsetWidth;
//         this.canvas.height = window.offsetHeight;
//     }

// }

// class Flower {
//   constructor(ctx, mX, mY) {
//     this.flowerRadius = 35;
//     this.ctx = ctx;
//     this.mX = mX;
//     this.mY = mY;
//     this.lineWidth = 4;
//     this.opacity = 1;
//     this.canUpdate = false;
    
//     this.draw();
    
//     this.startUpdate();
//   }
  
//   getPourcentOfHeight() {
//     let pourcent = 0;
//     let height = window.innerHeight;
//     return pourcent = (this.mY * 100 / height) / 100;
//   }
  
//   draw() {
//     let pourcent = this.getPourcentOfHeight(), pX = 0, pY = 0;
//     this.ctx.strokeStyle = 'green';
//     this.ctx.lineWidth = this.lineWidth * pourcent;
//     this.ctx.beginPath();
//     this.ctx.moveTo(this.mX, this.mY);
//     this.ctx.bezierCurveTo( this.mX - 19, this.mY - 89, this.mX + 20, this.mY - 76, this.mX - 2, this.mY - 182 );
//     this.ctx.stroke();
//     this.ctx.closePath();
//     this.ctx.beginPath();
//     this.ctx.fillStyle = 'yellow';
//     this.ctx.arc(this.mX - 2, this.mY - 182, this.flowerRadius * pourcent, 0, Math.PI * 2)
//     this.ctx.fill();
//     this.ctx.closePath();
//     this.ctx.fillStyle = 'white';
//     this.ctx.beginPath();
//     pX = this.mX - 2 - this.flowerRadius * pourcent / 2;
//     pY = this.mY - 182 - this.flowerRadius * pourcent / 2;
//     this.ctx.moveTo(pX, pY);
//     this.ctx.bezierCurveTo( pX - 26, pY - 52, pX + 55, pY - 65, pX + 26, pY + 2 );
//     this.ctx.fill();
//     this.ctx.closePath();
//     this.ctx.beginPath();
//     pX = this.mX - 2 + this.flowerRadius * pourcent / 2;
//     pY = this.mY - 182 - this.flowerRadius * pourcent / 2;
//     this.ctx.moveTo(pX,pY);
//     this.ctx.bezierCurveTo( pX + 74, pY - 36, pX + 55, pY + 62, pX + 2, pY + 21 );
//     this.ctx.fill();
//     this.ctx.closePath();
//     this.ctx.beginPath();
//     pX = this.mX - 2 - this.flowerRadius * pourcent / 2;
//     pY = this.mY - 182 - this.flowerRadius * pourcent / 2;
//     this.ctx.moveTo(pX,pY);
//     this.ctx.bezierCurveTo( pX - 45, pY - 31, pX - 62, pY + 66, pX - 1, pY + 31 );
//     this.ctx.fill();
//     this.ctx.closePath();
//     this.ctx.beginPath();
//     pX = this.mX - 2 - this.flowerRadius * pourcent / 2;
//     pY = this.mY - 182 + this.flowerRadius * pourcent / 2;
//     this.ctx.moveTo(pX,pY);
//     this.ctx.bezierCurveTo( pX - 8, pY + 56, pX + 48, pY + 51, pX + 30, pY  );
//     this.ctx.fill();
//     this.ctx.closePath();
//     /*
//     TODO: Draw the line step by step following the bezier curve
//     let t = 0, sx = this.mX, sy = this.mY, cp1x = this.mX -19, cp1y = this.mY - 89, cp2x = this.mX + 20, cp2y = this.mY - 76, ex = this.mX - 2, ey = this.mY - 182, coord = {};
//     for(let i = 0; i < 1; i+= 0.01) {
//       coord = this.getBezierXY(i, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey);
//       this.ctx.arc(coord.x, coord.y, this.lineWidth * pourcent, 0, Math.PI * 2);
//     }
//     */
//   }
  
//   update() {
//     this.opacity -= 0.01;
//     if(this.opacity <= 0) return false;
//     this.ctx.globalAlpha = this.opacity;
//     this.draw();
//     this.ctx.globalAlpha = 1;
//   }
  
//   /**
//   * t : position along the curve, 0 to 1
//   * sx, sy : starting points
//   * cp : control points
//   * ex, ey : end points
//   **/
//   getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
//     return {
//       x: Math.pow(1-t,3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x 
//         + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
//       y: Math.pow(1-t,3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y 
//         + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
//     };
//   }
  
//   startUpdate() {
//     setTimeout(() => {
//       this.canUpdate = true;
//     }, 2000);
//   }
// }

// let app = new App();
// app.init();

(function () {

  //fields
  var canvas = document.getElementById("canvas");
  var body = document.getElementsByTagName("body")[0];
  var positions = []
  var ctx = canvas.getContext("2d");
  const MINPETAL = 5
  const MAXPETAL = 13
  var pistilC, petalC, pistilC2, petalC2

  //здесь задавать мод

let mode = pick(["daisies", "multi", "quad", "roses", "crosshatch", "blueYellow", "greenRed"])    
    let bg = new randomColor(minSat=50)
    if(mode=="daisies") bg.l = getRandomInt(0,50)
    canvas.style.backgroundColor = bg.hsl()

    var colorz = {
    "daisies":{h2:35,s2:83,l2:85,h:45,s:92,l:52,vary:20,mix:false},
    "roses":{h:1,s:91,l:46,h2:1,s2:91,l2:30,vary:20,mix:true},
    "crosshatch":{h:1,s:91,l:46,vary:80,mix:true},/*only defines one varying pistil color*/
    "greenRed":{h:102,s:72,l:27,h2:348,s2:89,l2:42,vary:20,mix:false},
    "blueYellow":{h:45,s:99,l:50,h2:240,s2:67,l2:58,vary:10,mix:false},
    }


//assign colors
    let colorOpt = colorz[mode]
    let colors =  getThemeColors(colorOpt) /*pistil color at index 0, petal color at index 1*/
   
  
  /*Initialize flowers*/
  body.addEventListener("click", "touchend" ,function(ev){

//TODO
//цвет фона задавать только при открытии страницы
//определить моды: одинаковые цвета, разные ()
//попробовать добавить анимацию
//убрать лишнее
//на гитхаб

//очищает поле
//ctx.clearRect(0, 0, canvas.width, canvas.height)
    positions = []
    //body.style.filter = chance(.12)?`grayscale(${getRandomInt(0,80)}%)`:""
   //let mode = pick(["daisies", "multi", "quad", "roses", "crosshatch", "blueYellow", "greenRed"])    
    //let bg = new randomColor(minSat=50)
    //if(mode=="daisies") bg.l = getRandomInt(0,50)
    //смена фона по клику
    //canvas.style.backgroundColor = bg.hsl()
    



  	var opt = {
      mode:mode, 
      spaceAround:chance(), 
      allowLarge:chance(), 
      padding:getRandomInt(1,4), 
      innerDetails:chance(),
      petalIterations:4,
      minOpacity:getRandomFloat(.5,.9),
      invertColors: chance(.25),
      xAxis: event.clientX,
      yAxis: event.clientY
    }


        
    if(opt.invertColors){
      petalC = colors[0].hsl()
      pistilC = colors[1].hsl()
    } else { 
      petalC = colors[1].hsl()
      pistilC = colors[0].hsl()
    }
    colors = getThemeColors(colorOpt)
    if(opt.invertColors){
      petalC2 = colors[0].hsl()
      pistilC2 = colors[1].hsl()
    } else { 
      if(colorOpt&&colorOpt.mix){/*switching petals and pistil color*/
        petalC2 = colors[0].hsl()
        pistilC2 = colors[1].hsl()
      } else {
        petalC2 =colors[1].hsl()
        pistilC2 =colors[0].hsl()
      }
    }

    let numFlower = mode=="multi"?getRandomInt(50,1000) : getRandomInt(40,250)
    for(let i=0; i<5; i++){

      if(mode=="multi") {
        pistilC = new randomColor(minSat=50).hsl()
        petalC = new randomColor(minSat=50).hsl()
        pistilC2 = new randomColor(minSat=50).hsl()
        petalC2 = new randomColor(minSat=50).hsl()
      }
      
    }
    console.log((mode));
    drawFlower(opt)


  })
  window.onload = drawFlowers
  window.onresize = drawFlowers

  
  /*Flower flunctions*/
  function drawFlowers() {
    scaleCanvas()
    //background color   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    positions = []
    body.style.filter = chance(.12)?`grayscale(${getRandomInt(0,80)}%)`:""

        
    if(opt.invertColors){
      petalC = colors[0].hsl()
      pistilC = colors[1].hsl()
    } else { 
      petalC = colors[1].hsl()
      pistilC = colors[0].hsl()
    }
    colors = getThemeColors(colorOpt)
    if(opt.invertColors){
      petalC2 = colors[0].hsl()
      pistilC2 = colors[1].hsl()
    } else { 
      if(colorOpt&&colorOpt.mix){/*switching petals and pistil color*/
        petalC2 = colors[0].hsl()
        pistilC2 = colors[1].hsl()
      } else {
        petalC2 =colors[1].hsl()
        pistilC2 =colors[0].hsl()
      }
    }

    //draw the flowers
    let numFlower = mode=="multi"?getRandomInt(50,1000) : getRandomInt(40,250)
    for(let i=0; i<numFlower; i++){
      if(mode=="multi") {
        console.log("multi - true");
        pistilC = new randomColor(minSat=50).hsl()
        petalC = new randomColor(minSat=50).hsl()
        pistilC2 = new randomColor(minSat=50).hsl()
        petalC2 = new randomColor(minSat=50).hsl()
      }
      
    drawFlower(opt)
    }
  } 
  
  function drawFlower(opt) {
    
    let f = new Flower(opt);
    if(!f) return false;
    positions.push(new Point(f.x, f.y))
    ctx.save();
    ctx.globalAlpha = f.opacity
    ctx.lineWidth = f.lw;
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rad);
    ctx.translate(-f.x, -f.y);

    ctx.fillStyle = chance()?petalC2:petalC
    ctx.strokeStyle = ctx.fillStyle
  
    //petals
    for (let i = 0; i < f.petals; i++) {
      ctx.translate(f.x, f.y);
      ctx.rotate((f.rotate * Math.PI) / 180);
      ctx.translate(-f.x, -f.y);
      ctx.beginPath();
      ctx.moveTo(f.x, f.y-f.shiftOut);
      
      for (let j = 0; j < opt.petalIterations; j++) {
        let sp1 = f.r*f.petalSpread1
        let len1 = f.r*f.petalLength1
        let sp2 = f.r*f.petalSpread2
        let len2 = f.r*f.petalLength2
        let endX = f.petalBase
        let endY = f.shiftOut
        ctx.translate(f.x, f.y);
        if(j%2==0){/*symmetric rotations for more symmetric petals, rando for some irregularity*/
           ctx.rotate((j*(360/opt.petalIterations) * Math.PI) / 180);
        } else {
           ctx.rotate((j*(getRandomInt(1,4)) * Math.PI) / 180);
        }
       
        ctx.translate(-f.x, -f.y);
        ctx.bezierCurveTo(f.x-sp1,/*control point #1 'upper left'*/
                          f.y-len1,
                          f.x+sp2,/*control point #2 'upper right'*/
                          f.y-len2,
                          f.x+endX,/*ending point*/
                          f.y-endY)
        if(opt.innerDetails) ctx.quadraticCurveTo(
                          f.x,/*control point*/
                          f.y+f.r,
                          f.x+getRandomInt(0,5),/*ending point*/
                          f.y)
      }



      ctx.fill();
      ctx.closePath();
      ctx.beginPath()
      
    }
    //pistil
     for (let j = 0; j < 3; j++) {
      ctx.arc(f.x+getRandomFloat(-2,2), f.y+getRandomFloat(-2,2), (f.r/f.centerDivisor), 0, 360) 
     }
    
    ctx.strokeStyle = petalC;
    ctx.fillStyle = opt.mode!="crosshatch"&&opt.mode!="daisies" ? (chance()?pistilC2:pistilC) : pistilC;
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
  }

  function Flower(opt) {
   
    // this.r = opt.allowLarge && chance(.05)? getRandomInt(50,150) : getRandomInt(20,50)
    // this.x = getRandomInt(0, canvas.width)
    // this.y = getRandomInt(0, canvas.height)


    this.r = opt.allowLarge && chance(.05)? getRandomInt(50,150) : getRandomInt(20,50)

    this.x = opt.xAxis;
    this.y = opt.yAxis;



    if(opt.spaceAround&&positions.some(pos=>{
      let d =  distance(new Point(this.x,this.y), new Point(pos.x,pos.y))
      return d<this.r*opt.padding
    })) {
      return false;
    }
    
    this.lw = 4;    
    this.angle = getRandomInt(0, 360)
    this.rad = (this.angle * Math.PI) / 180
    this.opacity = getRandomFloat(opt.minOpacity,1)
    this.petals = this.r <= 40 ? getRandomInt(3,9) : getRandomInt(MINPETAL,MAXPETAL)
    this.shiftOut = getRandomFloat(0,this.r/3)
    this.petalBase = getRandomInt(0,5);//getRandomInt(0,this.r<25?5:10)
    this.centerDivisor = getRandomFloat(3,9)
    this.petalSpread1 = getRandomFloat(.3,this.petals<=7?.7:.5)
    this.petalLength1 = getRandomFloat(.9,2)
    this.petalSpread2 = getRandomFloat(this.petalSpread1-.2,this.petalSpread1+.2);
    this.petalLength2 = getRandomFloat(.9,2)
    this.rotate = Math.floor(360/this.petals);
  }

  function getThemeColors(opt){
    let dPetal = new randomColor()
    let dPistil = new randomColor()
    if(!opt) return [dPistil, dPetal]
    if(opt.h) dPetal.h = opt.h + getRandomInt(-opt.vary,opt.vary)
    if(opt.s) dPetal.s = opt.s + getRandomInt(-opt.vary,opt.vary)
    if(opt.l) dPetal.l = opt.l + getRandomInt(-opt.vary,opt.vary)
    if(opt.h2) dPistil.h = opt.h2 + getRandomInt(-opt.vary,opt.vary)
    if(opt.s2) dPistil.s = opt.s2 + getRandomInt(-opt.vary,opt.vary)
    if(opt.l2) dPistil.l = opt.l2 + getRandomInt(-opt.vary,opt.vary)
    return [dPetal, dPistil]
  }
  

/*utility*/
function scaleCanvas(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
  //var width = Math.max(window.screen.width, window.innerWidth);
  //корректное вычисление ширины на мобилках(поправить на деске)
  var width = (window.screen.width / window.devicePixelRatio - window.screenTop)*2
  //console.log(`width:${width}`)

  console.log(`width:${w},height:${h}`)
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  var scale = 1;//window.devicePixelRatio;
  
  canvas.width = Math.floor(w * scale);
  canvas.height = Math.floor(h * scale);
  ctx.scale(scale, scale);
}
function distance(p1, p2) {
  return Math.floor(Math.sqrt(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y - p2.y,2)))      
}
function randomColor(minSat = 0, maxSat=100, minBright=0, maxBright=100){
  this.h = getRandomInt(0,360)
  this.s = getRandomInt(minSat,maxSat)
  this.l = getRandomInt(minBright,maxBright)
  this.hsl = ()=>{return`hsl(${this.h},${this.s}%,${this.l}%)`};
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function chance(limit = 0.5) {
  return Math.random() < limit;
}
function Point(x,y) {
  this.x = x
  this.y = y
}
})("");
