var chai = require("chai");
var request = require("supertest");
var mysql = require("mysql");
var expect = require("chai").expect;

describe("Server Test", function() {
  describe("Connection Test", function() {
    //test the connection with correct path
    it("Should have a response from the server ", function(done) {
      request("localhost:3000")
        .get("/")
        .expect(200, done);
    });
    //test the connection with the wrong path
    it("should resived error from the server with wrong path ", function(done) {
      request("localhost:3000")
        .get("/wrong")
        .expect(404, done);
    });
  });
  describe("Get ALL DJ services", function() {
    // recived obj when request data
    it('we should receive an array of objects from "/services"', function(done) {
      request("localhost:3000")
        .post("/services/DJ")
        .end(function(err, res) {
          result = res.body;
          chai.assert.typeOf(result, "array");
          done();
        });
    });
  });
  describe("Sign in provider", function() {
    it("it should sign in the provider and return his id", function(done) {
      request("localhost:3000")
        .post("/provider/login")
        .send({
          email: "sebawy@gmail.com",
          password: "123456",
          name: "Sebawy Group"
        })
        .end(function(err, res) {
          result = res.body;
          chai.assert.typeOf(result, "object");
          expect(result.id).equal(4);
          done();
        });
    });
  });
  describe("Sign in user", function() {
    it("it should sign in the user and return a boolean (true) ", function(done) {
      request("localhost:3000")
        .post("/user/login")
        .send({
          email: "mahmoud@gmail.com",
          password: "123456",
          name: "mahmoud"
        })
        .end(function(err, res) {
          result = res.body;
          expect(result).to.be.true;
          done();
        });
    });
  });
});

describe("Contact us message", function() {
  it("it should save the message in database and return a boolean (true) ", function(done) {
    request("localhost:3000")
      .post("/contactus/submit")
      .send({
        name: "yazeed",
        phone: "123456",
        message: "hello world"
      })
describe("add in services", function() {
  it("it should add services and return boolean (true) ", function(done) {
    request("localhost:3000")
      .post("/provider/addService")
      .send({
        email: "mahmoud@gmail.com",
        password: "123456",
        name: "mahmoud"
      })
      .end(function(err, res) {
        result = res.body;
        expect(result).to.be.true;
        done();
      });
  });
});

  
});

describe('App Component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });
});

})
