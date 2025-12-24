const express = require('express');
const dimondModel = require('../models/dimond.model');
const { msg } = require('../utils/messages/api');

const test = (req, res) => {
    res.send("Hello from dimond controller")
}

const insertDimond = async (req, res) => {
    // try {
        let { shape, color, clarity, from, to, price } = req.body;

        // Check if exact combination exists
        let data = await dimondModel.findOne({ shape, color, clarity, from, to });
        console.log("Found existing:", data);
        
        if(data){
            return res.send({ status: false, message: "Diamond with this shape/color/clarity/from/to already exists" })
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
        res.send({ status: true, message: "Diamond inserted successfully" })
    // } catch (err) {
    //     console.log("Insert error:", err);
    //     if (err.code === 11000) {
    //         return res.send({ status: false, message: "Diamond with this shape/color/clarity/from/to already exists" })
    //     }
    //     res.send({ status: false, message: "Failed to insert diamond data", error: err.message })
    // }

}

const findDimondPrice = async (req, res) => {
    try {
        let { shape, color, clarity, size, weight } = req.body;

        let data = await dimondModel.findOne({ shape, color, clarity });
        // console.log(data.price);
        let totle = data.price * weight;
        // console.log(totle);
        res.send({ status: true, total_price: totle } );

    } catch (err) {
        res.send({ status: false, message: "Error occurred", error: err })
    }


}

const findDimond = async (req, res) => {
    try {
        let data = await dimondModel.find();
        res.send({ status: true, data: data });

    } catch (err) {
        res.send({ status: false, message: "Error occurred", error: err })
    }


}


module.exports = { test, insertDimond, findDimondPrice, findDimond }