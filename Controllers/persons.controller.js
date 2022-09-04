const { PersonsList } = require("../Models/Persons.model");
const _ = require('underscore');
const fs = require('fs');
exports.RadomPerson = (req, res) => {

    const ShufflePerson = _.sample(JSON.parse(PersonsList))
    res.send(ShufflePerson)
}

exports.AllPerson = (req, res) => {
    const limit = Number(req.query.limit)
    if (limit > 0) {
        const NewPersonsList = JSON.parse(PersonsList).slice(0, limit)
        res.send(NewPersonsList)
    }
    else {
        res.send(JSON.parse(PersonsList))
    }

}
exports.SavePerson = (req, res) => {
    const NewPersonsList = JSON.parse(PersonsList)
    console.log(req.body)
    if (_.isEmpty(req.body)==false) {
        if (req.body.photoUrl && req.body.name && req.body.gender && req.body.phone && req.body.address && req.body.email) {
            NewPersonsList.push(req.body)
            fs.writeFileSync(__dirname + "/../Persons.json", JSON.stringify(NewPersonsList))
            res.send(NewPersonsList)
        }
        else {
            res.send({
                message: "Please Give The all required fields"
            })
        }
    }
    else {
        res.send({
            message: "Please Give body"
        })
    }

}
exports.UpdatePerson = (req, res) => {
    const user = req.body
    if (user._id) {
        const NewPersonsList = JSON.parse(PersonsList)
        console.log(NewPersonsList)
        const MatchedList = _.findWhere(NewPersonsList, { _id: user._id })
        MatchedList.photoUrl = user.photoUrl
        MatchedList.name = user.name
        MatchedList.gender = user.gender
        MatchedList.email = user.email
        MatchedList.phone = user.phone
        MatchedList.address = user.address
        fs.writeFileSync(__dirname + "/../Persons.json", JSON.stringify(NewPersonsList))
        res.send(NewPersonsList)
    }
    else {
        res.send({
            message: "Please give a body with _id"
        })
    }
}

exports.BulkUpdatePerson = (req, res) => {
    const users = req.body
    if (_.isEmpty(req.body)==false) {
        const NewPersonsList = JSON.parse(PersonsList)
        users.map((user) => {
            const MatchedList = _.findWhere(NewPersonsList, { _id: user._id })
            MatchedList.photoUrl = user.photoUrl
            MatchedList.name = user.name
            MatchedList.gender = user.gender
            MatchedList.email = user.email
            MatchedList.phone = user.phone
            MatchedList.address = user.address
        })
        fs.writeFileSync(__dirname + "/../Persons.json", JSON.stringify(NewPersonsList))
        res.send(NewPersonsList)
    }
    else {
        res.send({
            message: "Please Give a body with _id"
        })
    }
}

exports.DeletePerson = (req, res) => {
    const id = req.body._id
    if (id) {
        const NewPersonsList = JSON.parse(PersonsList)
        const indexes = NewPersonsList.findIndex(a => a._id == id)
        if (indexes > -1) {
            NewPersonsList.splice(indexes, 1)
            fs.writeFileSync(__dirname + "/../Persons.json", JSON.stringify(NewPersonsList))
            res.send(NewPersonsList)
        }
    }
    else {
        res.send({
            message: "give a valid id using body"
        })
    }

}