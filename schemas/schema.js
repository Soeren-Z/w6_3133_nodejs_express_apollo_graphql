import { gql } from 'graphql-tag';

const movieSchema = gql`
    
    type Movie {
        id: String!
        name: String
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Float!
    }

    type Query {
        getMovies: [Movie]
        getMovieById(id: String): Movie
        getMoviesByDirector(director_name: String!): [Movie]
    }

    type Mutation {
        addMovie(
            name: String
            director_name: String!
            production_house: String!
            release_date: String!
            rating: Float!
        ) : Movie

        updateMovie(
            id: String!
            name: String
            director_name: String!
            production_house: String!
            release_date: String!
            rating: Float!
        ) : Movie

        deleteMovie(id: String!): Movie
    }
`;

export default movieSchema;