import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
        const user = await User.findById(id);
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});

router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        website: req.body.website,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        company: req.body.company
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ messages: errorMessages });
    }
})

export default router;