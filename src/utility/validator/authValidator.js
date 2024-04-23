export const validateUser = (values, isSignUp) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.firstname && isSignUp) {
    errors.firstname = "Firstname is required";
  }

  if (!values.username) {
    errors.username = "Username is required";
  }
  //  else if (!regex.test(values.username)) {
  //   errors.username = "Invalid Email";
  // }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }

  if (!values.cpassword) {
    // console.log(values.cpassword);
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password does not match";
  }

  if (!values.phone && isSignUp) {
    errors.phone = "Phone number is required";
  }

  if (!values.role && isSignUp) {
    errors.role = "Role is required";
  }

  return errors;
};
