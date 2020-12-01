const { json } = require('body-parser');
const User = require('../models/user');

//save user

const saveUserInformation = async (req, res) => {
  const u = req.body.user;
  console.log("u::::::::::::::::::::::::::::::::;", JSON.stringify(u));
  const name = u.userName;
  console.log("name", name)
  /////
  const user2 = await User.findOne({ "userName": name })
  //if (user2)
  //res.json({ "uid": user2.uid })
  console.log("user2:::::::::::::::::::::::", JSON.stringify(user2));

  ///////
  // var user=req.body;
  var uid = req.body.uid;
  //להשתמש בפונקציה ששולפת מהתוכן את הuid ואז לשלוף את ה_id

  let user = await User.findOneAndUpdate({ "uid": uid }, {
    "fullName": req.body.fullName,
    "position": req.body.position,
    "phone": req.body.phone,
    "companyName": req.body.companyName,
    // "birthday":new Date(req.body.birthday),
    "socialmedias": JSON.stringify(req.body.socialmedias),
    "address": req.body.address,
    "street": req.body.street
    /**fullName: {type: String},
    position: {type: String},
    phone:{type:String},
    companyName:{type:String},
    birthday:{type:Date},
    socialMedia: [{type: mongoose.Schema.Types.ObjectId, ref: 'socialmedia'}], */
  }, { upsert: true })
  res.send(user);
}
//get by id
const getUserById = async (req, res) => {
  var uid = req.body.uid;
  res.send(await User.findOne({ "uid": uid }))

}

//נותן uid לפי username
getUidByUserName: async (req, res) => {
  console.log("inside!!")
  const userName = req.params.userName
  console.log(userName)
  const user = await User.findOne({ username: userName })
  if (user)
    res.json({ "uid": user.uid })
}
//get user details
const getUserByUserName = async (req, res) => {
  var name = req.params.userName;
  const user = await User.findOne({ "username": name })
  console.log(user)
  if (user) {
    if (user.imgProfile == "")
      user = await User.findOneAndUpdate({ "username": name }, { $set: { "imgProfile": "https://i.stack.imgur.com/34AD2.jpg" } })
    console.log(await User.findOne({ "uid": user.uid }))
    res.send(await User.findOne({ "uid": user.uid }))

  }
  else
    res.send("there is no this user")
}

const patch_update_user = async (req, res) => {
  console.log("hello!!!!!!!!!!!!!!!!!!!!!!!")

  var updateObject = new User(req.body); // {last_name : "smith", age: 44}//new user
  console.log("updateObject", updateObject);
  var userName = req.params.userName;//user that updated
  console.log(userName)
   let user;
  // const user = await User.findOne({ username: userName })
  // console.log(user);
  //  res.JSON(User.update({"uid"  : user.uid}, {$set: updateObject}));
  //  const updatedProduct = await User.updateOne({"uid": user.uid}, {$set: updateObject},{new:true}).exec();
  try {
   user= await User.findOneAndUpdate({ username: userName }, updateObject, { returnOriginal: false ,runValidators: true})
  // await updateObject.save();
  console.log("saved successfully");
  res.send(user);
  } catch (error) {
    console.log("error",error);
    res.status(400).json({error:error})
    // return error;
  }
}

getUidByUserName = async (req, res) => {
  console.log("inside!!")
  const userName = req.params.userName
  console.log(userName)
  const user = await User.findOne({ username: userName })
  if (user)
    res.json({ "uid": user.uid })
  else
    res.json("undifined")

};
// const setApiKeyToUser=async(req,res)=>{
const setApiKeyToUser=async(id)=>{

  const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt,async function(err, hash) {
    console.log("hash",hash);
    let user = await User.findOneAndUpdate({uid:id},{"apiKey":hash})
    console.log("user",user)
    // res.send(user);
    return user;
   });
});

}
//הופעלה פעם אחת
const addApiKeyToExistingUsers=async(req,res)=>{
  let users;
  users=await User.find()
// for (let index = 0; index < users.length; index++) {
//   await  setApiKeyToUser(users[index]); 
// }
  users.forEach(async(element) =>{
  await setApiKeyToUser(element.uid)
  });
  res.send(users);
}

module.exports = { saveUserInformation, getUserById, getUserByUserName, patch_update_user, getUidByUserName
  // ,setApiKeyToUser
  ,addApiKeyToExistingUsers}
