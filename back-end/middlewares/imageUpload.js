const multer = require("multer");
const path = require("path");

//Destination to store image
const imageStore = multer.diskStorage({
  destination:  (req, file, cb) => {
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}`);
  },
  //Trocar nome do arquivo padrão
  filename:(req,file,cb) =>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

//Upload da imagem e verificação se o arquivo é png ou jpg
const imageUpload = multer({
    storage:imageStore,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //Upload only png and jpg format 
            return cb(new Error("Favor envie somente arquivos em png ou jpg"))
        }
        cb(undefined,true)
    }
})

module.exports = {imageUpload};