

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk/index');
const variables_env = require('../config/config-module').config()

const KEYID = variables_env.AVSKEYID;
const KEYACCESS = variables_env.AVSKEYACCESS;


aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: KEYACCESS,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId:  KEYID,
    region: 'sa-east-1'// region of your bucket
});

const s3 = new aws.S3();

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pet-heroes',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const fileName = file.originalname.split('.');
            const extension = fileName[fileName.length - 1 ];
            cb(null, req.baseUrl+"-"+req.body.id+"-"+new Date().getMilliseconds()+"."+extension)
        }

    })
})

module.exports = uploadS3;