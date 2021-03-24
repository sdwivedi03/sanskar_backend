var express = require('express');
var router = express.Router();
const db = require("../models");

/**
 * Student's CRUD
 */
router.get('/student/:id',async (req,res) => {
    const student = await db.Student.findByPk(req.params.id);
    
   //console.log("Student:",req);
    res.json({message: "student record",data:student});
});

router.get('/student',async (req,res) => {
    const students = await db.Student.findAll();
    console.log("All student",students);
    res.json({data: students});
});

router.post('/student',async (req,res) => {
    const student = await db.Student.create(req.body);
    console.log("student created:",student);
    res.json({data:null});
});


/**
 * Fee's CRUD
 */
router.get('/master/fee',async (req,res) => {
    const students = await db.Fee.findAll();
    console.log("All student",students);
    res.json({data: students});
});

router.post('/master/fee',async (req,res) => {
    console.log("dskjdwsw",req.body);
    const student = await db.Fee.create(req.body);
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
    const student = await db.Standard.create(req.body);
    console.log("student created:",student);
    res.json({data:null});
});

/**
 * FeeStructure's CRUD
 */
router.get('/master/fee-structure',async (req,res) => {
    const students = await db.FeeStructure.findAll();
    console.log("All student",students);
    res.json({data: students});
});

router.post('/master/fee-structure',async (req,res) => {
    const student = await db.FeeStructure.create(req.body);
    console.log("student created:",student);
    res.json({data:null});
});


/**
 * Parents's CRUD
 */
router.get('/student/:id/parents',async (req,res) => {
    const students = await db.FeeStructure.findAll({
        where:{
            studentId: req.params.id
        }
    });
    console.log("All student",students);
    res.json({data: students});
});

router.post('/student/:id/parents',async (req,res) => {
    req.body.studentId = req.params.id;
    const student = await db.FeeStructure.create(req.body);
    console.log("student created:",student);
    res.json({data:null});
});


module.exports = router;