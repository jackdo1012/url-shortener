const mainRoute = require("./main")

const router = (app) => {
    app.use("/", mainRoute)
}

module.exports = router
