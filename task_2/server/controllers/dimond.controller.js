const express = require('express');
const stoneGroupModel = require('../models/stoneGroup.model');
const { msg } = require('../utils/messages/api');
const { validationDimond } = require('../utils/validation/validation');
const { HTTP_RESPONSES } = require('../utils/constants');
const { validationDimondPrice } = require('../utils/validation/dimondPrice');
const dimondModel = require('../models/dimond.model');
const { validationAddDimond } = require('../utils/validation/addDimond');


const test = (req, res) => {
    res.send("Hello from dimond controller")
}

const insertStoneGroup = async (req, res) => {
    const { error } = validationDimond(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }
    try {
        let { shape, color, clarity, from, to, price } = req.body;

        // Check if exact combination exists
        let data = await stoneGroupModel.findOne({
            shape, color, clarity,
            $and: [
                { from: { $lte: to } },
                { to: { $gte: from } }
            ]
        });
        // console.log("Found existing:", data);

        if (data) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg: "try" });
        }

        const dimond = new stoneGroupModel({
            shape,
            color,
            clarity,
            from,
            to,
            price
        })

        await dimond.save()
        res.send({ status: true, message: msg.dimond.insert.success });
    } catch (err) {
        console.log("Insert error:", err);
        if (err.code === 11000) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg: "catch" });
        }
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err.message })
    }

}

const findDimondPrice = async (req, res) => {
    console.log("findDimondPrice called with body:", req.body);
    const { error } = validationDimondPrice(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }
    try {
        let { shape, color, clarity, weight } = req.body;

        let data = await stoneGroupModel.findOne({
            shape: shape,
            color: color,
            clarity: clarity,
            from: { $lte: weight },  // Range Start <= Weight
            to: { $gte: weight }
        });
        // console.log(data.price);
        // let price = data.price * weight;
        let price = data.price;
        // console.log(totle);
        res.send({ status: true, total_price: price });

    } catch (err) {
        res.send({ status: false, message: msg.findDimondPrice.notExists, error: err })
    }
}

const findDimond = async (req, res) => {
    try {
        let data = await stoneGroupModel.find();
        res.send({ status: true, data: data });

    } catch (err) {
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err })
    }
}

const findOneDimond = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await stoneGroupModel.findById(id);
        res.send({ status: true, data: data });

    } catch (err) {
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err })
    }


}

const updateDimond = async (req, res) => {
    let { id } = req.params;
    const { error } = validationDimond(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }

    try {
        let { shape, color, clarity, from, to, price } = req.body;

        // Check if exact combination exists
        let data = await stoneGroupModel.findOne({
            shape, color, clarity,
            _id: { $ne: id }, // Exclude current dimond being updated
            $and: [
                { from: { $lte: to } },
                { to: { $gte: from } }
            ]
        });
        // console.log("Found existing:", data);

        if (data) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg: "try" });
        }

        const dimond = new stoneGroupModel({
            shape,
            color,
            clarity,
            from,
            to,
            price
        })

        await stoneGroupModel.updateOne({ _id: id }, { shape, color, clarity, from, to, price })
        res.send({ status: true, message: msg.dimond.update.success });
    } catch (err) {
        console.log("Insert error:", err);
        if (err.code === 11000) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg: "catch" });
        }
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err.message })
    }

}

const addDiamond = async (req, res) => {

    const { error } = validationAddDimond(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }

    let exist = await dimondModel.findOne({ stockId: req.body.stockId, status: { $ne: 'deleted' } });
    if (exist) {
        return res.send({ status: false, message: msg.addDiamond.errors.skockId_exists });
    }

    try {
        let { stockId, shape, color, clarity, weight, rap, discount, pricePerCarat, amount } = req.body;

        const addDimond = new dimondModel({
            stockId,
            shape,
            color,
            clarity,
            weight,
            rap,
            discount,
            pricePerCarat,
            amount,
            status: 'available'
        })

        await addDimond.save()
        res.send({ status: true, message: msg.addDiamond.success });

    } catch (err) {
        res.send({ status: false, message: msg.addDiamond.errors.skockId_exists });
    }
}

const listDimond = async (req, res) => {
    // A defualt page number and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";


    let query = {};

    // B Get Filter Params
    if(search){
        query.stockId = { $regex: search, $options: 'i' };
    }
    const shape = req.query.shape && req.query.shape !== 'showAll' ? req.query.shape : null;
    if (shape) {
        query.shape = shape
    }
    const status = req.query.status && req.query.status !== 'showAll' ? req.query.status : null;
    if (status) {
        query.status = status;
    }
    // const color = req.query.color && req.query.color !== 'showAll' ? req.query.color : null;
    let color = req.query.color;

    if (color === 'showAll' || color === '' || color === 'undefined') {
        color = null;
    }
    if (color) {
        // Handle "G,H,I" (string) vs ["G", "H"] (array) vs "G" (string)
        let colorArray = [];

        if (Array.isArray(color)) {
            colorArray = color;
        } else if (typeof color === 'string' && color.includes(',')) {
            colorArray = color.split(',');
        } else {
            colorArray = [color];
        }

        // Final safety check: remove any leftover 'showAll'
        colorArray = colorArray.filter(c => c !== 'showAll' && c !== 'undefined');

        if (colorArray.length > 0) {
            query.color = { $in: colorArray };
        }
    }

    // if (color) {
    //     query.color = { $in: Array.isArray(color) ? color : [...color] }
    // }



    let clarity = req.query.clarity;
    if (clarity === 'showAll' || clarity === '' || clarity === 'undefined') {
        clarity = null;
    }
    if (clarity) {
        // Handle "G,H,I" (string) vs ["G", "H"] (array) vs "G" (string)
        let clarityArray = [];

        if (Array.isArray(clarity)) {
            clarityArray = clarity;
        } else if (typeof clarity === 'string' && clarity.includes(',')) {
            clarityArray = clarity.split(',');
        } else {
            clarityArray = [clarity];
        }

        // Final safety check: remove any leftover 'showAll'
        clarityArray = clarityArray.filter(c => c !== 'showAll' && c !== 'undefined');
        if (clarityArray.length > 0) {
            query.clarity = { $in: clarityArray };
        }
    }

    // if (clarity) {
    //     query.clarity = { $in: Array.isArray(clarity) ? clarity : [...clarity] }
    // }

    let weight = req.query.weight;
    if (weight && weight.includes(',')) {
        const [min, max] = weight.split(',');
        query.weight = { $gte: min, $lte: max };
        // weight = [min, max];
    } 
    // console.log("Weight filter:",weight, weight[0], weight[1]);
    // Apply shape filter if provided

    let amount = req.query.amount;
   
    if (amount && amount.includes(',')) {
        const [min, max] = amount.split(',');
        query.amount = { $gte: min, $lte: max };
        // weight = [min, max];
    }
    
    try {
        // console.log(query);
        let totalDocs = await dimondModel.countDocuments(query);
        let data = await dimondModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        res.send({
            status: true, data: data, totalPages: Math.ceil(totalDocs / limit), currentPage: page,
            limit: limit, totalDocs: totalDocs
        });

    } catch (err) {
        res.send({ status: false, message: msg.addDiamond.errors.invalid_param, error: err })
    }
}

const changeDimondStatus = async (req, res) => {
    let { id } = req.params;
    let { status } = req.body;
    try {
        await dimondModel.updateOne({ _id: id }, { status: status })
        res.send({ status: true, message: msg.changeDimondStatus.success });
    } catch (err) {
        res.send({ status: false, message: msg.changeDimondStatus.errors.invalid_param, error: err })
    }
}

const deleteDimond = async (req, res) => {
    let { id } = req.params;
    try {
        await dimondModel.updateOne({ _id: id }, { status: "deleted" })
        res.send({ status: true, message: msg.deleteDimond.success });
    } catch (err) {
        res.send({ status: false, message: msg.deleteDimond.errors.invalid_param, error: err })
    }
}

const listOneDiamond = async (req, res) => {
    let {id} = req.params;
    try{
        let data = await dimondModel.findById(id);
        res.send({ status: true, data: data });
    }catch(err){
        res.send({ status: false, message: msg.addDiamond.errors.invalid_param, error: err })
    }

}

const UpdateOneDiamond = async (req, res) => {
    // console.log("UpdateOneDiamond called", req.params.id, req.body);
    const { error } = validationAddDimond(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }

    let exist = await dimondModel.findOne({ stockId: req.body.stockId,
        _id: { $ne: req.params.id },status: { $ne: 'deleted' } });
    if (exist) {
        return res.send({ status: false, message: msg.addDiamond.errors.skockId_exists });
    }

    try {
        let { stockId, shape, color, clarity, weight, rap, discount, pricePerCarat, amount } = req.body;
        let {id} = req.params;
        const addDimond = {
            stockId,
            shape,
            color,
            clarity,
            weight,
            rap,
            discount,
            pricePerCarat,
            amount,
        }

        await dimondModel.updateOne({ _id: id }, addDimond)
        res.send({ status: true, message: msg.updateDimond.success });

    } catch (err) {
        res.send({ status: false, message: msg.updateDimond.errors.skockId_exists });
    }
}

const minWeight = async (req, res) => {
    try {
        let minWeight = await dimondModel.find({ "weight": { "$exists": true } }).sort({ weight: 1 }).limit(1);
        let maxWeight = await dimondModel.find({ "weight": { "$exists": true } }).sort({ weight: -1 }).limit(1);
        let maxAmount = await dimondModel.find({ "amount": { "$exists": true } }).sort({ amount: -1 }).limit(1);
        let minAmount = await dimondModel.find({ "amount": { "$exists": true } }).sort({ amount: 1 }).limit(1);
        res.send({ status: true, minWeight: minWeight[0].weight, maxWeight: maxWeight[0].weight,minAmount: minAmount[0].amount,  maxAmount: maxAmount[0].amount });
    } catch (err) {
        res.send({ status: false, message: msg.addDiamond.errors.invalid_param, error: err })
    }
}
   


module.exports = { test, insertStoneGroup, findDimondPrice, findDimond, findOneDimond, updateDimond, addDiamond, listDimond, changeDimondStatus, deleteDimond, listOneDiamond, UpdateOneDiamond, minWeight }