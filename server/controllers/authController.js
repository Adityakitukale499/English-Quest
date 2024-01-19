const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Role = require("../models/Role");


const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });
          const role = await Role.findById(user.role);
          res.json({ token,  role:role.type});
    }catch(e){
      console.log(e)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const addUser = async (req, res) => {
    if(!req.body || !req.body?.email || !req.body?.password || !req.body?.role, !req.body?.name){
        res.status(400).json({message:"provide all required details"})
    }

    const {email, password, role, name} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:"user already exists with email!"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          email,
          password: hashedPassword,
          role,
          name
        });
    
        await newUser.save();
    
        res.json({ message: 'User registered successfully' }); 
    }catch(e){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      user: user.name
    })
  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}

module.exports = {loginUser, addUser,getUserDetails}