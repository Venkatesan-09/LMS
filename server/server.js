import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//Initialize express
const app = express()

//connect to database
 connectDB()

//middleware
app.use(cors())

//routes
app.get('/',(req,res)=>res.send('Api Working'))
app.post('/clerk',express.json(),clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    console.log(`Sever is running on port ${PORT}`);
})

