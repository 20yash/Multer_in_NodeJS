const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const multer = require('multer')

//giving instruction to multer for storage
//here storage is locally



const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'uploads/');
    },
    filename:(req,file,callBack)=>{
        //adding a timestamp just in case if two file has same name
        const suffix = Date.now();
        callBack(null,suffix+'-'+file.originalname)
    }
})




//trying for storage engine base 64
//configure Multer to store files in memory as Buffer


// const storage = multer.memoryStorage


const uploads = multer({storage})//now passing this as a middleware in the post call



//route here to create student

router.post('/create',uploads.single('photo_name'),async(req,res)=>{
    try{
        const {name,age,email,phone,address}= req.body;
        const photopath = req.file?req.file.path:null

        //creating student record with base64-encoded image
        const newStudent = new Student({
            name,
            age,
            email,
            phone,
            address,
            photo:photopath
        });
        await newStudent.save()
        res.status(201).json({message:'Student created successfully!',student:newStudent})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Error while creating student record'})
    }
})

module.exports = router;