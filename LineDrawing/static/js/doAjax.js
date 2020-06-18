import {draw, drawLine, countFreeLineLength} from './draw.js';

export const init = ()=>{
  context.clearRect (0, 0, canvas.width, canvas.height);
  [mousePrevious.x,mousePrevious.y] = [undefined,undefined];
  mouseCoordinate=[];
  freeLineLength = [0,0];
}

//Erase Lines
export const erase = function(){
  // init();
  context.clearRect (0, 0, canvas.width, canvas.height);
  isDraw = ERASE;
  isMove = DRAW;
}

export function foo(){

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
  let data;

  //Getting Last Lines Axes and Draw Line
  $('#last').on('click',function(){
    $.ajax({
      url:'/getlines',
      type:'GET',
      data:{'which':'last'},
      dataType:'json',
      success:function(result){
        data =result['coordinate']
        draw(data['startX'],data['startY'],data['endX'],data['endY']);
      }
    });
  });


  //Getting All Lines Axes and Draw Lines
  function reDrawLine(result){

    context.clearRect(0,0,canvas.width,canvas.height);
    allLine.push(...result['coordinate']);
    console.log(allLine);
    for(data of result['coordinate'])
    {
      draw(data['startX'],data['startY'],data['endX'],data['endY'],false);
    }
    isMove = MOVE; 

  }
  // do ajax for getting all line
  $('#all').on('click',function(){
    $.ajax({
      url:"/getlines",
      type:'GET',
      data:{'which':'all'},
      dataType:'json',
      success:function(result){
        reDrawLine(result)
      },
      error:()=>{alert('first draw')},
    });
  });

 

  $(`input[value='${lineType}']`).attr("checked", "checked");

  $("input[name='line-type']").on('change',function(e){
    if($(this).val()==FREELINE){
      lineType = FREELINE;
      canvas.style.cursor = 'copy';
    }else{
      lineType = LINE;
      canvas.style.cursor = 'crosshair';
    }
  });


  //free Line

  $('#get-last-free-line').on('click',function(e){
    context.clearRect (0, 0, canvas.width, canvas.height);
    for(let i=0;i<mouseCoordinate.length-2;i++){
      let {x,y} = mouseCoordinate[i];
      let {x:nx,y:ny} = mouseCoordinate[(i+1)]; 
      drawLine(x,y,nx,ny);
    }
    alert(countFreeLineLength());  
  });

  
}

