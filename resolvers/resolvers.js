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
    },
    Mutation: {
        addMovie: async (_, args) => {
            if (!args.name || !args.director_name || !args.production_house || args.release_date || args.rating) {
                throw new GraphQLError("All parameters are required", {
                    extensions: {
                        code: "MISSING_PARAM",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }
            let newMovie = new MovieModel({
                name: args.name,
                director_name: args.director_name,
                production_house: args.production_house,
                release_date: args.release_date,
                rating: args.rating
            })

            const movie = await newMovie.save()

            if (!movie) {
                throw new GraphQLError("Movie not inserted", {
                    extensions: {
                        code: "MOVIE_NOT_INSERTED",
                        field: 'new movie',
                        http: { status: 400 }
                    }
                });
            }
            return movie;
        },
        updateMovie: async (_, args) => {
            if (!args.id || !args.name || !args.director_name || !args.production_house || args.release_date || args.rating) {
                throw new GraphQLError("All parameters are required", {
                    extensions: {
                        code: "MISSING_PARAM",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }
            const movie = await MovieModel.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    director_name: args.director_name,
                    production_house: args.production_house,
                    release_date: args.release_date,
                    rating: args.rating
                },
                { new: false }
            )

            if (!movie) {
                throw new GraphQLError("Movie not updated", {
                    extensions: {
                        code: "MOVIE_NOT_UPDATED",
                        field: 'id',
                        http: { status: 400 }
                    }
                });
            }
            return movie
        },
        deleteMovie: async (_, args) => {
            if (!args.id) {
                throw new GraphQLError("Id parameter is required", {
                    extensions: {
                        code: "MISSING_PARAM",
                        field: 'id',
                        http: { status: 400 }
                    }
                });
            }
            const movie = await MovieModel.findByIdAndDelete(args.id)

            if (!movie) {
                throw new GraphQLError("Movie not deleted", {
                    extensions: {
                        code: "MOVIE_NOT_DELETED",
                        field: 'id',
                        http: { status: 400 }
                    }
                });
            }
            return movie;
        }
    }
}