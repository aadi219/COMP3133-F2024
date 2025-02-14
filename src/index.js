import schema from './schema.js';
import { graphql } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3133_101412150_assignment1';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error(err);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});