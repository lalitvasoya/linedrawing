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

const FREELINE = 'free-line';
const LINE  = 'line';
let lineType = LINE;

let mousePrevious = {
    x:undefined,
    y:undefined
};

let mouseCoordinate = [];
let freeLineLength  = [0,0];