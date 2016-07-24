var vvg = {};
var getId = function (id) {
    return document.getElementById(id);
};
var getChild = function (child, parent) {
    return parent.getElementsByTagName(child);
};
vvg.slider = function () {
    return {
        init: function (id, oo) {
            var warper = this.warper = getId(id);//获取包裹图片DOM(第一个UL的ID)
            var warpLis = getChild("li", warper);//获取包裹下的LI子元素
            var liNo = this.no = warpLis.length;//获取包裹LI元素的个数
            var height = this.height = oo.height || warpLis[0].offsetHeight; //获取图片高度
            var width = this.width = oo.width || warpLis[0].offsetWidth; //获取图片宽度
            this.index = 0;//自动播放从第几个开始
            this.autoTime = oo.autoTime || 5000;   //自动播放间隔时间
            this.btnId = oo.btnId || "focus_btn"; //图片上面的按钮的ID
            this.v = oo.v || 0;    //垂直移动OR水平移动
            warper.parentNode.style.width = this.width + "px";//按照指定的宽度设置父标签的宽度
            warper.parentNode.style.height = this.height + "px";//设置父标签的高度
            if (!!this.v) {//判断时候是垂直播放，设置相应的宽度
                warper.style.width = width + "px";
            } else {
                warper.style.width = width * liNo + "px";
            }
            this.makeBtn(liNo, this.btnId);//调用makeBtn生成数字按钮，focus_btn 为按钮UL的ID，可以用这个ID设置小按钮的CSS样式
            this.btnLis = document.getElementById(this.btnId).getElementsByTagName("li"); //获得生成的按钮LI NODELIST
            this.btnLis[0].className = "on";//按钮初始化CLASS
            this.autoPlay();//自动播放
            this.btnHover();//按钮效果
        },
        makeBtn: function (no, c) {//生成按钮 no表示个数 C表示UL的ID
            var btnUl = document.createElement("ul");
            btnUl.id = c;
            var strLi = "";
            for (var i = 0; i < no; i++) {
                strLi = strLi + "<li> </li>";
            }
            btnUl.innerHTML = strLi;
            this.warper.parentNode.appendChild(btnUl);//添加到父div下
        },
        autoPlay: function () {//自动播放
            this.moveIndex(this.index);
            for (var i = 0; i < this.no; i++) {
                this.btnLis[i].className = "";
            }
            this.btnLis[this.index].className = "on";//设置当前Btn的CLASS
        },
        moveIndex: function (index) {//传递需要移动的INDEX索引值
            var posx = this.v ? 0 : -index * this.width; //计算需要移动的LEFT位置
            var posy = this.v ? -index * this.height : 0;//计算需要移动的TOP位置
            this.Timer = setInterval(function () {
                vvg.slider.moveTo(posx, posy);
            }, 10); //间歇调用MOVETO 移动到目标位置
        },
        moveTo: function (posx, posy) {//移动
            var left = parseInt(this.warper.style.left, 10);
            var top = parseInt(this.warper.style.top, 10);
            if (left == posx && top == posy) {//当移动到目标位置时
                clearInterval(this.Timer); //清除间歇调用
                this.index++; //index加1
                if (this.index == this.no) {//到达最后后设置INDEX为0
                    this.index = 0;
                }
                this.autoTimer = setTimeout(function () {
                    vvg.slider.autoPlay();
                }, this.autoTime);//开始播放下一个图片
                return false;
            }
            left = left > posx ? left - Math.ceil((left - posx) / 10) : left + Math.ceil((posx - left) / 10);//当目标位置大于当前位置的时候，一次移动LEFT坐标
            top = top > posy ? top - Math.ceil((top - posy) / 10) : top + Math.ceil((posy - top) / 10); //同上
            this.warper.style.left = left + "px";
            this.warper.style.top = top + "px";
        },
        btnHover: function () {//设置按钮的鼠标事件
            for (var i = 0; i < this.no; i++) {
                this.btnLis[i].onclick = function (t) {
                    return function () {
                        if (vvg.slider.autoTimer) {
                            clearInterval(vvg.slider.autoTimer)
                        }
                        //清除播放
                        if (vvg.slider.Timer) {
                            clearInterval(vvg.slider.Timer)
                        }

                        vvg.slider.index = t;
                        vvg.slider.autoPlay();//移动到this.index
                    }
                }(i)
            }
        }
    }
}();



