

export const draw = function(x,y,endPX,endPY,erase=true){
  
    if(erase){
      context.clearRect (0, 0, canvas.width, canvas.height);
    }
    
    drawLine(x,y,endPX,endPY);
   

    [startX,startY,endX,endY]=[x,y,endPX,endPY] 

    // here  alternate first squre of diff. then sum of these then sqrt 
    lineLength = Math.round(Math.hypot(endPX-x,endPY-y)) 
    if(lineType==LINE){
      context.fillText(lineLength,x,y);
    }
    else{
      
      [mousePrevious.x,mousePrevious.y] = [endPX,endPY];
      //save last mouse possition
      mouseCoordinate.push(Object.assign({},mousePrevious));
      //save length
      freeLineLength.push(lineLength);
    }
}
 
export const drawLine = (x,y,endPX,endPY)=>{
    context.beginPath();
    context.lineWidth=3;
    context.moveTo(x,y);
    context.lineTo(endPX,endPY);
    context.closePath();
    context.stroke();
}

export const moveLine = function(x,y,endPX,endPY,erase=true){
    // console.log(allLine)
    allLine.forEach((ele)=>{
      
      if(context.isPointInStroke(x,y)){
        context.strokeStyle='green'
        // context.stroke()
      }
      console.log(ele['startX'],x,y)
    });
}

export const countFreeLineLength=()=>{
  freeLineLength = freeLineLength.filter((ele)=>{return !isNaN(ele)});
  lineLength = freeLineLength.reduce((a,b)=>parseInt(a)+parseInt(b));
  return lineLength;
}
