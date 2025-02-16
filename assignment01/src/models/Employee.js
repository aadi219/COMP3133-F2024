import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    designation: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    date_of_joining: {
        type: Date,
        required: true,
    },
    employee_photo: {
        type: String,
    },
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;