let express = require('express');
const studentModel = require('../Model/student.model');
const test = (req, res) =>{
    res.send("Hello World")
}
// 1. Student insert API
const studentInsert = async (req, res) => {
    let {name, rollno, email, phone} = req.body;

    try {
        // step 1 cheak user active, suspent or pending
        let existingStudent = await studentModel.findOne({
            email,
            status: { $ne: 'delete'}
        });

        if(existingStudent){
            return res.send({
                status:0,
                message:"Student already exists! (active, suspended, pending)"
            })
        }

        let student = new studentModel({
            name,
            rollno,
            email,
            phone,
            status:'pending'
        })

        await student.save()
        res.send({status:1, message:"Student inserted successfully"})
        

    } catch (error) {
        if(error.code === 11000){
            return res.send({status:0, message:"Email Already exists!"})
        }
        res.send({status:0, message:"Error in student insertion", err: error})
    }
}
// 2. Student List API
const studentList = async (req, res)=>{
    try {
        let data = await studentModel.find().sort({createdAt:-1});
        res.send({status:1, data:data})
    } catch (err) {
        res.send({status:0, err:err})
    }
}
// 3. Student List One API
const studentListOne = async (req, res)=>{
    let id = req.params.id;
    try {
        let data = await studentModel.findOne({_id: id});
        res.send({status:1, data:data})
    } catch (err) {
        res.send({status:0, err:err})
    }
}
// 4. Student Update API
const studentUpdate = async (req, res) =>{
    let {name, rollno, email, phone} = req.body;
    let id = req.params.id;
    try {
        await studentModel.updateOne({_id:id},{name, rollno, email, phone})
        res.send({status:1, message:"student updated successfully"})
    } catch (err) {
        res.send({status:0, err:err})
    }
}
// 5. Student soft Delete API (set status to 'delete')
const studentDelete = async (req, res) => {
    let id = req.params.id;
    try {
        await studentModel.updateOne({_id:id}, {status:'delete'})
        res.send({status:1, message:"student deleted successfully"})
    } catch (err) {
        res.send({status:0, err:err})
    }
}
// 6. Student Set Status API
const studentSetStatus = async (req, res) => {
    let id = req.params.id;
    let {status} = req.body;
    try {
        await studentModel.updateOne({_id:id}, {status:status})
        res.send({status:1, message:"student status updated successfully"})
    } catch (err) {
        res.send({status:0, err:err})
    }
}


module.exports = {test, studentInsert, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus};