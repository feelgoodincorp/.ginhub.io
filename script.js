
(function () {

  //fields
  var canvas = document.getElementById("canvas");
  var body = document.getElementsByTagName("body")[0];
  var ctx = canvas.getContext("2d");
  const MINPETAL = 5
  const MAXPETAL = 13
  //второй petal, pistil чтоб переставлять цвета(?)
  var pistilC, petalC, pistilC2, petalC2

  //здесь задавать мод

  //сделать один максимально рандомный/миксовать существующие
  let mode = pick(["daisies", "quad", "roses", "blueYellow", "greenRed", "cornflowers", "whiteYellow"])    
  let bg = new randomColor(minSat=50)
  canvas.style.backgroundColor = bg.hsl()


  var colorz = {
    "experimental":{h2:35,s2:83,l2:93,h:225,s:90,l:40,vary:0,mix:true},
  }

  //assign colors
  let colorOpt = colorz["experimental"]
  let colors =  getThemeColors(colorOpt) /*pistil color at index 0, petal color at index 1*/
  
  scaleCanvas()
  //background color
  //здесь могут быть проблемы с шириной высотой на моб девайсах   
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  //не понятно
  body.style.filter = chance(.12)?`grayscale(${getRandomInt(0,80)}%)`:""

  //вызывать метод отрисовки в не зависимости от события устройства
  /*Initialize flowers*/
  body.addEventListener("click" ,function(ev){
    //console.log('touch called');
  //TODO
  //  определиться с принципами формирования цветов, их смешения и подбора фона, смешения модов(?можно рандомный мод ), выстроить структуру кода 
  //перед вызовом drawFlower - работа с экраном(скейлканвас),  описание модов, формирование opt
  //моды с миксом - обычные, рандомный для каждого цветка
  //мод состоит из: двух цветов, бг и размерности(boolean)
  //метод 
  //определить моды: одинаковые цвета, разные
  //попробовать добавить анимацию
  //убрать лишнее
  //на гитхаб
  //добавить вариативность размеров
  //фавикон, рандомную штуку какую то?или мод неприрывного рисования
  
  //очищает поле
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
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
      //по прежднему определяет микс
      invertColors: chance(.25),
      xAxis: event.clientX,
      yAxis: event.clientY
    }


        
    // if(opt.invertColors){
    //   petalC = colors[0].hsl()
    //   pistilC = colors[1].hsl()
    // } else { 
    //   petalC = colors[1].hsl()
    //   pistilC = colors[0].hsl()
    // }
    colors = getThemeColors(colorOpt)

    //console.log({colors})
    //console.log(opt.invertColors)


    // if(opt.invertColors){
    //   petalC2 = colors[0].hsl()
    //   pistilC2 = colors[1].hsl()
    // } else { 
    //   if(colorOpt&&colorOpt.mix){/*switching petals and pistil color*/
    //     petalC2 = colors[0].hsl()
    //     pistilC2 = colors[1].hsl()
    //   } else {
    //     petalC2 = colors[1].hsl()
    //     pistilC2 = colors[0].hsl()
    //   //}
    // }

        colors = getThemeColors(colorOpt)
        petalC = colors[1].hsl()
        pistilC = colors[0].hsl()
        petalC2 = colors[0].hsl()
        pistilC2 = colors[1].hsl()

    let numFlower = getRandomInt(40,250)
    for(let i=0; i<5; i++){
      
    }
    //console.log((mode));
    drawFlower(opt)


  })

  
  function drawFlower(opt) {
    //здесь переставляются цвета лепестков и центра
    //вынести в drawFlower(зачем?), разобраться с mix(поставить в условие colorOpt.mix), использовать chance(сейчас все зависит от булевой переменной)
    //в модах будет 
    if(opt.invertColors){/*switching petals and pistil color*/
        petalC2 = colors[0].hsl()
        pistilC2 = colors[1].hsl()
      } else {
        petalC2 = colors[1].hsl()
        pistilC2 = colors[0].hsl()
      //}
    }
    
    let f = new Flower(opt);
    if(!f) return false;
    ctx.save();
    ctx.globalAlpha = f.opacity
    ctx.lineWidth = f.lw;
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rad);
    ctx.translate(-f.x, -f.y);

    //закоментировал, т.к. уже есть переменная  max и if, который переставляет значения
    //ctx.fillStyle = chance()?petalC2:petalC
    ctx.fillStyle = petalC2
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
    
    //закрашивание центра
    ctx.strokeStyle = petalC;
    //закрашивание лепестков с возможностью однотонного (?)
    ctx.fillStyle = opt.mode!="crosshatch"&&opt.mode!="daisies" ? (chance()?pistilC2:pistilC) : pistilC;
    console.log("petalC " + petalC);
    console.log("pistilC " + pistilC2);
    console.log("pistilC " + pistilC);
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
  }

  function Flower(opt) {
   
    // this.r = opt.allowLarge && chance(.05)? getRandomInt(50,150) : getRandomInt(20,50)
    // this.x = getRandomInt(0, canvas.width)
    // this.y = getRandomInt(0, canvas.height)

    //включать, выключать большие(вынести в опции перед запуском)
    this.r = opt.allowLarge && chance(.05)? getRandomInt(50,150) : getRandomInt(20,50)

    this.x = opt.xAxis;
    this.y = opt.yAxis;

    
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
  var supportsTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
  console.log(`supportsTouch:${supportsTouch}`)
  console.log(`width:${width}`)
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
