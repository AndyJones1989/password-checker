// CRITERIA

// > 8 chars
// a capital
// a lowercase
// a number
// an underscore

import { checkPasswordEnhanced } from "./core-checks";

const passwords = ["gYfds233£asQQQsriosW12!_", "password", "Password_1"];

for (const password of passwords) {
  checkPasswordEnhanced(password).then((result) =>
    console.log(`input ${password}: is ${result.message}`)
  );
}
