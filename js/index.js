FastClick.attach(document.body);

//->动态设定REM的根植
~function (desW) {
    var winW = document.documentElement.clientWidth;
    console.log(winW);
    if (winW > desW) {
        var oMain = document.querySelector(".swiper-container");
        console.log(oMain);
        oMain.style.margin = "0 auto";
        oMain.style.width = desW + "px";
        return;
    }
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);

//->初始化Swiper
new Swiper(".swiper-container", {
    direction: "vertical",
    loop: true,
    onSlideChangeEnd: function (swipe) {
        var n = swipe.activeIndex,
            slideAry = swipe.slides;
        [].forEach.call(slideAry, function (item, index) {
            if (index == n) {
                item.id = index == 3 || index == 4 ? "page1" : "page2";
                return;
            }
            item.id = null;
        });
    }
});


//->音频自动播放

var music = document.getElementById("music"),
    musicAudio = document.getElementById("musicAudio");
window.setTimeout(function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
    }, false);
}, 1000);
music.addEventListener("click", function () {
    if (musicAudio.paused) {
        musicAudio.play();
        music.className = "music musicMove";
        return;
    }
    musicAudio.pause();
    music.className = "music";
}, false);

