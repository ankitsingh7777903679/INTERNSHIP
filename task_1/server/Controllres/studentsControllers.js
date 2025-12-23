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
        let { name, email, phone, stream, class: className, subject } = req.body;
        email = email.toLowerCase();
        // step 1 cheak user active, suspent or pending
        let existingStudent = await studentModel.findOne({
            email,
            status: { $ne: constants.studentStatus.DELETED }
        });

        if (existingStudent) {  //if student exists with active/suspend/pending status    (true)
            return res.send({
                status: false,
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
            status: 'pending',
            stream,
            class: className,
            subject

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
    // try {
    //     // A. Get Query Params (Default: Page 1, Limit 5)
    //     const page = parseInt(req.query.page) || 1;
    //     const limit = parseInt(req.query.limit) || 5;

    //     // B. Get Filter Params
    //     const statusFilter = req.query.status && req.query.status !== 'showAll' ? req.query.status : null;

    //     // C. Apply Status & Stream Filters
    //     if (statusFilter) query.status = statusFilter;

    //     // let data = await studentModel.find().sort({ createdAt: -1 });
    //     // res.send({ status: true, data: data })
    // } catch (err) {
    //     res.send({ status: false, err: err.message })
    // }


    try {
        // A. Get Query Params (Default: Page 1, Limit 5)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        // console.log("Search Query:", search);

        // B. Get Filter Params
        const statusFilter = req.query.status && req.query.status !== 'showAll' ? req.query.status : null;
        const streamFilter = req.query.stream && req.query.stream !== 'ShowAll' ? req.query.stream : null;
        const classFilter = req.query.class && req.query.class !== 'ShowAll' ? req.query.class : null;
        const subjectFilter = req.query.subject && req.query.subject !== 'ShowAll' ? req.query.subject : null;

        let query = {};

        // C. Apply Status & Stream Filters
        if (statusFilter) query.status = statusFilter;
        if (streamFilter) query.stream = streamFilter;

        // D. Apply Class/Subject filters directly because the schema stores plain strings
        if (classFilter) query.class = classFilter;
        if (subjectFilter) query.subject = subjectFilter;

        // F. Global Search Logic
        if (search) {
            const regex = new RegExp(search, 'i'); // Case insensitive
            const orConditions = [
                { name: regex },
                { email: regex },
                { stream: regex },
                { class: regex },
                { subject: regex }
            ];

            // Add numeric matches for phone/rollno when the search is a number
            const numericSearch = Number(search);
            if (!Number.isNaN(numericSearch)) {
                orConditions.push({ phone: numericSearch });
                orConditions.push({ rollno: numericSearch });
            }

            query.$or = orConditions;

            // Combine with existing filters when present
            if (statusFilter || streamFilter || classFilter || subjectFilter) {
                query = { $and: [{ ...query }, { $or: query.$or }] };
                delete query.$or;
            }
        }

        // G. Fetch Data
        const totalDocs = await studentModel.countDocuments(query);

        const data = await studentModel.find(query)
            .populate('class', 'name')   // Show Class Name
            .populate('subject', 'name') // Show Subject Names
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.send({
            status: true,
            data: data,
            pagination: {
                totalDocs,
                totalPages: Math.ceil(totalDocs / limit),
                currentPage: page,
                limit
            }
        })

    } catch (err) {
        res.send({ status: false, err: err.message })
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
    let { name, email, phone, stream, class: className, subject } = req.body;
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

        await studentModel.updateOne({ _id: id }, { name, email, phone, stream, class: className, subject })
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