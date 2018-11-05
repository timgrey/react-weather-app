const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(express.json());
app.use("/api/users", require("./routes/users"));

app.use( (err, req, res, next) => {
    if (err) res.send(err.message);
    else res.status(404).send( {message: "Not Found"} )
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true}, () => {
    console.log("Connected to MongoDB")
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("Connected on port " + process.env.PORT)
})


