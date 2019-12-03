const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../model/User');

if (req.body.username && req.body.password) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });


    // playerRoute.route('/read-player/:id').get((req, res) => {
    //     Player.findById(req.params.id, (error, data) => {
    //     if (error) {
    //       return next(error)
    //     } else {
    //       res.json(data)
    //     }
    //   })
    // })
  }