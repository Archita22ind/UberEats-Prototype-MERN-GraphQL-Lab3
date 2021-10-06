// //Testing the POST API to dispaly the list of all restaurants
// describe("POST /getListOfRestaurants", function () {
//   it("Should return list of restaurants", function (done) {
//     request
//       .post("/getListOfRestaurants")
//       .set("Accept", "application/json")
//       .set("Content-Type", "application/json")
//       .send({ filter: [], typeaheadValue: [], customerId: 1 })
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .expect(function (response) {
//         expect(response.body).not.to.be.empty;
//         expect(response.body).to.be.an("object");
//         assert.strictEqual(response.body.successFlag, true);
//       })
//       .end(done);
//   });
// });

// describe("POST /getListOfRestaurants", function () {
//   it("Should return list of restaurants", function (done) {
//     request
//       .post("/getListOfRestaurants")
//       .set("Accept", "application/json")
//       .set("Content-Type", "application/json")
//       .send({ filter: [], typeaheadValue: [], customerId: 1 })
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .expect(function (response) {
//         expect(response.body).not.to.be.empty;
//         expect(response.body).to.be.an("object");
//         assert.strictEqual(response.body.successFlag, true);
//       })
//       .end(done);
//   });
// });
