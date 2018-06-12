
!function () {

    var model = Model({resourceName:'Message'})

    var view = View('section.message')

    var controller = Controller({
        messageList: null,
        form: null,
        init: function(view, model) {
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessage()
        },
        loadMessage: function(){
            this.model.fetch().then((message) => {
                let array = message.map((item)=> item.attributes)
                array.forEach(item => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                });
            })
        },
        bindEvents: function(){
            this.form.addEventListener('submit', (event)=> {
                event.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save({'name':name, 'content':content}).then((data)=>{
                let li = document.createElement('li')
                li.innerText = `${data.attributes.name}: ${data.attributes.content}`
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
            })
        }

    })

    controller.init(view, model)
}()