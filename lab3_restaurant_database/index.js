
const express = require("express"); 
const mongoose = require("mongoose");

const restaurantRoutes = require("./routes/routes");

const app = express();
const PORT = 3000;
const mongodbURL = process.env.MONGO_URL ?? "mongodb://localhost:27017/comp3133";

app.use("/restaurants", restaurantRoutes);

(async () => {
    try {
        await mongoose.connect(mongodbURL);
        console.log("Connected to mongoDB");
    }
    catch(err) {
        console.log("Error while connecting mongoDB:", err);
    }
})()

app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
})
