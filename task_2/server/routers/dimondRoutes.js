const express = require('express');
const { 
    test,findOneDimond, insertStoneGroup, findDimond, findDimondPrice, updateDimond, 
    addDiamond, listDimond, changeDimondStatus, deleteDimond, listOneDiamond, UpdateOneDiamond,
    minWeight
} = require('../controllers/dimond.controller');
const DimondRouter = express.Router()

DimondRouter.get('/test', test)
DimondRouter.post('/insert', insertStoneGroup)
DimondRouter.get('/find', findDimond)
DimondRouter.get('/findOne/:id', findOneDimond)
DimondRouter.post('/findPrice', findDimondPrice)
DimondRouter.put('/update/:id', updateDimond)
DimondRouter.post('/addDimond', addDiamond)
DimondRouter.get('/listDimond', listDimond)
DimondRouter.put('/changeStatus/:id', changeDimondStatus)
DimondRouter.put('/deleteDiamond/:id', deleteDimond)
DimondRouter.get('/listOneDimond/:id', listOneDiamond);
DimondRouter.put('/updateOneDiamond/:id', UpdateOneDiamond);
DimondRouter.get('/minWeight', minWeight);

module.exports = DimondRouter