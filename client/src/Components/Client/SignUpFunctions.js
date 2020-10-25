export const addressVerification = (address) => {
  if (address.target.value.length < 10) {
  }
};

export const creditCardVerification = (creditCard) => {
  var numberPattern = /\d+/g;

  if (!creditCard.match(numberPattern)) {
    return "";
  }

  return creditCard.length <= 0 || creditCard.length > 16
    ? creditCard.slice(0, 16)
    : creditCard.match(numberPattern).join("");
};
export const cscVerification = (csc) => {
  var numberPattern = /\d+/g;

  if (!csc.match(numberPattern)) {
    return "";
  }
  return csc.length <= 0 || csc.length > 3
    ? csc.slice(0, 3)
    : csc.match(numberPattern).join("");
};
export const expVerificationMonth = (month) => {
  let monthPattern = /\d+/g;
  if (!month.match(monthPattern)) {
    return "";
  }
  return month.length <= 0 || month.length > 2
    ? month.slice(0, 2)
    : month.match(monthPattern).join("");
};
export const expVerificationYear = (year) => {
  let yearPattern = /\d+/g;
  if (!year.match(yearPattern)) {
    return "";
  }
  return year.length <= 0 || year.length > 4
    ? year.slice(0, 4)
    : year.match(yearPattern).join("");
};

export const createClient = async (signUp, billing) => {
  return await fetch("/clientCreated", {
    method: "POST",
    body: JSON.stringify({
      loginInfo: signUp,
      billingInfo: billing,
      isSupportPerson: false,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
