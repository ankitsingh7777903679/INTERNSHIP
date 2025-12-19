let express = require('express');
const studentModel = require('../Model/student.model');
const { msg } = require('../utils/messages/api');
const { HTTP_RESPONSES, constants } = require('../utils/constants');
const { validateStudent } = require('../utils/validation');
const test = (req, res) => {
    res.send("Hello World")
}
// 1. Student insert API
const studentInsert = async (req, res) => {

    const { error } = validateStudent(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }

    try {
        let { name, email, phone } = req.body;
        email = email.toLowerCase();
        // step 1 cheak user active, suspent or pending
        let existingStudent = await studentModel.findOne({
            email,
            status: { $ne: constants.studentStatus.DELETED }
        });

        if (existingStudent) {  //if student exists with active/suspend/pending status    (true)
            return res.send({
                status: true,
                message: msg.student.insert.errors.email_exists
            })
        }

        const lastStudent = await studentModel.findOne().sort({ rollno: -1 });
        const nextRollNo = lastStudent ? lastStudent.rollno + 1 : 1;

        let student = new studentModel({
            name,
            rollno: nextRollNo,
            email,
            phone,
            status: 'pending'
        })

        await student.save()
        res.send({ status: true, message: msg.student.insert.success })


    }
    catch (error) {
        if (error.code === HTTP_RESPONSES.DUPLICATE_KEY_ERROR) {
            return res.send({ status: false, message: msg.student.insert.errors.email_exists })
        }
        res.send({ status: false, message: msg.student.insert.errors.invalid_param, err: error })
    }
}
// 2. Student List API
const studentList = async (req, res) => {
    try {
        let data = await studentModel.find().sort({ createdAt: -1 });
        res.send({ status: true, data: data })
    } catch (err) {
        res.send({ status: false, err: err })
    }
}
// 3. Student List One API
const studentListOne = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await studentModel.findOne({ _id: id });
        res.send({ status: true, data: data })
    } catch (err) {
        res.send({ status: false, err: err })
    }
}
// 4. Student Update API
const studentUpdate = async (req, res) => {
    let { name, email, phone } = req.body;
    let id = req.params.id;


    const { error } = validateStudent(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }

    try {

        let existingStudent = await studentModel.findOne({
            email,
            _id: { $ne: id }, // Exclude current student being updated
            status: { $ne: constants.studentStatus.DELETED }
        });

        if (existingStudent) {  //if student exists with active/suspend/pending status    (true)
            return res.send({
                status: false,
                message: msg.student.insert.errors.email_exists
            })
        }

        await studentModel.updateOne({ _id: id }, { name, email, phone })
        res.send({ status: true, message: msg.student.update.success })
    } catch (err) {
        res.send({ status: false, err: err })
    }
}
// 5. Student soft Delete API (set status to 'delete')  
const studentDelete = async (req, res) => {
    let id = req.params.id;
    try {
        await studentModel.updateOne({ _id: id }, { status: 'delete' })
        res.send({ status: true, message: msg.student.delete.success })
    } catch (err) {
        res.send({ status: false, err: err })
    }
}
// 6. Student Set Status API
const studentSetStatus = async (req, res) => {
    let id = req.params.id;
    let { status } = req.body;
    try {
        await studentModel.updateOne({ _id: id }, { status: status })
        res.send({ status: true, message: msg.student.status.success })
    } catch (err) {
        res.send({ status: false, err: err })
    }
}


module.exports = { test, studentInsert, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus };