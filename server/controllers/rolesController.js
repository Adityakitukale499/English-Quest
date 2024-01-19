const Role = require('../models/Role')

const getAllRoles = async(_, res)=>{
    try{const roles = await Role.find();
    return res.status(200).json(roles);
    }catch{
        res.status(500).json({
            message:"internal server error!!"
        })
    }
}

module.exports = {getAllRoles}