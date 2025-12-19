let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
const StudentRouter = require('./Routes/studentRoutes')
const acadmicRoutes = require('./Routes/acadmicRoutes')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(express.json())

app.use('/api/web/student',StudentRouter)
app.use('/api/web/student',acadmicRoutes)

// Connect to MongoDB
try {
    mongoose.connect(process.env.DBURL).then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is running on http://localhost:"+process.env.PORT);
        })
    })
} 
catch (error) {
    console.log("Error connecting to the database", error);
}
