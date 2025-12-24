const express = require('express');
const { test, insertDimond, findDimond, findDimondPrice } = require('../controllers/dimond.controller');
const DimondRouter = express.Router()

DimondRouter.get('/test', test)
DimondRouter.post('/insert', insertDimond)
DimondRouter.get('/find', findDimond)
DimondRouter.post('/findPrice', findDimondPrice)
module.exports = DimondRouter