"use strict";
// CRITERIA
Object.defineProperty(exports, "__esModule", { value: true });
// > 8 chars
// a capital
// a lowercase
// a number
// an underscore
const core_checks_1 = require("./core-checks");
const valid = "gYfds233£asQQQsriosW12!_";
const invalid = "password";
const validButCompromised = "Password_1";
(0, core_checks_1.checkPassword)(valid).then((result) => console.log(valid, result));
(0, core_checks_1.checkPassword)(invalid).then((result) => console.log(invalid, result));
(0, core_checks_1.checkPassword)(validButCompromised).then((result) => console.log(validButCompromised, result));
