import MovieModel from '../models/movie.js';

// Resolvers define the technique for fetching the types defined in the schema.

const movieResolvers = {
    Query: {
        getMovies: async () => {
            const movies = await MovieModel.find({});

            if (!movies) {
                throw new GraphQLError("Movies not found", {
                    extensions: {
                        code: "MOVIES_NOT_FOUND",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }

            return movies
        },
        getMovieById: async (_, args) => {
            if (!args.id) {
                throw new GraphQLError("Id parameter is required", {
                    extensions: {
                        code: "MISSING_ID_PARAM",
                        field: 'id',
                        http: { status: 400 }
                    }
                });
            }
            const movie = await MovieModel.findById({ _id: args.id })

            if (!movie) {
                throw new GraphQLError("movie not found", {
                    extensions: {
                        code: "MOVIE_NOT_FOUND",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }
            return movie;
        },
        getMoviesByDirector: async (_, args) => {
            if (!args.director_name) {
                throw new GraphQLError("Director name parameter is required", {
                    extensions: {
                        code: "MISSING_DIRECTOR_NAME_PARAM",
                        field: 'director_name',
                        http: { status: 400 }
                    }
                });
            }
            const movies = await MovieModel.findByDirector(args.director_name);

            if (!movies) {
                throw new GraphQLError("Movies not found", {
                    extensions: {
                        code: "MOVIES_NOT_FOUND",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }
            return movies;
        }
    }
}