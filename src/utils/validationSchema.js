export const validationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Min of 5 and Max of 32",
    },
    notEmpty: {
      errorMessage: "User cannot be empty!",
    },
    isString: true,
  },
  displayName: {
    notEmpty: {
      errorMessage: "DisplayName cannot be empty!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty!",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
};

export const filterValidationSchema = {
  filter: {
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter Must not be empty",
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Must be at least 5-20 charcters!",
    },
  },
  value: {
    notEmpty: {
      errorMessage: "Value Must not be empty",
    },
  },
};
