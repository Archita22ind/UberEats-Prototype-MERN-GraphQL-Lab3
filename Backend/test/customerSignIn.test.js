// Testing the customerSignIn
describe("POST /customerSignIn", function () {
  it("Should success if credential is Valid", function (done) {
    request
      .post("/customerSignIn")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ emailId: "archi123@gmail.com", password: "archi123@gmail.com" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        expect(response.body).not.to.be.empty;
        assert.strictEqual(response.body.successFlag, true);
      })
      .end(done);
  });
});
