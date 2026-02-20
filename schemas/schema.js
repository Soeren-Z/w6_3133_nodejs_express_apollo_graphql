import { gql } from 'graphql-tag';

const movieSchema = gql`
    
    type Movie {
        id: String!
        name: String
        director_name: String!
        production_house: String!
        release_date: String!
        rating: FlOAT!
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
            rating: FlOAT!
        )

        updateMovie(
            name: String
            director_name: String!
            production_house: String!
            release_date: String!
            rating: FlOAT!
        )

        deleteMovie(id: String!): Movie
    }
`;

export default movieSchema;