const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let startX,startY,endX,endY;

let minusX=canvas.offsetLeft;
let minusY=canvas.offsetTop;

const DRAW = 'draw';
const ERASE = 'erase'; 
let status=ERASE;


// For Drawing Line on Canvas 
const drawLine = function(x,y,endPX,endPY,erase=true){
  
  if(erase){
    console.log(erase)
    context.clearRect (0, 0, canvas.width, canvas.height);
  }
  context.beginPath();
  context.lineWidth=3;
  context.moveTo(x,y);
  context.lineTo(endPX,endPY);
  context.stroke();
  context.closePath();
  [startX,startY,endX,endY]=[x,y,endPX,endPY] 
  status=DRAW;
}

$(document).ready(function(){
    
    $('canvas').mousedown(function(e){

      [startX,startY]=[e.pageX-minusX,e.pageY-minusY]

      $(this).bind('mousemove', function(e){
          drawLine(startX, startY, e.pageX-minusX, e.pageY-minusY);
      });
    });

    $('canvas').mouseup(function(){
          $(this).unbind('mousemove');
          console.log('try',startX,startY,endX,endY);   
    });

    $('canvas').mouseout(function(){
      $(this).unbind('mousemove');
    });
  
});

// Manage Button


//Erase Lines
const erase = function(){
  context.clearRect (0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.closePath();
  status = ERASE;
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
  
  let coordinates = {'startX':startX,'startY':startY,'endX':endX,'endY':endY}

  if (status==DRAW){
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
      for(data of result['coordinate'])
      {
        drawLine(data['startX'],data['startY'],data['endX'],data['endY'],false);
      }
    }
  });
});