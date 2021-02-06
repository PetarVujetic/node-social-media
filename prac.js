let crypto = require("crypto")
  .createHash("sha256")
  .update("pass")
  .digest("hex");
console.log(crypto);