const express = require('express');
const { test,findOneDimond, insertStoneGroup, findDimond, findDimondPrice, updateDimond, addDiamond, listDimond } = require('../controllers/dimond.controller');
const DimondRouter = express.Router()

DimondRouter.get('/test', test)
DimondRouter.post('/insert', insertStoneGroup)
DimondRouter.get('/find', findDimond)
DimondRouter.get('/findOne/:id', findOneDimond)
DimondRouter.post('/findPrice', findDimondPrice)
DimondRouter.put('/update/:id', updateDimond)
DimondRouter.post('/addDimond', addDiamond)
DimondRouter.get('/listDimond', listDimond)
module.exports = DimondRouter