var map = new Array(".b11",".b12",".b13",".b14",".b21",".b22",".b23",".b24",".b31",".b32",".b33",".b34",".b41",".b42",".b43",".b44");
var mapLeft = [
    [".b11",".b12",".b13",".b14"],
    [".b21",".b22",".b23",".b24"],
    [".b31",".b32",".b33",".b34"],
    [".b41",".b42",".b43",".b44"]
];
$(".gameBegin").click(function(){
    $("#main").toggle();
    $("#home").toggle();
    resetScore();
    if($(".gameKind2").css("display") == 'none') normalGameStart();
    else crazyGameStart();
})
var timer;
$(".homeTool").click(function(){
    $("#main").toggle();
    $("#home").toggle();
    clearInterval(timer);
})
/*
$(".box").text("2048");
$(".b11").text("2");
$(".box").css("background-color","#D5CDC2");
console.log($(".b11").attr("class"));
if($(".b11").text() == 2)
    $(".b11").css("color","white");
*/

// 改变对应的颜色
function changeColor(){
    for(var i=0;i<map.length;i++)
        if($(map[i]).text() == ' ')
            $(map[i]).css("background-color","#D5CDC2");
        else if($(map[i]).text()==2)
            $(map[i]).css({"background-color":"#ECE4D9","color":"#766E63"});
        else if($(map[i]).text()==4)
            $(map[i]).css({"background-color":"#ECE0C6","color":"#766E63"});
        else if($(map[i]).text()==8)
            $(map[i]).css({"background-color":"#F2B179","color":"white"});
        else if($(map[i]).text()==16)
            $(map[i]).css({"background-color":"#F59562","color":"white"});
        else if($(map[i]).text()==32)
            $(map[i]).css({"background-color":"#F57C5F","color":"white"});
        else if($(map[i]).text()==64)
            $(map[i]).css({"background-color":"#F45E39","color":"white"});
        else
            $(map[i]).css({"background-color":"#ECCF71","color":"white"});
}

function normalGameStart(){
    for(var i=0;i<map.length;i++)
        $(map[i]).text(" ");
    var n1 = parseInt(Math.random()*map.length);
    var n2 = parseInt(Math.random()*map.length);
    while(n1 == n2)          /* 防止n1，n2相同 */
        n2 = parseInt(Math.random()*map.length); 
    $(map[n1]).text("2");
    $(map[n2]).text("2");
    //$(map[0]).text($(map[n2]).text());
    changeColor();
}

function crazyGameStart(){
    normalGameStart();
    var crazySpeed = 1500;      // 疯狂速度
    timer = setInterval(function(){
        var nmap = updateMap();
        var n = parseInt(Math.random()*nmap.length);
        $(nmap[n]).text(2);
        $(nmap[n]).css("animation","addnew 0.25s");
        setTimeout(function() {
            $(nmap[n]).css("animation","donothing 0.01s");
        }, 300);
        changeColor();
    },crazySpeed)
}

// 更新地图
function updateMap(){
    var newmap = new Array();
    for(var i=0;i<16;i++)
        if($(map[i]).text() == ' ')
            newmap.unshift(map[i]);
    return newmap;
}

// 还原特效
function later(name){
    setTimeout(function() {
        $(name).css("animation","donothing 0.01s")
    }, 300);
}

// 改变模式
$(".buttonLeft").click(function(){
    $(".gameKind1").toggle();
    $(".gameKind2").toggle();
})
$(".buttonRight").click(function(){
    $(".gameKind1").toggle();
    $(".gameKind2").toggle();
})

// 随机生成数字2 / 4
function addNumber(){
    var nmap = updateMap();
    var m=[2,4];
    var i = parseInt(Math.random()*10);
    if(i<=8) i=2;
    else i=4;
    var n = parseInt(Math.random()*nmap.length);
    $(nmap[n]).text(i);
    $(nmap[n]).css("animation","addnew 0.25s");
    setTimeout(function() {
        $(nmap[n]).css("animation","donothing 0.01s");
    }, 300);
    changeColor();
}

// 分数相关
function scoreDisplay(n){
    $(".scoreInform").text(n);
}

function resetScore(){
    score = 0;
    scoreDisplay(score);
}

function numberMove(n){
    /*  
        a 1 to left
        w 2 to up
        d 3 to right
        s 4 to down    
    */
    // 排列（去掉空格）
    if(n == 1){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                if($(mapLeft[i][j]).text() == ' ')
                    for(var n=j+1;n<4;n++)
                        if($(mapLeft[i][n]).text() != ' '){
                            $(mapLeft[i][j]).text($(mapLeft[i][n]).text());
                            $(mapLeft[i][n]).text(' ');
                            break;
                        }
    }
    else if(n == 2){          
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                if($(mapLeft[j][i]).text() == ' ')
                    for(var n=j+1;n<4;n++)
                        if($(mapLeft[n][i]).text() != ' '){
                            $(mapLeft[j][i]).text($(mapLeft[n][i]).text());
                            $(mapLeft[n][i]).text(' ');
                            break;
                        }
    }
    else if(n == 3){              
        for(var i=0;i<4;i++)
            for(var j=3;j>=0;j--)
                if($(mapLeft[i][j]).text() == ' ')
                    for(var n=j-1;n>=0;n--)
                        if($(mapLeft[i][n]).text() != ' '){
                            $(mapLeft[i][j]).text($(mapLeft[i][n]).text());
                            $(mapLeft[i][n]).text(' ');
                            break;
                        }
    }
    else if(n == 4){
        for(var i=0;i<4;i++)
            for(var j=3;j>=0;j--)
                if($(mapLeft[j][i]).text() == ' ')
                    for(var n=j-1;n>=0;n--)
                        if($(mapLeft[n][i]).text() != ' '){
                            $(mapLeft[j][i]).text($(mapLeft[n][i]).text());
                            $(mapLeft[n][i]).text(' ');
                            break;
                        }
    }
}

function judge(direct){
    if(direct == 1){
        for(var i=0;i<4;i++){
            for(var j=0;j<3;j++){
                if($(mapLeft[i][j]).text() == $(mapLeft[i][j+1]).text()&&$(mapLeft[i][j]).text() != ' '){
                    var m = parseInt($(mapLeft[i][j]).text());
                    m *= 2;score+=m;
                    $(mapLeft[i][j]).text(m);
                    $(mapLeft[i][j]).css("animation","turnnew 0.3s");
                    later(mapLeft[i][j]);
                    $(mapLeft[i][j+1]).text(' ');
                }
            }
        }
        numberMove(1);
    }
    else if(direct == 2){     
        for(var i=0;i<4;i++){
            for(var j=0;j<3;j++){
                if($(mapLeft[j][i]).text() == $(mapLeft[j+1][i]).text()&&$(mapLeft[j][i]).text() != ' '){
                    var m = parseInt($(mapLeft[j][i]).text());
                    m *= 2;score+=m;
                    $(mapLeft[j][i]).text(m);
                    $(mapLeft[j][i]).css("animation","turnnew 0.3s"); 
                    later(mapLeft[j][i]);
                    $(mapLeft[j+1][i]).text(' ');
                }
            }
        }
        numberMove(2);
    }
    else if(direct == 3){              
        for(var i=0;i<4;i++){
            for(var j=3;j>0;j--){
                if($(mapLeft[i][j]).text() == $(mapLeft[i][j-1]).text()&&$(mapLeft[i][j]).text() != ' '){
                    var m = parseInt($(mapLeft[i][j]).text());
                    m *= 2;score+=m;
                    $(mapLeft[i][j]).text(m);
                    $(mapLeft[i][j]).css("animation","turnnew 0.3s");
                    later(mapLeft[i][j]);
                    $(mapLeft[i][j-1]).text(' ');
                }
            }
        }
        numberMove(3);
    }
    else if(direct == 4){
        for(var i=0;i<4;i++){
            for(var j=3;j>0;j--){
                if($(mapLeft[j][i]).text() == $(mapLeft[j-1][i]).text()&&$(mapLeft[j][i]).text() != ' '){
                    var m = parseInt($(mapLeft[j][i]).text());
                    m *= 2;score+=m;
                    $(mapLeft[j][i]).text(m);
                    $(mapLeft[j][i]).css("animation","turnnew 0.3s");
                    later(mapLeft[j][i]);
                    $(mapLeft[j-1][i]).text(' ');
                }
            }
        }
        numberMove(4);
    }
    /*$(mapLeft[i][j]).css("animation","turnnew 0.3s");
    setTimeout(function() {
        $(mapLeft[i][j]).css("animation","donothing 0.01s")
    }, 300);*/
    scoreDisplay(score);
}

function moveChange(n){
    numberMove(n);
    judge(n);
    addNumber();
}

// 判断游戏结束
function gameOver(){

}

// 实现WASD操作
$(document).keypress(function(event){
    var keycode = event.keyCode;
    // console.log(keycode);
    if($("#home").css("display")=='block'){
        if(keycode == '97'){
            //alert('You pressed a left key in somewhere');
            /*
            for(var i=0;i<4;i++){
                    if($(mapLeft[i][0]).text() == $(mapLeft[i][1]).text()){
                        var n = $(mapLeft[i][0]).text();
                        $(mapLeft[i][0]).text();
                    }
            }*/
            moveChange(1);
        }
        else if(keycode == '119'){
            //alert('You pressed a up key in somewhere'); 
            moveChange(2);
        }
        else if(keycode == '100'){
            //alert('You pressed a right key in somewhere'); 
            moveChange(3);
        }
        else if(keycode == '115'){
            //alert('You pressed a down key in somewhere'); 
            moveChange(4);
        }
    }
    else if($("#home").css("display")!='block'){
        if(keycode == 13){
            $("#main").slideToggle(600);
            $("#home").slideToggle(800);
            resetScore();
            gameStart();
        }
    }
}); 

// 实现鼠标拖动
var x1,y1;
var x2,y2;
$("#home").mousedown(function(ev){
    x1 = ev.pageX;
    y1 = ev.pageY;
});
$("#home").mouseup(function(ev){
    x2 = ev.pageX;
    y2 = ev.pageY;
    if(Math.abs(y2-y1)>Math.abs(x2-x1)){  //Up or down
        if(y2>y1)   //down
            moveChange(4);
        else        //up
            moveChange(2);
    }
    else if(Math.abs(y2-y1)<Math.abs(x2-x1)){
        if(x2>x1)   //right
            moveChange(3);
        else        //left
            moveChange(1);
    }
});

//手机触屏移动相关
var map11 = document.getElementById("map")
var nStartX,nStartY,
    nChangX,nChangY;

document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
map11.addEventListener('touchstart',function(e){
    nStartY = e.targetTouches[0].pageY;
    nStartX = e.targetTouches[0].pageX;
});
map11.addEventListener('touchend',function(e){
    event.preventDefault();
    nChangY = e.changedTouches[0].pageY;
    nChangX = e.changedTouches[0].pageX;
    if(Math.abs(nChangX-nStartX)>Math.abs(nChangY-nStartY)){        // left or right
        if(nChangX>nStartX)     // right
            moveChange(3);
        else                    // left
            moveChange(1);
    }
    else if(Math.abs(nChangX-nStartX)<Math.abs(nChangY-nStartY)){   // up or down
        if(nChangY>nStartY)     // down
            moveChange(4);
        else                    // up
            moveChange(2);
    }
});