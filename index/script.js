const div = document.getElementById('autoScrollDiv');
let leftPos = div.scrollLeft;

function autoScroll() {
    leftPos += 1;  // 这是滚动速度，你可以根据需要增加或减少
    div.scrollLeft = leftPos;

    // 当到达最右边，重新开始滚动
    if (leftPos >= div.scrollWidth - div.clientWidth) {
        leftPos = 0;
    }

    requestAnimationFrame(autoScroll);
}

autoScroll();
