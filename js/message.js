

// 声明一个 Todo 类型
// var Message = AV.Object.extend('Message');
// 新建一个 Todo 对象
//  var message = new Message();
//  message.set('content', '每周工程师会议，周一下午2点');
//  message.set('name','xxx')
//  message.save().then(function (message) {
//    // 成功保存之后，执行其他逻辑.
//    console.log('New object created with objectId: ' + message.content);
//  }, function (error) {
//    // 异常处理
//    console.error('Failed to create new object, with error message: ' + error.message);
//  });

// var query = new AV.Query('Message');
// query.find().then(function (results) {
//     console.log(results)
// }, function (error) {
// });

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

    var view = document.querySelector('section.message')

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