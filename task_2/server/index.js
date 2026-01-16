const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const cors = require('cors')
const DimondRouter = require('./routers/dimondRoutes')
const authRouter = require('./routers/authRoutes')
const dotenv = require('dotenv')
const { varifyToken } = require('./middleware/authMiddleWare')
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// routs
app.use('/api/dimond/', DimondRouter)
app.use('/api/auth/', authRouter)


// Connect to MongoDB
try {
    mongoose.connect(process.env.DBURL).then(()=>{
        app.listen(process.env.PORT, ()=> {
            console.log("Server is running on http://localhost:"+process.env.PORT);
        })
    })
} catch (err) {
    console.log("Error connecting to the database", err);
}
