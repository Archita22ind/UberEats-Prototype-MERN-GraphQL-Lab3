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
  GraphQLFloat,
  GraphQL,
} = graphql;

// user types
const CustomerProfile = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    customerId: { type: GraphQLInt },
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
    emailId: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    password: { type: GraphQLString },
    successFlag: { type: GraphQLString },
  }),
});

const RestaurantProfile = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    restaurantId: { type: GraphQLInt },
    restaurantName: { type: GraphQLString },
    emailId: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    country: { type: GraphQLString },
    contactNumber: { type: GraphQLString },
    password: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    openTime: { type: GraphQLString },
    closeTime: { type: GraphQLString },
    deliveryFlag: { type: GraphQLString },
    pickupFlag: { type: GraphQLString },
    successFlag: { type: GraphQLString },
  }),
});

const FoodItems = new GraphQLObjectType({
  name: "FoodItems",
  fields: () => ({
    restaurantId: { type: GraphQLInt },
    foodName: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    foodType: { type: GraphQLString },
    foodCategory: { type: GraphQLString },
    mainIngredients: { type: GraphQLString },
    cuisineType: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const OrderHistory = new GraphQLObjectType({
  name: "OrderHistory",
  fields: () => ({
    orderId: { type: GraphQLInt },
    restaurantId: { type: GraphQLInt },
    restaurantName: { type: GraphQLString },
    customerId: { type: GraphQLInt },
    totalPrice: { type: GraphQLFloat },
    totalItems: { type: GraphQLInt },
    deliveryAddress: { type: GraphQLString },
    dateOrdered: { type: GraphQLString },
    deliveryOrPickup: { type: GraphQLString },
    orderStatus: { type: GraphQLString },
  }),
});

const OrderHistoryDetails = new GraphQLObjectType({
  name: "OrderHistoryDetails",
  fields: () => ({
    orderDetailsId: { type: GraphQLInt },
    orderId: { type: GraphQLInt },
    restaurantId: { type: GraphQLInt },
    customerId: { type: GraphQLInt },
    foodId: { type: GraphQLInt },
    foodName: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    amount: { type: GraphQLFloat },
    restaurantName: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    loginCustomer: {
      type: CustomerProfile,
      args: {
        emailId: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        console.log("inside resolve loginCustomer");
        return new Promise((resolve, reject) => {
          console.log("inside login");
          let sqlSelect = `SELECT PasswordValue, CustomerID  from CustomerDetails where EmailID = ?`;
          console.log("inside sql login", args.emailId, args.password);
          try {
            con.query(sqlSelect, [args.emailId], (err, result) => {
              if (err) {
                console.log("error: ", err);
                throw err;
              }

              if (result[0]?.PasswordValue === args.password) {
                console.log("Logged in", result, args.password);
                resolve({
                  successFlag: true,
                  customerId: result[0].CustomerID,
                });
              } else {
                reject({ error: "Incorrect Email ID or Password Login!" });
              }
            });
          } catch (exception) {
            reject({ error: exception });
          }
        });
      },
    },

    loginRestaurant: {
      type: RestaurantProfile,
      args: {
        emailId: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT PasswordValue, RestaurantID  from RestaurantDetails where EmailID = ?`;
          try {
            con.query(sqlSelect, [args.emailId], (err, result) => {
              if (err) throw err;

              if (result[0]?.PasswordValue == args.password) {
                resolve({
                  successFlag: true,
                  restaurantId: result[0]?.RestaurantID,
                });
              } else {
                reject({ error: "Incorrect Email ID or Password Login!" });
              }
            });
          } catch (exception) {
            reject({ error: exception });
          }
        });
      },
    },

    getCustomer: {
      type: CustomerProfile,
      args: {
        customerId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT  * FROM CustomerDetails where CustomerID = ?`;

          con.query(sqlSelect, [args.customerId], (err, result) => {
            if (result) {
              resolve({
                lastName: result[0].LastName,
                firstName: result[0].FirstName,
                password: result[0].PasswordValue,
                addressLine1: result[0].AddressLine1,
                addressLine2: result[0].AddressLine2,
                city: result[0].City,
                state: result[0].State,
                country: result[0].Country,
                zipcode: result[0].ZipCode,
                nickname: result[0].NickName,
                contactNumber: result[0].ContactNumber,
                emailId: result[0].EmailID,
                dateOfBirth: result[0].DateOfBirth,
                about: result[0].About,
                image: result[0].ProfilePicture,
              });
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getRestaurantDetails: {
      type: RestaurantProfile,
      args: {
        restaurantId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT  RestaurantID, RestaurantName, Address, About, City, State, ZipCode, Country, 
          ContactNumber, EmailID, ProfilePicture,OpenTime,CloseTime,DeliveryFlag,PickupFlag
           FROM  RestaurantDetails where RestaurantID = ?`;

          con.query(sqlSelect, [args.restaurantId], (err, result) => {
            if (result.length > 0) {
              resolve({
                restaurantId: result[0].RestaurantID,
                restaurantName: result[0].RestaurantName,
                address: result[0].Address,
                about: result[0].About,
                city: result[0].City,
                state: result[0].State,
                zipcode: result[0].ZipCode,
                country: result[0].Country,
                contactNumber: result[0].ContactNumber,
                emailId: result[0].EmailID,
                image: result[0].ProfilePicture,
                openTime: result[0].OpenTime,
                closeTime: result[0].CloseTime,
                deliveryFlag: result[0].DeliveryFlag,
                pickupFlag: result[0].PickupFlag,
              });
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getReceiptDetails: {
      type: new GraphQLList(OrderHistoryDetails),
      args: {
        orderId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT  FoodName, Price, Quantity FROM OrderDetails where OrderId = (?) `;

          con.query(sqlSelect, [args.orderId], (err, result) => {
            if (result) {
              resolve(
                result.map((element) => {
                  return {
                    foodName: element.FoodName,
                    price: element.Price,
                    quantity: element.Quantity,
                  };
                })
              );
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getPastOrders: {
      type: new GraphQLList(OrderHistory),
      args: {
        customerId: { type: GraphQLInt },
        orderStatus: { type: GraphQLString },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect;
          let columnArray;

          if (args.orderStatus.length === 0) {
            sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
   and O.CustomerID = (?) `;
            columnArray = [args.customerId];
          } else {
            sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered , O.FinalStatus from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
    and O.CustomerID = (?)  AND FinalStatus = (?)`;
            columnArray = [args.customerId, args.orderStatus];
          }

          con.query(sqlSelect, columnArray, (err, result) => {
            if (err) reject({ error: err });
            if (result) {
              resolve(
                result.map((element) => {
                  return {
                    restaurantName: element.RestaurantName,
                    orderId: element.OrderId,
                    totalPrice: element.TotalPrice,
                    dateOrdered: element.DateOrdered,
                    totalItems: element.TotalQuantity,
                    orderStatus: element.FinalStatus,
                  };
                })
              );
            }
          });
        });
      },
    },

    getCustomerLocation: {
      type: CustomerProfile,
      args: {
        customerId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT City from CustomerDetails where CustomerID=?`;

          con.query(sqlSelect, [args.customerId], (err, result) => {
            if (result) {
              resolve({
                city: result.length > 0 ? result[0].City : "",
              });
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getDeliveryAddress: {
      type: CustomerProfile,
      args: {
        customerId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT  AddressLine1, AddressLine2, City  FROM CustomerDetails where CustomerID = (?) `;

          con.query(sqlSelect, [args.customerId], (err, result) => {
            if (result) {
              resolve({
                addressLine1: result[0].AddressLine1,
                addressLine2: result[0].AddressLine2,
                city: result[0].City,
              });
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getDeliveryType: {
      type: OrderHistory,
      args: {
        customerId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT OrderId, DeliveryOrPickup  from Orders where CustomerID=? and FinalStatus = ?`;

          con.query(sqlSelect, [args.customerId, "New"], (err, result) => {
            if (result) {
              resolve({
                orderId: result[0].OrderId,
                deliveryType: result[0].DeliveryOrPickup,
              });
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },

    getCartDetails: {
      type: OrderHistoryDetails,
      args: {
        customerId: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let sqlSelOrderID = `SELECT OrderID from Orders where CustomerID= (?) and FinalStatus =(?)`;

          con.query(sqlSelOrderID, [args.customerId, "New"], (err, result) => {
            if (result.length > 0) {
              let sqlSelect = `SELECT O.*, R.RestaurantName FROM OrderDetails  O , RestaurantDetails  R
              WHERE  O.RestaurantID = R.RestaurantID AND O.OrderId= (?) AND  O.CustomerID= (?) `;
              con.query(
                sqlSelect,
                [result[0].OrderID, args.customerId],
                (err, result1) => {
                  if (result1) {
                    resolve({
                      orderDetailsId: result[0].OrderDetailId,
                      orderId: result[0].OrderId,
                      restaurantId: result[0].RestaurantId,
                      customerId: result[0].CustomerId,
                      foodId: result[0].FoodId,
                      foodName: result[0].FoodName,
                      price: result[0].Price,
                      quantity: result[0].Quantity,
                      amount: result[0].Amount,
                      restaurantName: result[0].RestaurantName,
                    });
                  }
                }
              );
            } else {
              reject({ error: err });
            }
          });
        });
      },
    },
  },

  getOrderTotal: {
    type: OrderHistory,
    args: {
      customerId: { type: GraphQLInt },
    },
    resolve(_, args) {
      return new Promise((resolve, reject) => {
        let totalPrice = 0;
        let totalItems = 0;

        let sqlSelOrderID = `SELECT OrderID from Orders where CustomerID= (?) and FinalStatus =(?)`;

        con.query(sqlSelOrderID, [args.customerId, "New"], (err, result) => {
          if (err) reject({ error: err });
          if (result) {
            let sqlSelect = `SELECT  * FROM OrderDetails where CustomerID = (?) AND OrderID = (?)`;

            con.query(
              sqlSelect,
              [args.customerId, result[0]?.OrderID],
              (err, result1) => {
                if (err) reject({ error: err });
                if (result1) {
                  result1.forEach((element) => (totalPrice += element.Amount));
                  result1.forEach(
                    (element) => (totalItems += element.Quantity)
                  );
                  resolve({ totalPrice: totalPrice, totalItems: totalItems });
                }
              }
            );
          }
        });
      });
    },
  },

  //-----------//
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
                    customerId: result.insertId,
                  });
                }
              );
            }
          });
        });
      },
    },

    createRestaurant: {
      type: RestaurantProfile,
      args: {
        restaurantName: { type: GraphQLString },
        emailId: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLInt },
        country: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        password: { type: GraphQLString },
      },

      resolve(_, args) {
        // args.password = passwordHash.generate( args.password );
        return new Promise((resolve, reject) => {
          let checkSql = `SELECT * FROM RestaurantDetails where EmailID = ?`;

          con.query(checkSql, [args.emailId], (err, result1) => {
            if (err) throw err;
            if (result1.length > 0) {
              // res.sendStatus(409);
              reject({ status: 409 });
            } else {
              let sql =
                "INSERT INTO  RestaurantDetails (RestaurantName,Passwordvalue,Address,City,State,ZipCode,Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?,?,?,?)";

              con.query(
                sql,
                [
                  args.restaurantName,
                  args.password,
                  args.address,
                  args.city,
                  args.state,
                  args.zipcode,
                  args.country,
                  args.contactNumber,
                  args.emailId,
                ],
                (err, result) => {
                  if (err) throw err;

                  resolve({
                    restaurantId: result.insertId,
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
                    resolve({ customerId: result.customerId });
                  }
                });
              }
            }
          );
        });
      },
    },

    //update restaurant

    updateRestaurant: {
      type: RestaurantProfile,
      args: {
        restaurantName: { type: GraphQLString },
        emailId: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLInt },
        country: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        about: { type: GraphQLString },
        image: { type: GraphQLString },
        openTime: { type: GraphQLString },
        closeTime: { type: GraphQLString },
        deliveryFlag: { type: GraphQLString },
        pickupFlag: { type: GraphQLString },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          con.query(
            `SELECT * FROM RestaurantDetails WHERE RestaurantID = ?`,
            [args.restaurantId],
            (err, result) => {
              // if (err) throw err;

              if (result.length == 1) {
                let currentValues = result[0];
                let updateSql;
                // let updateImage;
                let updateSql = `UPDATE RestaurantDetails SET  RestaurantName = ?, Address= ?, City=?,State=? , 
                ZipCode =?, Country=?, About=? , ContactNumber=? , EmailID=? , OpenTime=?, CloseTime= ? ,
                DeliveryFlag =? , PickupFlag=?, ProfilePicture=? WHERE   RestaurantID = ?`;

                let data = [
                  args.restaurantName || currentValues.RestaurantName,
                  args.address || currentValues.Address,
                  args.city || currentValues.City,
                  args.state || currentValues.State,
                  args.zipCode || currentValues.ZipCode,
                  args.country || currentValues.Country,
                  args.about || currentValues.About,
                  args.contactNumber || currentValues.ContactNumber,
                  args.emailId || currentValues.EmailID,
                  args.openTime || currentValues.OpenTime,
                  args.closeTime || currentValues.CloseTime,
                  args.deliveryFlag || currentValues.DeliveryFlag,
                  args.pickupFlag || currentValues.PickupFlag,
                  args.image || currentValues.image,
                  restaurantId,
                ];

                console.log(data);

                con.query(updateSql, data, (err, result) => {
                  if (err) throw err;

                  if (result) {
                    resolve({ restaurantId: result.restaurantId });
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
