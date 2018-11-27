import { gql } from "apollo-server";

import user from "./user";
import pet from "./pet";

const query = gql`
  type Query {
    user(id: Int!): User
    users: [User]
    pet(id: Int!): Pet!
  }
`;

const mutation = gql`
  type Mutation {
    signup(input: UserInput!): User!
  }
`;

export default [user, pet, query, mutation];
