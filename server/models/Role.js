const mongoose =  require("mongoose");

const RolesSchema = new mongoose.Schema({
  type: { type: String },
});

const Role = mongoose.model("Role", RolesSchema);

module.exports = Role;
