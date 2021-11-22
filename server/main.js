const express = require('express')
const cors = require('cors')
// const mongoose = require("mongoose");

// const mongoProfile = require('./config')
const authRouter = require('./authRouter')

const app = express();
const PORT = 4000
const pool = require("./db"); 

app.use(cors());
app.use(express.json())


app.use('/auth',authRouter)



app.get('/test', async(req, res) => {
  try {
    const items = await pool.query("SELECT * FROM public.user");
    return res.json(items);
  } catch (error) {
    console.log(error)
  }
});


const start = async () =>{
  try {
    app.listen(PORT, () => {
      console.log(`Server app listening at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start();