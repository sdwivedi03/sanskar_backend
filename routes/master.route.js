const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();

const db = require("../models");

/**
 * Fee's CRUD
 */
 router.get('/fee',async (req,res) => {
    const students = await db.Fee.findAll();
    console.log("All fee");
    res.json({data: students});
});

router.post('/fee',async (req,res) => {
    // console.log("dskjdwsw",req.body);
    const feeCategory = await db.Fee.create(req.body);
    console.log("fee category created:",feeCategory);
    res.json({message:"fee category added",data:feeCategory});
});

router.delete('/fee',async (req,res) => {
    console.log("dskjdwsw",req.body);
    const student = await db.Fee.destroy({
        where: {
            id: req.body
        }
    });
    console.log("student created:",student);
    res.json({data:null});
});

/**
 * Standards's CRUD
 */
router.get('/standard',async (req,res) => {
    const students = await db.Standard.findAll();
    console.log("All student",students);
    res.json({data: students});
});

router.post('/standard',async (req,res) => {
    const standard = await db.Standard.create(req.body);
    console.log("student created:",standard);
    res.json({message:"standard created",data:standard});
});


router.delete('/standard',async (req,res) => {
    const standard = await db.Standard.destroy({
        where:{
            id: req.body.id
        }
    });
    console.log("student created:",standard);
    res.json({message:"standard deleted",data:standard});
});
/**
 * FeeStructure's CRUD
 */
router.get('/fee-structure',async (req,res) => {
    let params = req.query;
    const feeStructure = await db.FeeStructure.findAll({
        where: {
            year: params.year,
            standardId: params.standardId
        },
        include: [
            {
                model: db.Fee,
                as: 'fee'
            },
            {
                model: db.Standard,
                as: 'standard'
            }
        ]
    });
    console.log("Fee Structure",feeStructure);
    res.json({data:feeStructure});
});

router.post('/fee-structure',async (req,res) => {
    console.log("req------------------------->>>>>>>>>>>>>>",req.body);
    if(!req.body || req.body < 1) return res.status(400).json({message:"Invalid Request!"});
    params = req.body;
    console.log("rrfee strytt", params);
    const feeStructureArray = params.feeStructure;
    for(let i = 0; i < feeStructureArray.length; i++){
        feeStructureArray[i].standardId = params.standardId;
        feeStructureArray[i].year = params.year;
    }
    const feeStructure = await db.FeeStructure.bulkCreate(feeStructureArray);
    console.log("Fee structure created:",feeStructure);
    res.json({message:"Fee structure created",data: feeStructure});
});

router.delete('/fee-structure',async (req,res) => {
    console.log("req------------------------->>>>>>>>>>>>>>",req.body);
    const id = req.body.id;
    const deletedItem = await db.FeeStructure.destroy(feeStructureArray);
    console.log("Fee structure created:",deletedItem);
    res.json({message:"Fee structure created",data: deletedItem});
});

/**
 * Standards's CRUD
 */
 router.get('/session',async (req,res) => {
    const feeStructure = await db.FeeStructure.findAll({
        atttribute: [sequelize.fn('DISTINCT', 'year'), 'year'],
        where: {

        },
        raw: true
    });
    const sessions = feeStructure.map(obj => obj.year)
    console.log("All sessions",sessions);
    res.json({data: sessions});
});

module.exports = router;