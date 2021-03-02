import {gql} from 'apollo-server-express';


export const resolvers = {
  Query: {
    // @ts-ignore
    users: async (_, {}, { dataSources }) => await dataSources.userAPI.getUsers(),
  },
};

export const typeDefs = gql`

  type User {
    _id: ID!
    name: String!
    secret: String!
    admin: Boolean
  }
  
  type Query {
    users: [User]
  }
  
`;
