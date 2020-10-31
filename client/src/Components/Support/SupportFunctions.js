export const SupportSignUp = async (supporter) => {
  fetch("/support/supporter/createSupportUser", {
    method: "POST",
    body: JSON.stringify({
      firstname: supporter.firstname,
      lastname: supporter.lastname,
      team: supporter.supportteam,
      isValidated: false,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
