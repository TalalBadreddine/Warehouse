const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner')



// POST request to add a car
const addWarehouseOwner = async (req, res) => {
    try{
        const  warehouseOwner=req.body;
        const result = await warehouseOwnerModel.create(warehouseOwner);
        if(result){
            res.status(201).json({message:"added WareHouseOwner"})
        }else{
            res.status(409).json({message:"failed to add WareHouseOwner"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({message:"internal error"})
    
    }
}
// GET request for a list of all cars
const getWarehouseOwner = async (req, res) => {
    try{
        const Email=req.query.Email
        const Password=req.query.Password;
        
        const filters ={}

        // if(maker){
        //     filters.maker=maker
        // } or the syntax below

        Email && (filters.Email=Email)
        Password && (filters.Password=Password)
        
    const warehouseOwner= await warehouseOwnerModel.find(filters);
    if (warehouseOwner){
        res.status(200).json(warehouseOwner);
    }}
    catch(error){
        res.status(500).json({message : "internal error"})

    }
    }


    // DELETE request to delete a WarehouseOwner
const deleteWarehouseOwner = async (req, res) => {warehouseOwnerModel.findByIdAndRemove(req.params.id, (err, data) => {
    if(!err) {
        // res.send(data);
        res.status(200).json({code: 200, message: 'WareHouseOwner deleted', deleteWarehouseOwner: data})
    } else {
        console.log(err);
    }
});
}


module.exports = {addWarehouseOwner,getWarehouseOwner,deleteWarehouseOwner}