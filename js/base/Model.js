

window.Model = function(options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            var APP_ID = 'R8Lvsxo6khmfl2fd0Pbdjsvb-gzGzoHsz';
            var APP_KEY = 'ObjMio334p1dkjWN8tzwAO4H';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        save: function (object) {
            var Obj = AV.Object.extend(resourceName);
            var obj = new Obj();
            return obj.save(object);
        }
    }
}