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
        let data = await stoneGroupModel.findOne({ shape, color, clarity,
            $and:[
                { from: {$lte: to} },
                 { to: {$gte: from} }
            ] 
            });
        // console.log("Found existing:", data);

        if (data) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg:"try" });
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
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg:"catch" });
        }
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err.message })
    }

}

const findDimondPrice = async (req, res) => {
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
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err })
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
        let data = await stoneGroupModel.findOne({ shape, color, clarity,
            _id: { $ne: id }, // Exclude current dimond being updated
            $and:[
                { from: {$lte: to} },
                 { to: {$gte: from} }
            ] 
            });
        // console.log("Found existing:", data);

        if (data) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg:"try" });
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
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists, msg:"catch" });
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
            amount
        }) 

        await addDimond.save()
        res.send({ status: true, message: msg.addDiamond.success });

    } catch (err) {
        res.send({ status: false, message: msg.addDiamond.errors.stockId_exists, error: err.message });
    }
} 

const listDimond = async (req, res) => {
    try {
        let data = await dimondModel.find();
        res.send({ status: true, data: data });

    } catch (err) {
        res.send({ status: false, message: msg.addDiamond.errors.invalid_param, error: err })
    }   
}


module.exports = { test, insertStoneGroup, findDimondPrice, findDimond, findOneDimond, updateDimond, addDiamond, listDimond }