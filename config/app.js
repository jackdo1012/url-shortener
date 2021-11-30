const express = require("express")
const appInit = async () => {
    const app = express()
    return { app }
}
module.exports = appInit
