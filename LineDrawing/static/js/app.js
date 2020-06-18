const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let startX,startY,endX,endY;

let minusX=canvas.offsetLeft;
let minusY=canvas.offsetTop;
let lineLength;

const DRAW = 'draw';
const ERASE = 'erase'; 
const MOVE = 'move';

let isDraw=ERASE; // for check line is drawed or not 
let isMove=DRAW; // for line moving

let allLine = [];

// For Drawing Line on Canvas 
const drawLine = function(x,y,endPX,endPY,erase=true){
  
  if(erase){
    context.clearRect (0, 0, canvas.width, canvas.height);
  }
  context.beginPath();
  context.lineWidth=3;
  context.moveTo(x,y);
  context.lineTo(endPX,endPY);
  context.stroke();
  context.closePath();
  [startX,startY,endX,endY]=[x,y,endPX,endPY] 
  // here  alternate first squre of diff. then sum of these then sqrt 
  lineLength = Math.round(Math.hypot(endPX-x,endPY-y)) 
  context.fillText(lineLength,x,y);
  
}

const moveiLine = function(x,y,endPX,endPY,erase=true){
  // console.log(allLine)
  allLine.forEach((ele)=>{
    
    if(context.isPointInStroke(x,y)){
      context.strokeStyle='green'
      // context.stroke()
    }
    console.log(ele['startX'],x,y)
  });
}

const moveMoveFunc = function(e){
  if(isMove==MOVE){
    moveiLine(startX, startY, e.pageX-minusX, e.pageY-minusY);
  }else{
    drawLine(startX, startY, e.pageX-minusX, e.pageY-minusY);
    isDraw=DRAW;
  }
}
$(document).ready(function(){
    
    $('canvas').mousedown(function(e){

      [startX,startY]=[e.pageX-minusX,e.pageY-minusY]
      console.log(startX,startY)
     
      $(this).bind('mousemove', moveMoveFunc);
    });

    $('canvas').mouseup(function(){
          $(this).unbind('mousemove');
          // console.log('try',startX,startY,endX,endY);   
    });

    $('canvas').mouseout(function(){
      $(this).unbind('mousemove',moveMoveFunc);
    });
  
});

// Manage Button


//Erase Lines
const erase = function(){
  context.clearRect (0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.closePath();
  isDraw = ERASE;
  isMove = DRAW;
}

//Clear all LINE in DB
$('#clear').on('click',function(){

  $.ajax({
    url:'/clear',
    type:'GET',
    data:'',
    dataType:'json',
    success:function(result){
      alert(result['data'])
    }
  });
  erase();
});

//Erase Lines
$('#erase').on('click',function(){
  erase();
});

//Save Lines Axis in DB
$('#save').on('click',function(){
  let coordinates = {'startX':startX,'startY':startY,'endX':endX,'endY':endY,'length':lineLength}

  if (isDraw==DRAW){
    $.ajax({
      url:'/save',
      type:'GET',
      data:{'coordinate':JSON.stringify(coordinates)},
      dataType:'json',
      success:function(result){
        alert(result['data'])
      }
    });
  }else{
    alert('First Draw Line')
  }
  erase();
});

//Getting Last Lines Axes and Draw Line
$('#last').on('click',function(){
  $.ajax({
    url:'/getlines',
    type:'GET',
    data:{'which':'last'},
    dataType:'json',
    success:function(result){
      data =result['coordinate']
      drawLine(data['startX'],data['startY'],data['endX'],data['endY']);
    }
  });
});


//Getting All Lines Axes and Draw Lines
$('#all').on('click',function(){
  $.ajax({
    url:"/getlines",
    type:'GET',
    data:{'which':'all'},
    dataType:'json',
    success:function(result){

      context.clearRect(0,0,canvas.width,canvas.height);
      allLine.push(...result['coordinate']);
      console.log(allLine);
      for(data of result['coordinate'])
      {
        drawLine(data['startX'],data['startY'],data['endX'],data['endY'],false);
      }
      isMove = MOVE; 

    },
    error:()=>{alert('first draw')},
  });
});