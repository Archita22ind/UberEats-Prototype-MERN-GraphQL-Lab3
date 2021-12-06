const graphql = require("graphql");
const con = require("../Controller/Common/dbConnection");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// user types
const CustomerProfile = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    customerID: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    contactNumber: { type: GraphQLString },
    nickname: { type: GraphQLString },
    email: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    about: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    password: { type: GraphQLString },
    successFlag: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    loginCustomer: {
      type: CustomerProfile,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        console.log("inside resolve loginCustomer");
        return new Promise((resolve, reject) => {
          console.log("inside login");
          let sqlSelect = `SELECT PasswordValue, CustomerID  from CustomerDetails where EmailID = ?`;
          console.log("inside sql login", args.email, args.password);
          try {
            con.query(sqlSelect, [args.email], (err, result) => {
              if (err) {
                console.log("error: ", err);
                throw err;
              }

              if (result[0]?.PasswordValue === args.password) {
                console.log("Logged in", result, args.password);
                resolve({
                  successFlag: true,
                  customerID: result[0].CustomerID,
                });
              } else {
                reject({ error: "Incorrect Email ID or Password Login!" });
              }
            });
          } catch (exception) {
            res.sendStatus(500);
          }
        });
      },
    },
    // reject() {
    //   console.log("in reject login");
    // },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: CustomerProfile,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        country: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        emailId: { type: GraphQLString },
      },

      resolve(_, args) {
        // args.password = passwordHash.generate( args.password );
        return new Promise((resolve, reject) => {
          let checkSql = `SELECT * FROM CustomerDetails where EmailID = ?`;

          con.query(checkSql, [args.emailId], (err, result1) => {
            if (err) throw err;
            if (result1.length > 0) {
              // res.sendStatus(409);
              reject({ status: 409 });
            } else {
              let sql =
                "INSERT INTO CustomerDetails (LastName, FirstName, PasswordValue, Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?)";

              con.query(
                sql,
                [
                  args.lastName,
                  args.firstName,
                  args.password,
                  args.country,
                  args.contactNumber,
                  args.emailId,
                ],
                (err, result) => {
                  if (err) throw err;

                  resolve({
                    customerID: result.insertId,
                  });
                }
              );
            }
          });
        });
      },
    },

    updateCustomer: {
      type: CustomerProfile,
      args: {
        customerId: { type: GraphQLInt },
        lastName: { type: GraphQLString },
        firstName: { type: GraphQLString },
        emailId: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        nickname: { type: GraphQLString },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        zipCode: { type: GraphQLInt },
        about: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          con.query(
            `SELECT * FROM CustomerDetails WHERE CustomerID = ?`,
            [args.customerId],
            (err, result) => {
              // if (err) throw err;

              if (result.length == 1) {
                let currentValues = result[0];
                let updateSql;
                // let updateImage;

                updateSql = `UPDATE CustomerDetails SET  LastName = ?, FirstName= ?,PasswordValue=?, AddressLine1=?,AddressLine2=?,City=? ,State =?, Country=?,ZipCode=?, NickName=? , ContactNumber=? ,EmailID=? ,DateOfBirth=?, About=? , ProfilePicture=? WHERE  CustomerID = ?`;

                // if (args?.filename) updateImage = args.filename;
                // else updateImage = currentValues.FoodImage;

                let data = [
                  args.lastName,
                  args.firstName,
                  args.password || currentValues.PasswordValue,
                  args.address1,
                  args.address2,
                  args.city,
                  args.state,
                  args.country,
                  args.zipCode,
                  args.nickname,
                  args.contactNumber,
                  args.emailId,
                  args.dateOfBirth,
                  args.about,
                  args.profilePicture,
                  args.customerId,
                ];

                console.log(data);

                con.query(updateSql, data, (err, result) => {
                  if (err) throw err;

                  if (result) {
                    resolve({ customerID: result.customerID });
                  }
                });
              }
            }
          );
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
