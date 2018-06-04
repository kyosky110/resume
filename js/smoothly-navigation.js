!function () {

    var view = document.querySelector('#topNavBar')

    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimate()
            this.bindEvents()
        },
        initAnimate: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        bindEvents: function () {
            this.aTags = this.view.querySelectorAll('.topNavBar-inner nav li a')
            for (let i = 0; i < this.aTags.length; i++) {
                this.aTags[i].onclick = function (event) {
                    event.preventDefault()
                    let a = event.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)

                    this.scrollToElement(element)
                }.bind(this)
            }
        },
        scrollToElement: function (element) {
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

    controller.init(view)
}()