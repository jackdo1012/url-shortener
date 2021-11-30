const express = require("express")
const middleware = async (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set("view engine", "ejs")
}

module.exports = middleware
