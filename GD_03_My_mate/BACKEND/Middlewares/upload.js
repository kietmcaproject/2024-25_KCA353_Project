const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join("../public/images");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,(err,buffer)=>{
        if(err){
            return cb(err);
        }
        const fileName = buffer.toString('hex')+path.extname(file.originalname);
        cb(null, fileName);
      })
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;