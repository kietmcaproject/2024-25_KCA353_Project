const { parsePhoneNumberFromString } = require("libphonenumber-js");

function validateIndianMobileNumber(mobileNumber) {
  const phoneNumber = parsePhoneNumberFromString(mobileNumber, "IN");
  return phoneNumber && phoneNumber.isValid();
}

// console.log(validateIndianMobileNumber("6969007065"));

module.exports = { validateIndianMobileNumber };
