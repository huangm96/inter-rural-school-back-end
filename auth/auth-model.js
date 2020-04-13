const db = require("../database/dbConfig.js");

module.exports = {
  add,
  getUsers,
  addBoard,
  addAdmin,
  find,
  findAdminSchool,
  updateAdminSchool,
};

function add(user) {
  return db("users").insert(user).then((added) => {
    const userId = added[0];
    if (user.admin_id) {
      return db("admins").where({id: user.admin_id}).update({user_id: userId}).then(() => added);
    } else if (user.board_id) {
      return db("boards").where({id: user.board_id}).update({user_id: userId}).then(() => added);
    }
  });
}

function getUsers() {
  return db("users");
}

function addBoard(board) {
  return db("boards").insert(board)
}

function addAdmin(admin) {
 return  db("admins").insert(admin)
}

function find(filter) {
  return db("users").where(filter);
}
function findAdminSchool(id) {
  return db("admins")
    .where({id})
    
}
function updateAdminSchool(changes, id) {
  return db('admins')
    .where({id})
    .update(changes);
}
