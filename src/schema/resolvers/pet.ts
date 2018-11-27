import Pet from "../../entity/Pet";

export const petQueries = {
  pet: function(_, { id }) {
    return Pet.findOne(id);
  }
};

export const petRelations = {
  Pet: {
    user: async function({ id }) {
      const pet = await Pet.findOne({ where: { id }, relations: ["user"] });
      return pet.user;
    }
  }
};
