const express = require("express");
const app = express();
let cors = require("cors")
app.use(express.json());
// const router = require("express").Router()
const mysql = require("mysql2/promise");
const config = require("../server/config/config");
const jwt = require("jsonwebtoken")
const bCrypt = require("bcrypt")
require("dotenv").config();
app.use(cors())

app.post("/login/admin", authenticateToken, (req,res) => {
  res.status(200).json({"hello": "World"})
})


app.post("/login", async (req,res) => {
        let data = req.body;
        const conn = await mysql.createConnection(config);
        let salt = await bCrypt.genSalt()
        const hashPassword = await bCrypt.hash(data.password,salt)
        try {
          const [rows, fields] = await conn.execute(
            `select * from admins where login='${data.login}'`
          )
          if(!rows.length){
            return res.status(400).send("access denied. Wrong user name");
          } else {
          const isValid = await bCrypt.compare(data.password, rows[0].password) 
            if (!isValid) {
              return res.status(400).send("access denied. Wrong password");
            
            } else {
              // let user = {
              //   data: rows[0].login.toString()
              // }
              // let accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
              // res.json({accessToken : accessToken})
            // console.log(req.headers)
                const token  = jwt.sign({data: rows[0].login.toString()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "3600s"});
              res.status(200).json({token,user: {"name": rows[0].login}})
            }
          } 
        } catch (error) {
          throw error;
        }
        conn.end();
})






function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if(token === null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
    if (err) return res.sendStatus(403)
    req.user = user
  next()
  })
}




const port = 5000;

app.listen(port, () =>
  console.log("NEW server has been started on port " + port + " ...")
);




