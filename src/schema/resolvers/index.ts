import { userQueries, userMutations, userRelations } from "./user";
import { petQueries, petRelations } from "./pet";

export default {
  Query: {
    ...userQueries,
    ...petQueries
  },
  Mutation: {
    ...userMutations
  },
  ...userRelations,
  ...petRelations
};
