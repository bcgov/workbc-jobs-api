const express = require("express")
const cors = require("cors")

const app = express()
require("dotenv").config()
const jobRouter = require("./routes/jobs.route")

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(cors())

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081

app.use("/jobs", jobRouter)

app.get("/", (req, res) => {
    res.send("WORKBC-JOBS-API: Server is Running.")
})

app.listen(port, () => {
    console.log("Started at port %s", port)
})
