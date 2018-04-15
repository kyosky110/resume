
// setTimeout(() => {
    siteWelcome.classList.remove('active')
// }, 1000);

// 添加 offset 类
let specialTags = document.querySelectorAll('[data-x]')
for(let i =0;i<specialTags.length; i++){
  specialTags[i].classList.add('offset')
}

findClosest()
window.onscroll = function (event) {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()
}


function findClosest() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for (let i = 0; i < specialTags.length; i++) {
        let element = specialTags[i];
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for (let i = 0; i < brothersAndMe.length; i++) {
        brothersAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')

}


let liTags = document.querySelectorAll('.topNavBar nav > ul > li')
for (let i = 0; i < liTags.length; i++) {
    let li = liTags[i];
    li.onmouseenter = function (event) {
        event.currentTarget.classList.add('active')
    }
    li.onmouseleave = function (event) {
        event.currentTarget.classList.remove('active')
    }
}

let aTags = document.querySelectorAll('.topNavBar nav li a')

// Setup the animation loop.
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (event) {
        event.preventDefault()
        let a = event.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop

        let currentTop = window.scrollY
        let targetTop = top - 80
        let s = targetTop - currentTop
        let t = Math.abs((s / 100) * 300)
        if (t > 500) { t = 500 }
        let coords = { y: currentTop }; // Start at (0, 0)
        let tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({ y: targetTop }, t) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Cubic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                window.scrollTo(0, coords.y)
            })
            .start(); // Start the tween immediately.
    }

}
