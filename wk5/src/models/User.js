import mongoose from 'mongoose';

const geoSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    }
});

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        match: [/[a-zA-Z]+[a-zA-Z ]*/, 'Please fill a valid city name']
    },
    zipcode: {
        type: String,
        required: true,
        match: [/^\d{5}-\d{4}$/, 'Please fill a valid zipcode']
    },
    geo: geoSchema
})

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true
    },
    bs: {
        type: String,
        required: true
    }
});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    address: addressSchema,
    website: {
        type: String,
        required: true,
        match: [/https?:\/\/.+\..+/, 'Please fill a valid URL']
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{1}-\d{3}-\d{3}-\d{4}$/, 'Please fill a valid phone number']
    },
    company: companySchema
});

export default mongoose.model('User', UserSchema);