const { BookModel } = require("../Models/book");
const { createError } = require("../Service/Error");
require("dotenv").config();

//TODO:
/**----------------------------------------- 
 *  @desc register new Book
 *  @route /BOOK/AJOUTER
 *  @method POST
 *  @access public
 -------------------------------------------*/

module.exports.AJOUTER_BOOK = async (req, res, next) => {
  try {
    const {Title , Description} = req.body;
    // check BookModel exist or not
    const result = await BookModel.findOne({ Title: Title });
    if (result) return next(createError(401, "This Title Book is Exist"));

    const dataNewBook = {
         Title : Title,
         Description: Description
        };

    // Save in DB
    const newBookModel = new BookModel(dataNewBook);
    await newBookModel.save();

    return res
      .status(200)
      .json(newBookModel);
  } catch (err) {
    return next(err);
  }
};


//TODO:
/**----------------------------------------- 
 *  @desc update Book by id
 *  @route /BOOK/UPDATE/:id
 *  @method PUT
 *  @access private
 -------------------------------------------*/

 module.exports.UPDATE_BOOK = async (req, res, next) => {
  const newUpdate = {
    Description: req.body.Description,
    updatedAt : Date.now()
  }
  try {
    const result = await BookModel.findByIdAndUpdate(req.params.id , {$set : newUpdate} , {new:true});
    console.log(result)
    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
}



//TODO:
/**----------------------------------------- 
 *  @desc favorite Book by id
 *  @route /BOOK/UPDATE/:id
 *  @method PUT
 *  @access private
 -------------------------------------------*/

 module.exports.FAVORITE_BOOK = async (req, res, next) => {
  try {
  const FindBook = await BookModel.findOne({ _id : req.params.id }).select("-updatedAt");
    const addLike = {
      userId : req.body.userIdd
    } 
    const pushValueLikes = FindBook.Likes.push(addLike)
    const newValueLikes = { ...FindBook , pushValueLikes}
    const updateDateNews = Date.now()
 
    const resulte = await BookModel.findByIdAndUpdate(req.params.id ,
       {$set : newValueLikes , updatedAt : updateDateNews } , 
       {new:true}).populate("Likes.userId");
    console.log(resulte)
    return res
      .status(200)
      .json(resulte);
  } catch (err) {
    return next(err);
  }
}



//TODO:
/**----------------------------------------- 
 *  @desc delete Book by id
 *  @route /BOOK/DELETE/:id
 *  @method DELETE
 *  @access private
 -------------------------------------------*/

 module.exports.DELETE_BOOK = async (req, res, next) => {
  try {
    const result = await BookModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({msg : 'delete succes'});
  } catch (err) {
    return next(err);
  }
}


//TODO:
/**----------------------------------------- 
 *  @desc get Book by id
 *  @route /BOOK/GET/:id
 *  @method GET
 *  @access private
 -------------------------------------------*/

module.exports.GET_BOOK_BY_ID = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const result = await BookModel.findOne({ _id : req.params.id });
    console.log(result)
    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
}


  //TODO:
  /**----------------------------------------- 
   *  @desc get all Book
   *  @route /BOOK/GET_ALL
   *  @method GET
   *  @access public
   -------------------------------------------*/
  
  module.exports.GET_ALL_BOOK = async (req, res, next) => {
    try {
      const result = await BookModel.find();
      return res
        .status(200)
        .json(result);
    } catch (err) {
      return next(err);
    }
  };
