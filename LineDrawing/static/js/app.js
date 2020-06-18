import {draw,moveLine} from './draw.js';
import {foo,erase,init} from './doAjax.js';



const moveMoveFunc = function(e){

  let [cx,cy ]= [e.pageX-minusX, e.pageY-minusY];

  if(isMove==MOVE){
    moveLine(startX, startY,cx, cy);
  }else{

    if(lineType == LINE){
      draw(startX, startY, cx, cy);
    }else{
      draw(mousePrevious.x, mousePrevious.y,cx, cy,false);
    }
    isDraw=DRAW;
    
  }
}

$(document).ready(function(){
    
    $('canvas').mousedown(function(e){
      
      init();
      [startX,startY]=[e.pageX-minusX,e.pageY-minusY]

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

//Manage button
foo();
