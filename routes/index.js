var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();
const db = require("../models");

/**
 * Student's CRUD
 */
router.get('/student/:id',async (req,res) => {
    const student = await db.Student.findByPk(req.params.id,{
        attributes: [
            'id',
            'name',
            'gender',
            'healthStatus',
            'nationality',
            'dateOfBirth',
            'convenience',
            'bloodGroup'
        ],
        include:[{
            attributes: [
                'id',
                'name'
            ],
            model: db.Standard,
            required: true
        },{
            model: db.Parents,
        }],
        raw:false
    });
    
    res.status(200).json({message: "student record",data:[]});
});

router.get('/student',async (req,res) => {
    db.Standard.hasMany(db.Student,{
        foreignKey: 'standardId',
    });
    db.Student.belongsTo(db.Standard,{
        foreignKey: 'standardId',
    });
    const students = await db.Student.findAll({
        attributes: [
            'id',
            'name',
            'gender',
            'healthStatus',
            'nationality',
            'dateOfBirth',
            'convenience',
            'bloodGroup',
            sequelize.col('Parents')
        ],
        include:{
            attributes: [
                'id',
                'name'
            ],
            model: db.Standard,
            required: true  //Apply inner join, defaults to outer join
        },
        raw: false
    });
    console.log("All student",students);
    res.json({message:"",data: students});
});

router.post('/student',async (req,res) => {
    const student = await db.Student.create(req.body);
    console.log("student created:");
    res.json({message:"student registered successfully",data:student});
});


/**
 * Fee's CRUD
 */
router.get('/master/fee',async (req,res) => {
    const students = await db.Fee.findAll();
    console.log("All fee");
    res.json({data: students});
});

router.post('/master/fee',async (req,res) => {
    // console.log("dskjdwsw",req.body);
    const feeCategory = await db.Fee.create(req.body);
    console.log("fee category created:",feeCategory);
    res.json({message:"fee category added",data:feeCategory});
});

router.delete('/master/fee',async (req,res) => {
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
router.get('/master/standard',async (req,res) => {
    const students = await db.Standard.findAll();
    console.log("All student",students);
    res.json({data: students});
});

router.post('/master/standard',async (req,res) => {
    const standard = await db.Standard.create(req.body);
    console.log("student created:",standard);
    res.json({message:"standard created",data:standard});
});


router.delete('/master/standard',async (req,res) => {
    const standard = await db.Standard.destroy({
        where:{
            id:req.body.id
        }
    });
    console.log("student created:",standard);
    res.json({message:"standard deleted",data:standard});
});
/**
 * FeeStructure's CRUD
 */
router.get('/master/fee-structure',async (req,res) => {
    const feeStructure = await db.FeeStructure.findAll();
    console.log("Fee Structure",feeStructure);
    res.json({data:feeStructure});
});

router.post('/master/fee-structure',async (req,res) => {
    console.log("req------------------------->>>>>>>>>>>>>>",req.body);
    if(!req.body || req.body < 1) return res.status(400).json({message:"Invalid Request!"});
    const feeStructure = await db.FeeStructure.create(req.body);
    console.log("Fee structure created:",feeStructure);
    res.json({message:"Fee structure created",data: feeStructure});
});


/**
 * Parents's CRUD
 */
router.get('/student/:id/parents',async (req,res) => {
    const parents = await db.FeeStructure.findAll({
        where:{
            studentId: req.params.id
        }
    });
    console.log("All parents",parents);
    res.json({data: parents});
});

router.post('/student/:id/parents',async (req,res) => {
    req.body.studentId = req.params.id;
    const parents = await db.Parents.create(req.body);
    console.log("parents created:",parents);
    res.json({message:"parents added for student",data:parents});
});


/**
 * Address's CRUD
 */
router.get('/student/:id/address',async (req,res) => {
    const address = await db.FeeStructure.findAll({
        where:{
            studentId: req.params.id
        }
    });
    console.log("All student",address);
    res.json({data: address});
});

router.post('/student/:id/address',async (req,res) => {
    req.body.studentId = req.params.id;
    const address = await db.Address.create(req.body);
    console.log("parents created:",address);
    res.json({message:"parents added for student",data:address});
});

module.exports = router;