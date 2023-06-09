import Joi from 'joi';

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().label('Name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().label('Password'),
  }),
};

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const resetPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string()
      .min(8)
      .regex(PASSWORD_REGEX)
      .required()
      .label('New password')
      .messages({
        'string.pattern.base':
          'Password must contain at least one letter, one number, and one special character',
        'string.min': 'Password must be at least 8 characters long',
      }),
  }),
};

export default {
  login,
  resetPassword,
  register,
};
