const bcrypt = require("bcrypt");
const { USER } = require("../Models/user");
const { createError } = require("../Service/Error");
const { GenerateToken } = require("../utils/GenerateToken");
require("dotenv").config();

//TODO:
/**----------------------------------------- 
 *  @desc register new user
 *  @route /USER/AJOUTER
 *  @method POST
 *  @access public
 -------------------------------------------*/

module.exports.AJOUTER_USER = async (req, res, next) => {
  try {
    Data = req.body.form;
    // check User exist or not
    const result = await USER.findOne({ Email: Data.Email });
    console.log(Data)
    if (result) return next(createError(401, "Email Does Not Exist"));

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    HashPassword = await bcrypt.hash(Data.Password, salt);
    const dataForm = { ...Data, Password: HashPassword};

    // Save in DB
    const newuser = new USER(dataForm);
    await newuser.save();

    return res
      // .cookie("Token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(newuser);
  } catch (err) {
    return next(err);
  }
};



//TODO:
/**----------------------------------------- 
 *  @desc auth user
 *  @route /USER/AUTH
 *  @method POST
 *  @access public
 -------------------------------------------*/

 module.exports.AUTH = async (req, res, next) => {
  try {
   const {EmailLogin , PasswordLogin } = req.body;
    // check User
    const result = await USER.findOne({ Email: EmailLogin });
    if (!result) return next(createError(401, "This Email Does Not Exist"));

// Bcrypt && Compare password
const Result_Password = result.Password;
const validPassword = await bcrypt.compare(PasswordLogin, Result_Password);

// Check Password
if (!validPassword) {
  return next(createError(401, "Wrong Email or Password"));
}

const token = GenerateToken(result);

    return res
      .cookie("Token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(result);

  } catch (err) {
    return next(err);
  }
};


//TODO:
/**----------------------------------------- 
 *  @desc logout user
 *  @route /USER/LOGOUT
 *  @method POST
 *  @access private
 -------------------------------------------*/

module.exports.LOGOUT = (req, res , next) =>{
  try{
      res.clearCookie("Token").send("cookie cleared")
  }
    catch (err){
      return  next(err)
    }
}

//TODO: GET USER
module.exports.GET_USER = async (req, res, next) => {
  try {
    const result = await USER.findById({ _id: req.infoUser.id }).select(
      "-Password"
    );
    if (!result) return next(createError(401, "user not found"));
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

//TODO: UPDATE USER PHOTO
module.exports.UPDATE_USER_PHOTO = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Provided" });
    }
    const result = await USER.findByIdAndUpdate(
      req.params.id,
      { Photo :req.file.filename },
      { new: true }
    ).select("-Password");
    if (!result) return next(createError(401, "User not found"));
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};
