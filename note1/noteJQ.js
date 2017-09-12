
var divstr = '<div class="note"><a class="close">X</a><textarea></textarea></div>'

var db = new LocalDB("db1", "notes")

db.open(function () {
    db.getAll(function (data) {
        var div = $(divstr)
        div.data("id", data.id)
        div.find("textarea").val(data.content)
        div.insertBefore(add)
    })
})

var add = $("#addNote").on("click", function () {
    var div = $(divstr)
    div.insertBefore(add)
    db.set({ content: "" }, function (id) {
        div.data("id", id)
    })
})

$("#noteList")
    .on("blur", "textarea", function () {
        var div = $(this).parent()
        var data = {
            id: div.data("id"),
            content: $(this).val()
        }
        db.set(data)
    })
    .on("click", ".close", function () {
        if (confirm("确定删除此便签")) {
            var div = $(this).parent()

            db.remove(div.data("id"))
            div.remove()

        }
    })