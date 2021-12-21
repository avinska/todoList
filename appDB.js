const express = require("express"); //require modul express & body-parser)
const bodyparser = require("body-parser");
const mongoose = require('mongoose')
const _ = require('lodash');


const app = express();

app.set("view engine", "ejs"); //to use module EJS, have to be placed after app is defined
app.use(bodyparser.urlencoded({ extended: true })); //buat pake bodyparser
app.use(express.static("public")); //make a directory accessible to public

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/todolistDB')
}

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemsSchema)

const defaultItems = [{
    name: 'Welcome to your to do list'
}, {
    name: 'Hit the + button to create a new item'
}, {
    name: '<-- Hit to delete an item'
}, ]

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

const List = mongoose.model('List', listSchema)

app.get("/", async (req, res) => {
    const foundItems = await Item.find({})
    if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
            .then(console.log('succesfully saved new items to DB'))
            .catch(err => console.log(err.errors))
        res.redirect('/')
    } else {
        res.render("list", { listTitle: 'Today', newListItems: foundItems })
    }
})

app.post("/", async (req, res) => {
    const listName = req.body.list
    const item = new Item({
        name: req.body.newItem
    })
    if (listName === 'Today') {
        await item.save()
        res.redirect('/')
    } else {
        const foundList = await List.findOne({ name: listName })
        foundList.items.push(item)
        foundList.save()
        res.redirect(`/${listName}`)
    }
})

app.get("/:parameter", async (req, res) => {
    const parameter = _.capitalize(req.params.parameter)
    const foundList = await List.findOne({ name: parameter })
    if (!foundList) {
        const list = await new List({
            name: parameter,
            items: defaultItems
        })
        await list.save()
        res.redirect(`/${parameter}`)
    } else {
        res.render("list", { listTitle: parameter, newListItems: foundList.items });
    }
})


app.post("/delete", async (req, res) => {
    const listName = req.body.listName
    if (listName === 'Today') {
        await Item.findByIdAndRemove(req.body.checkbox)
        res.redirect('/')
    } else {
        const updatedList = await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: req.body.checkbox } } })
        res.redirect(`/${listName}`)
    }
})

app.listen(3000, () => {
    console.log("server started running on port 3000")
})