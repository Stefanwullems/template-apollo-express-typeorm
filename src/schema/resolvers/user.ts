import User from "../../entity/User";
import Pet from "../../entity/Pet";

export const userQueries = {
  user: function(_, { id }) {
    return User.findOne(id);
  },

  users: function() {
    return User.find();
  }
};

export const userMutations = {
  signup: function(_, { input }) {
    return User.create(input).save();
  }
};

export const userRelations = {
  User: {
    addPet: async function({ id }, { input }) {
      console.log(input);
      const { petInput } = input;
      const user = await User.findOne(id);
      return Pet.create({ ...petInput, user }).save();
    },
    async pets({ id }) {
      const user = await User.findOne(id);
      return Pet.find({ where: { user } });
    }
  }
};
