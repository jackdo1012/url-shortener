require("dotenv").config()
const appInit = require("./config/app")
const PORT = process.env.PORT || 3000
const middleware = require("./middleware")
const router = require("./routes")

async function main() {
    const { app } = await appInit()

    await middleware(app)

    router(app)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

main()
