!function () {

    var controller = {
        view: null,
        specialTags: null,
        liTags: null,
        init: function () {
            this.specialTags = document.querySelectorAll('[data-x]')
            this.liTags = document.querySelectorAll('.topNavBar nav > ul > li')
            this.initspecialTags()
            this.findClosest()
            this.bindEvents()
        },
        initspecialTags: function () {
            for (let i = 0; i < this.specialTags.length; i++) {
                this.specialTags[i].classList.add('offset')
            }
        },
        bindEvents: function () {
            window.addEventListener("scroll", function (event) {
                this.findClosest()
            }.bind(this))

            for (let i = 0; i < this.liTags.length; i++) {
                let li = this.liTags[i];
                li.onmouseenter = function (event) {
                    event.currentTarget.classList.add('active')
                }.bind(this)
                li.onmouseleave = function (event) {
                    event.currentTarget.classList.remove('active')
                }.bind(this)
            }
        },

        findClosest: function () {
            let minIndex = 0
            for (let i = 0; i < this.specialTags.length; i++) {
                let element = this.specialTags[i];
                if (Math.abs(this.specialTags[i].offsetTop - window.scrollY) < Math.abs(this.specialTags[minIndex].offsetTop - window.scrollY)) {
                    minIndex = i
                }
            }
            this.specialTags[minIndex].classList.remove('offset')
            let id = this.specialTags[minIndex].id
            let a = document.querySelector('a[href="#' + id + '"]')
            let li = a.parentNode
            let brothersAndMe = li.parentNode.children
            for (let i = 0; i < brothersAndMe.length; i++) {
                brothersAndMe[i].classList.remove('highlight')
            }
            li.classList.add('highlight')
        }
    }
    controller.init()


}()