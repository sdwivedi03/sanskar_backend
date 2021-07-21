'use strict'

const masterDao = {}
const db = require("../models");

/**
 * Fee's CRUD
 */
 masterDao.readAllFeeCategory = async () => {
    try {
            return await db.Fee.findAll();
    } catch (error) {
        console.error(error);
    }
};

masterDao.createFeeCategory = async ( params ) => {
    try {
        return await db.Fee.create(params);
    } catch (error) {
        console.error(error);
    }
    console.log("fee category created:",feeCategory);
};

masterDao.deleteFeeCategoryById('/fee',async (req,res) => {
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
masterDao.readAllStandard('/standard',async (req,res) => {
    const students = await db.Standard.findAll();
    console.log("All student",students);
    res.json({data: students});
});

masterDao.createStandard('/standard',async (req,res) => {
    const standard = await db.Standard.create(req.body);
    console.log("student created:",standard);
    res.json({message:"standard created",data:standard});
});


masterDao.deleteStandardById('/standard',async (req,res) => {
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
masterDao.get('/fee-structure',async (req,res) => {
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

masterDao.post('/fee-structure',async (req,res) => {
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

module.exports = masterDao;