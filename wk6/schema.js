const { gql } = require('apollo-server-express');
const Movie = require('./models/Movie');

const typeDefs = `
    type Movie {
        id: ID!
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Float!
    },
    type Query {

        getAllMovies: [Movie]
        getMovie(id: ID!): Movie
    },
    type Mutation {
        createMovie(name: String!, director_name: String!, production_house: String!, release_date: String!, rating: Float!): Movie
        updateMovie(id: ID!, name: String!, director_name: String!, production_house: String!, release_date: String!, rating: Float!): Movie
        deleteMovie(id: ID!): Movie
    }
`;

module.exports = typeDefs;