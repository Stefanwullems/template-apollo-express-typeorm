import { gql } from "apollo-server";

export default gql`
  type Pet {
    id: Int!
    name: String!
    kind: Kind!
    user: User!
  }

  enum Kind {
    CAT
    DOG
    HORSE
  }

  input PetInput {
    name: String!
    kind: Kind!
  }
`;
