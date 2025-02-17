const Movie = require('./models/Movie');

const resolvers = {
    Query: {
        getAllMovies: () => {
            return Movie.find();
        },
        getMovie: (parent, args) => {
            return Movie.findById(args.id);
        }
    },
    Mutation: {
        createMovie: async (parent, args) => {
            const movie = new Movie(args);
            return await movie.save();
        },
        updateMovie: async (parent, args) => {
            const movie = await Movie.findByIdAndUpdate(args.id, args, { new: true });
            return movie;
        },
        deleteMovie: async (parent, args) => {
            const movie = await Movie.findByIdAndDelete(args.id);
            return movie;
        }
    }
};

module.exports = resolvers;