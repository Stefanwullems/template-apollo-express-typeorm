import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    addPet(input: PetInput): Pet!
    pets: [Pet]
  }

  input UserInput {
    name: String!
  }
`;
