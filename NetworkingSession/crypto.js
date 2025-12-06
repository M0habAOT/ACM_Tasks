const crypto = require("crypto");

const start = Date.now();

// for (let i = 1; i <= 8; i++) {
//   crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
//     console.log(`Task ${i} done in ${Date.now() - start} ms`);
//   });
// }


for (let i = 1; i <= 8; i++) {
  console.log("start");
  setTimeout(() => {
    console.log(`Task ${i} done in ${Date.now() - start} ms`)
  }, 0)
  console.log(i);
  //   setTimeout(() => {
  //   console.log(`Task ${i} done in ${Date.now() - start} ms`)
  // }, 1000)
}

