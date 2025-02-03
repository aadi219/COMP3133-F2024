
const mongoose = require("mongoose");
const router = require("express").Router();
const Restaurant = require("../models/restaurant");

// get all restaurants 
router.get('/', async (req, res) => {
    const result = await Restaurant.find({});
    return res.json(result);
})

// get by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
    const result = await Restaurant.find({
        cuisine: req.params.cuisine
    });
    return res.json(result);
})

// get sorted
router.get('/', async (req, res) => {
    const order = req.query.sortBy == "ASC" ? 1 : -1;
    const result = await Restaurant.find({}, "_id name city cuisine restaurant_id").sort({name: order});
    return res.json(result);
})

// get Delicatessen
router.get('/cuisine/Delicatessen', async (req, res) => {
    const result = await Restaurant.find({
        cuisine: "Delicatessen",
        city: {
            $ne: "Brooklyn"
        }
    });
    return res.json(result);
})

module.exports = router;
