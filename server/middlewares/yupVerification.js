import * as yup from 'yup';

exports.createUserSchema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  communities: yup.array().of(
    yup.object().shape({
      community: yup.string().required(),
      role: yup.string().oneOf(['User', 'Moderator', 'Admin']).default('User'),
    })
  ),
});
