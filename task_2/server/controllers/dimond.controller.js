const express = require('express');
const dimondModel = require('../models/dimond.model');
const { msg } = require('../utils/messages/api');
const { validationDimond } = require('../utils/validation/validation');
const { HTTP_RESPONSES } = require('../utils/constants');
const { validationDimondPrice } = require('../utils/validation/dimondPrice');

const test = (req, res) => {
    res.send("Hello from dimond controller")
}

const insertDimond = async (req, res) => {
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
        let data = await dimondModel.findOne({ shape, color, clarity, from, to });
        console.log("Found existing:", data);

        if (data) {
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists });
        }

        const dimond = new dimondModel({
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
            return res.send({ status: false, message: msg.dimond.insert.errors.dimond_exists });
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
        let { shape, color, clarity, size, weight } = req.body;

        let data = await dimondModel.findOne({ shape, color, clarity });
        // console.log(data.price);
        let totle = data.price * weight;
        // console.log(totle);
        res.send({ status: true, total_price: totle });

    } catch (err) {
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err })
    }


}

const findDimond = async (req, res) => {
    try {
        let data = await dimondModel.find();
        res.send({ status: true, data: data });

    } catch (err) {
        res.send({ status: false, message: msg.dimond.insert.errors.invalid_param, error: err })
    }


}


module.exports = { test, insertDimond, findDimondPrice, findDimond }