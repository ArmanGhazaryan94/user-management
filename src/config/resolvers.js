import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const firstNameValidation = yup.string().required('First Name is required');
const lastNameValidation = yup.string()
  .required('Last name is required')
  .min(3, 'Last name must be at least 3 characters')
  .max(20, 'Last name must not exceed 20 characters');
const roleValidation = yup.string().required('Please select role');

const createUser = yupResolver(yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  role: roleValidation
}));

const updateUser = yupResolver(yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  role: roleValidation
}));

const resolvers = {
  createUser,
  updateUser,
};

export default resolvers;
