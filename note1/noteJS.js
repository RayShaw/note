// 便签的增加按钮
var addNote = document.getElementById("addNote")

// 实例化一个数据库 数据表
var db = new LocalDB("db1", "notes")
db.open(function () {
    db.getAll(function (data) {
        var textareaItem = document.createElement("textarea")
        textareaItem.innerHTML = data.content

        var aItem = document.createElement("a")
        aItem.setAttribute("class", "close")
        aItem.innerHTML = "X"

        var divItem = document.createElement("div")
        divItem.setAttribute("class", "note")
        divItem.setAttribute("id", data.id)
        divItem.appendChild(aItem)
        divItem.appendChild(textareaItem)

        var list = document.getElementById("noteList")
        list.insertBefore(divItem, addNote)

        // aItem.onclick = function (e) {
        //     e.target.parentNode.remove()
        // }
        aItem.onclick = removeNote
        textareaItem.onblur = editNote

    })
})


addNote.onclick = function () {
    var list = document.getElementById("noteList")

    var textareaAdd = document.createElement("textarea")

    var aAdd = document.createElement("a")
    aAdd.setAttribute("class", "close")
    aAdd.innerHTML = "X"

    var divAdd = document.createElement("div")
    divAdd.setAttribute("class", "note")
    divAdd.appendChild(aAdd)
    divAdd.appendChild(textareaAdd)

    // list.appendChild(divAdd)

    list.insertBefore(divAdd, addNote)

    // aAdd.onclick = function (e) {
    //     e.target.parentNode.remove()
    // }

    aAdd.onclick = removeNote
    textareaAdd.onblur = editNote

    db.set({ content: "" }, function (id) {
        divAdd.setAttribute("id", id)
    })

}

function removeNote(e) {
    if (confirm("确认删除此便签嘛？")) {
        e.target.parentNode.remove()
        // 删除便签数据
        db.remove(e.target.parentNode.id)
    }
}

function editNote(e) {
    var data = {
        id: parseInt(e.target.parentNode.id),
        content: e.target.value
    }
    db.set(data)
}