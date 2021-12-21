const express = require("express"); //require modul express & body-parser)
const bodyparser = require("body-parser");
const date = require(`${__dirname}/date.js`);

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs"); //to use module EJS, have to be placed after app is defined

app.use(bodyparser.urlencoded({ extended: true })); //buat pake bodyparser
app.use(express.static("public")); //make a directory accessible to public

app.get("/", function(req, res) { //untuk ??
    let day = date.getDate();
    res.render("list", { listTitle: day, newListItem: items }) //res.render("namafileejs", {var.difileejs: var.disini})

    /*  if (today.getDay() === 6 || today.getDay() === 0) { //today.getDay() buat convert hari jd 0-6, 0 is sunday
        res.send("its the weekend") //res.send buat ngirim one piece of data, misal cm paragraph, atau headings.
      } else if (today.getDay() === 5){
        res.write("woo hooo"); //bisa bikin res.write("") multiple times baru res.send() di akhir
        res.write("TGIF!!!!");
        res.write("WHERE SHOULD WE GO TOMORROW??");
        res.send()
      } else {
        res.sendFile(`${__dirname}/index.html`) //atau bisa send html file entirely pake template di samping
      }
    */
})

app.post("/", function(req, res) { //untuk handle post request
    const item = req.body.newItem;

    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else if (req.body.list === "Work") {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItems });
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function() {
    console.log("server started running on port 3000")
})