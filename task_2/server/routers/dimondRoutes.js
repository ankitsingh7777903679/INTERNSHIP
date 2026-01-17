const express = require('express');
const { 
    test,findOneDimond, insertStoneGroup, findDimond, findDimondPrice, updateDimond, 
    addDiamond, listDimond, changeDimondStatus, deleteDimond, listOneDiamond, UpdateOneDiamond,
    minWeight
} = require('../controllers/dimond.controller');
const { verifyToken, checkAccess } = require('../middleware/authMiddleWare');
const DimondRouter = express.Router()

DimondRouter.get('/test', test)
DimondRouter.post('/insert', verifyToken, checkAccess('stoneGroup_write'), insertStoneGroup)
DimondRouter.get('/find',verifyToken, findDimond)
DimondRouter.get('/findOne/:id', verifyToken, findOneDimond)
DimondRouter.post('/findPrice', verifyToken, findDimondPrice)
DimondRouter.put('/update/:id', verifyToken, checkAccess('stoneGroup_update'), updateDimond)
DimondRouter.post('/addDimond', verifyToken, checkAccess('Diamond_write'), addDiamond)
DimondRouter.get('/listDimond',verifyToken, listDimond)
DimondRouter.put('/changeStatus/:id', verifyToken, checkAccess('Diamond_update'), changeDimondStatus)
DimondRouter.put('/deleteDiamond/:id', verifyToken, checkAccess('Diamond_delete'), deleteDimond)
DimondRouter.get('/listOneDimond/:id', listOneDiamond);
DimondRouter.put('/updateOneDiamond/:id', verifyToken, checkAccess('Diamond_update'), UpdateOneDiamond);
DimondRouter.get('/minWeight',verifyToken, minWeight);



module.exports = DimondRouter