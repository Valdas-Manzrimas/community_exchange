const yup = require('yup');

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

exports.createUserSchema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('Your city is required'),
  communities: yup.array().of(
    yup.object().shape({
      community: yup.string().required(),
      role: yup.string().oneOf(['User', 'Moderator', 'Admin']).default('User'),
    })
  ),
});
