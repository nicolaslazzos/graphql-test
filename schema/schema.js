const graphql = require("graphql");
// const _ = require("lodash");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// const users = [
//   { id: "1", name: "Nico", age: 24 },
//   { id: "2", name: "Agus", age: 23 },
//   { id: "3", name: "Manu", age: 23 },
//   { id: "4", name: "Franco", age: 22 },
//   { id: "5", name: "Juan", age: 26 },
// ];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { 
      type: CompanyType,
      resolve(parentValue, args) {
        // console.log(parentValue, args)
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then((res) => res.data);
      }
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // specify the arguments required to query users
      resolve(parentValue, args) {
        // return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`).then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
