// CRITERIA

// > 8 chars
// a capital
// a lowercase
// a number
// an underscore

import { checkPasswordEnhanced } from "./core-checks";

const valid = "gYfds233£asQQQsriosW12!_";
const invalid = "password";
const validButCompromised = "Password_1";

checkPasswordEnhanced(valid).then((result) => console.log(valid, result));

checkPasswordEnhanced(invalid).then((result) => console.log(invalid, result));

checkPasswordEnhanced(validButCompromised).then((result) =>
  console.log(validButCompromised, result)
);
