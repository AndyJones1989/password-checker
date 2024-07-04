"use strict";
// CRITERIA
Object.defineProperty(exports, "__esModule", { value: true });
// > 8 chars
// a capital
// a lowercase
// a number
// an underscore
const core_checks_1 = require("./core-checks");
const passwords = ["gYfds233£asQQQsriosW12!_", "password", "Password_1"];
for (const password of passwords) {
    (0, core_checks_1.checkPasswordEnhanced)(password).then((result) => console.log(`input ${password}: is ${result.message}`));
}
