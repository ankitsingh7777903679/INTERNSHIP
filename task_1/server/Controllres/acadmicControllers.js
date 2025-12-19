const classModel = require("../Model/class.model");
const streamModel = require("../Model/stream.model");
const subjectModel = require("../Model/subjects.model");

const addStreams = async(req, res) => {
    try {
        let {name} = req.body;
        if(!name){
            return res.send({status:false, err: "Stream name is required"})
        }

        const newStream = new streamModel({name});
        await newStream.save();
        res.send({status:true, message: "Stream added successfully", data: newStream})

    } catch (err) {
        if(err.code === 11000){
            return res.send({status:false, message: "Stream already exists"})
        }
        return res.send({status:false, message: err.message})
    }
}

const getStreams = async(req, res) => {
    try {
        const streams = await streamModel.find()
        res.send({status:true, data: streams})
    } catch (err) {
        res.send({status:false, message: err.message})
    }
}


// class Controllers 

const addClass = async (req, res) => {
    try {
        let { name, stream } = req.body;    
        const newClass = new classModel({ name, stream });
        await newClass.save();
        res.send({ status: true, message: "Class added successfully", data: newClass });
    } catch (err) {
        res.send({status:false, message: err.message})
    }
}

const getClasses = async (req, res) => {
    try {
        const classes = await classModel.find();
        res.send({status:true, data: classes})
    } catch (err) {
        res.send({status:false, message: err.message})
    }
}

// subject Controllers

const addSubject = async (req, res) => {
    try {
        let { name, stream } = req.body;
        const newSubject = new subjectModel({ name, stream });
        await newSubject.save();
        res.send({ status: true, message: "Subject added successfully", data: newSubject });
    } catch (err) {
        res.send({status:false, message: err.message})
    }
}

const getSubjects = async (req, res) => {
    try {
        const subjects = await subjectModel.find();
        res.send({status:true, data: subjects})
    } catch (err) {
        res.send({status:false, message: err.message})
    }
}
module.exports = {addStreams, getStreams, addClass, getClasses, addSubject, getSubjects}