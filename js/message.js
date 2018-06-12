
!function () {
    var model = {
        init: function () {
            var APP_ID = 'R8Lvsxo6khmfl2fd0Pbdjsvb-gzGzoHsz';
            var APP_KEY = 'ObjMio334p1dkjWN8tzwAO4H';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            message.set('name', name)
            message.set('content', content);
            return message.save();
        }
    }

    var view = View('section.message')

    var controller = {
        view: null,
        model: null,
        messageList: null,
        form:null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessage()
            this.bindEvents()
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
            this.model.save(name, content).then((data)=>{
                let li = document.createElement('li')
                li.innerText = `${data.attributes.name}: ${data.attributes.content}`
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
            })
        }
    }
    model.init()
    controller.init(view, model)
}()