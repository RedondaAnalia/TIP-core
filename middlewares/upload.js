const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        const fileName = file.originalname.split('.');
        const extension = fileName[fileName.length - 1 ];
        cb(null, req.baseUrl +"-"+req.body.id+"."+extension)
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null,false)
    }
}

exports.upload = multer(
    {
        storage: storage ,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter

    });

