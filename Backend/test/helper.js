var supertest = require("supertest");
var chai = require("chai");
var uuid = require("uuid");
var app = require("../app.js");
global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = supertest(app);
