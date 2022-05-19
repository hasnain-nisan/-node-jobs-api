
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

//db connection string
const connectDB = require('./db/conncet')

//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('jobs api');
});

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listeniing on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
  
start()
  
