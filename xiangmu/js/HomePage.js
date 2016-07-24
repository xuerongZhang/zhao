//搜索框
var search = document.getElementById("search");
var searchList = document.getElementById("searchList");

var liList = searchList.getElementsByTagName("li");
for (var i = 0; i < liList.length; i++) {
    liList[i].onmouseenter = function () {
        this.className = "hover";
    };
    liList[i].onmouseleave = function () {
        this.className = null;
    };
}

search.onkeyup = function () {
    var val = this.value.replace(/(^ +| +$)/g, "");
    searchList.style.display = val === "" ? "none" : "block";
};

document.body.onclick = function (e) {
    e = e || window.event;
    var curEle = e.target || e.srcElement;
    if (curEle.id === "search") {
        search.onkeyup.call(curEle);
    } else if (curEle.tagName.toLowerCase() === "li" && curEle.parentNode === searchList) {
        search.value = curEle.innerHTML;
        searchList.style.display = "none";
    } else if (curEle.id === "searchList") {

    } else {
        searchList.style.display = "none";
    }
};

/*----*/


vvg.slider.init('focus_pic',/**包裹图片的UL的ID**/ {
    v: 0,//1表示垂直上下移动幻灯片    0表示左右移动幻灯片
    height: 220,//幻灯片高度
    width: 440,//幻灯片宽度
    btnId: "focus_btn",//幻灯片按钮的ID
    autoTime: 1000//自动播放间隔时间
});


/*选项卡*/

var oBox=document.getElementById('tab2');
var aLi=oBox.getElementsByTagName('li');
for(var i=0;i<aLi.length; i++){
    tab(aLi[i]);
}

var oBox1=document.getElementById('tab3');
var aLi1=oBox1.getElementsByTagName('li');
for(var j=0;j<aLi1.length; j++){
    tab(aLi1[j]);
}
var oBox1=document.getElementById('tab4');
var aLi2=oBox1.getElementsByTagName('li');
for(var j=0;j<aLi2.length; j++){
    tab(aLi2[j]);
}
/*封装*/
function tab(oEle){//aLi[0]
    var aInput=oEle.getElementsByTagName('input');
    var aDiv=oEle.getElementsByTagName('div');
    for(var i=0; i<aInput.length; i++){
        (function(index){
            aInput[index].onclick=function(){
                // alert(index)
                for(var i=0; i<aInput.length; i++){
                    aInput[i].className='';
                    aDiv[i].className='';
                }
                aDiv[index].className='show';
            }
        })(i);
    }
}
/*---鼠标事件---*/

var v1=document.getElementById("v1");
var v2=document.getElementById("v2");

function kk(a,b){

    b.onmouseover=function(){
        a.style.display="block"
    };
    b.onmouseout=function(){
        a.style.display="none"
    }
}
var u = kk(v2,v1);

