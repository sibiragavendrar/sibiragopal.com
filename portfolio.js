var cursor = document.querySelector ('.cursor'),
    mouseX=0,
    mosueY=0

gsap.to({}, 0.016, {
    repeat=-1

    onRepeat: function () {

        gsap.set(cursor,{
            css: {
                left:mouseX,
                top:mosueY
            }
        })
    }
})

window.addEventListener('mousemove', function(e){
    mouseX=e.clientX;
    mosueY=e.clientY
})