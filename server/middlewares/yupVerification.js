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

exports.loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

exports.sendInvitationSchema = yup.object().shape({
  communityId: yup.string().required(),
  userId: yup.string().required(),
  email: yup.string().email().required(),
});

exports.passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test('hasNumber', 'Password must contain at least one number', (value) =>
      /[0-9]/.test(value)
    ),
});

exports.productSchema = yup.object().shape({
  name: yup.string().required().min(3).max(75),
  community: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  owner: yup.string().required(),
  images: yup.array().of(yup.string()),
  tags: yup.array().of(yup.string()),
  condition: yup.string().required(),
  location: yup.string().required(),
  isAvailable: yup.boolean().default(true),
  wantedProducts: yup.array().of(yup.string()),
});
