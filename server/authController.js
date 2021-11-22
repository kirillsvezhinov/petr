const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./jwt-key");
const pool = require("./db"); 

const generateAccesToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};


class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
    //   cons
        
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, password } = req.body;
      
      // здесь модель должна быть
      const {rows:condidate} = await pool.query(`SELECT * FROM public.user WHERE 'username' = $1`,[username])
      // если юзер не найден
      if (condidate.length) {
        res.status(400).json({ message: "User is already created", condidate });
      }
      
      const hashPassword = bcrypt.hashSync(password, 7);
      
      await pool.query('INSERT INTO  public.user (username, password) VALUES ($1, $2)',[username,hashPassword])
      return res.json({ message: "User created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // здесь модель
      let {rows:user} = await pool.query(`SELECT * FROM public.user WHERE 'username' = $1`,[username]);
      user = user[0];
      
      console.log(user);
    //   return res.status(400).json({ message: "Not find user",user });
      if (!user) {
        return res.status(400).json({ message: "Not find user"});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "invalid password" });
      }
      const token = generateAccesToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {}
  }
}
module.exports = new authController();
