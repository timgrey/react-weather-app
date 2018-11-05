const express = require("express")
const { Router } = express;

const User = require("../models/users.js")

const userRouter = Router();

userRouter.route("/signup")
    .post((req, res, next) => {
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) { next(err) }
            else res.status(201).send(savedUser)
        })
    })
userRouter.route("/login")
    .post((req, res) => {
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
            if (err) return res.status(500).send(err);
            if (!user || user.password !== req.body.password) {
                return res.status(403).send({ success: false, err: "Email or password are incorrect" })
            }
            else { 
                res.status(201).send(user) 
            }
        })
       
    })
userRouter.route("/favorite-weather")
    .put((req, res, next) => {
        User.findOneAndUpdate({ username: req.body.username.toLowerCase() }, req.body, {new:true})
            .then( (user) => res.status(200).send(user.homeWeather))
            .catch(err => {next(err)})
    })




module.exports = userRouter;