const express = require('express');
const router = express.Router();

const db = require("../models");

/**
 * Student's CRUD
 */
 router.get('/:id',async (req,res) => {
    const student = await db.Student.findByPk(req.params.id,{
        attributes: [
            'id',
            'name',
            'gender',
            'healthStatus',
            'nationality',
            'place',
            'image',
            'dateOfBirth',
            'convenience',
            'bloodGroup',
        ],
        include:[
            {
                // attributes: [
                //     ['name','standard']
                // ],
                model: db.Standard,
                as: 'standard',
                required: true
            },
            {
                model: db.Parents,
                as: 'parents',
                required: false
            },
            {
                model: db.Address,
                as: 'address',
                required: false
            },
            {
                model: db.FeeStructure,
                as: 'feeStructures',
                required: false
            },
            {
                model: db.FeeTransaction,
                as: 'submitedFees',
                required: false
            }
        ],
        raw: false
    });
    
    res.status(200).json({message: "student record",data: student});
});

router.put('/:id',async (req,res) => {
    console.log("update student",req.body)
    const student = await db.Student.update(req.body,{
        where: {
            id: req.params.id
        }
    });
    console.log("student updated:");
    res.json({ message:"student record updated successfully", data:student});
});

router.get('',async (req,res) => {
    db.Standard.hasMany(db.Student,{
        foreignKey: 'standardId',
    });
    db.Student.belongsTo(db.Standard,{
        foreignKey: 'standardId',
    });
    db.Student.hasOne(db.Parents,{
        foreignKey: 'studentId',
    });
    db.Parents.belongsTo(db.Student,{
        foreignKey: 'studentId',
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
        ],
        include: [
            {
                attributes: [
                    'id',
                    'name'
                ],
                model: db.Standard,
                required: true
            },
            {
                attributes: [
                    'fatherName'
                ],
                model: db.Parents,
                required: false
            }
        ],
        raw: true
    });
    console.log("All student",students);
    res.json({message:"",data: students});
});

router.post('',async (req,res) => {
    const student = await db.Student.create(req.body);
    console.log("student created:");
    res.json({message:"student registered successfully",data:student});
});


/**
 * Parents's CRUD
 */
router.get('/:id/parents',async (req,res) => {
    const parents = await db.Parents.findAll({
        where:{
            studentId: req.params.id
        }
    });
    console.log("All parents",parents);
    res.json({data: parents});
});

router.post('/:id/parents',async (req,res) => {
    req.body.studentId = req.params.id;
    const parents = await db.Parents.create(req.body);
    console.log("parents created:",parents);
    res.json({message:"parents added for student",data:parents});
});

router.put('/:id/parents',async (req,res) => {
    // req.body.studentId = req.params.id;
    const parents = await db.Parents.update(req.body,{
        where: {
            studentId: req.params.id
        }
    });
    console.log("parents created:",parents);
    res.json({ message:"parents updated for student",data: parents });
});


/**
 * Address's CRUD
 */
router.get('/:id/address',async (req,res) => {
    const address = await db.Address.findAll({
        where:{
            studentId: req.params.id
        }
    });
    console.log("All student",address);
    res.json({data: address});
});

router.post('/:id/address',async (req,res) => {
    let params = req.body;
    params[1].studentId = params[0].studentId = req.params.id;
    console.log("aaadddreess1",params);

    params[0].pin = +params[0].pin;
    params[1].pin = +params[1].pin;
    console.log("aaadddreess",params);
    const address = await db.Address.bulkCreate(params);
    console.log("Address saved:");
    res.json({message:"address of student has been saved",data:address});
});

router.put('/:id/address',async (req,res) => {
    let params = req.body;
    params[1].studentId = params[0].studentId = req.params.id;
    console.log("aaadddreess1",params);

    params[0].pin = +params[0].pin;
    params[1].pin = +params[1].pin;
    console.log("aaadddreess",params);
    await db.Address.update(params[0],{
        where: {
            id: req.params.id,
            addressType: params[0].addressType
        }
    });

    await db.Address.update(params[1],{
        where: {
            studentId: req.params.id,
            addressType: params[1].addressType
        }
    });
    console.log("Address saved:");
    res.json( { message:"address of student has been updated" });
});

/**
 * Student's Fee Submission CRUD
 */
 router.get('/:id/fee-detail',async (req,res) => {
    // db.Student.hasMany(db.FeeStructure, {foreignKey: standardId});
    const feeDetail = await db.Student.findOne({
        attributes: [
            ['id', 'studentId'],
            // [sequelize.fn('COUNT', sequelize.col('submitedFees.amount')), 'depositedFee']
        ],
        include: [
            {
                model: db.FeeStructure,
                as: 'feeStructures',
                include: {
                    model: db.Fee,
                    as: 'fee',
                    required: true,
                    raw: false

                },
                raw: false

            },
            {
                model: db.FeeTransaction,
                as: 'submitedFees',  
                raw: false
 
            },
        ],
        where:{
            id: req.params.id,
            // year: '2020-2021',
        },
        raw: false
        // groupBy: ['id', 'feeStructures']
    });

    console.log("Student's fee detail",feeDetail);
    let submitedFees = feeDetail.dataValues.submitedFees;
    let totalDeposited = 0;
    for(let i = 0; i < submitedFees; i++){
        totalDeposited += submitedFees[i].amount;
    }
    delete feeDetail.dataValues.submitedFees;
    feeDetail.dataValues.totalDeposited = totalDeposited;
    res.json({data: feeDetail});
});

router.post('/:id/fee-deposit',async (req,res) => {
    req.body.studentId = req.params.id;
    const parents = await db.FeeTransaction.create(req.body);
    console.log("fee submitted:",parents);
    res.json({message:"fee submitted for student",data:parents});
});

router.put('/:id/parents',async (req,res) => {
    // req.body.studentId = req.params.id;
    const parents = await db.Parents.update(req.body,{
        where: {
            studentId: req.params.id
        }
    });
    console.log("parents created:",parents);
    res.json({ message:"parents updated for student",data: parents });
});

module.exports = router;