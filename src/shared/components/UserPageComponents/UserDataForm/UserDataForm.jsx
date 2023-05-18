import UserDataItem from '../UserDataItem/UserDataItem';
import Logout from 'shared/components/Logout/Logout';
import { useState, useEffect } from 'react';
import fields from './fields';
import { UserForm } from './UserDataForm.styled';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const cityRegex =
  /^(?:(?:[a-zA-Zа-яА-ЯіІїЇєЄ]+(?:[.'’‘`-][a-zA-Zа-яА-ЯіІїЇєЄ]+)*)\s*)+$/;
const nameRegex = /^[a-zA-Zа-яА-ЯІіїЇґҐ\s-]+$/;
const birthdayRegex = /^([0-2]\d|3[0-1])\.(0\d|1[0-2])\.\d{4}$/;

const validationSchema = Yup.object({
  username: Yup.string().matches(
    nameRegex,
    'Valid format for name is Elina K...'
  ),
  email: Yup.string().email('Valid format for email is test@gmail.com'),
  birthday: Yup.string().matches(
    birthdayRegex,
    'Valid format for date is dd.mm.yyyy'
  ),
  phone: Yup.string().matches(
    /^\+380\d{9}$/,
    'Valid format for phone is +38000000000'
  ),
  city: Yup.string().matches(cityRegex, 'Valid format for "city" is "Brovary"'),
});

const UserDataForm = ({ onSubmit, user }) => {
  const [initialState, setInitialState] = useState({
    username: '',
    email: '',
    birthday: '',
    phone: '',
    city: '',
  });

  useEffect(() => {
    if (user) {
      setInitialState({
        username: user.username || '',
        email: user.email || '',
        birthday: user.birthday || '',
        phone: user.phone || '',
        city: user.city || '',
      });
    }
  }, [user]);

  const [usernameIsActive, setUsernameIsActive] = useState(true);
  const [emailIsActive, setEmailIsActive] = useState(true);
  const [birthdayIsActive, setBirthdayIsActive] = useState(true);
  const [phoneIsActive, setPhoneIsActive] = useState(true);
  const [cityIsActive, setCityIsActive] = useState(true);

  const fieldActivity = {
    username: usernameIsActive,
    email: emailIsActive,
    birthday: birthdayIsActive,
    phone: phoneIsActive,
    city: cityIsActive,
  };

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setUsernameIsActive(true);
    setEmailIsActive(true);
    setBirthdayIsActive(true);
    setPhoneIsActive(true);
    setCityIsActive(true);
  }, [user]);

  const countActiveButtons = () => {
    let count = 0;
    if (usernameIsActive) count++;
    if (emailIsActive) count++;
    if (birthdayIsActive) count++;
    if (phoneIsActive) count++;
    if (cityIsActive) count++;

    if (count === 5) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = name => {
    if (countActiveButtons()) {
      switch (name) {
        case 'username':
          setUsernameIsActive(false);
          break;
        case 'email':
          setEmailIsActive(false);
          break;
        case 'birthday':
          setBirthdayIsActive(false);
          break;
        case 'phone':
          setPhoneIsActive(false);
          break;
        case 'city':
          setCityIsActive(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <UserForm onSubmit={formik.handleSubmit}>
          {Object.entries(fields).map(([name, field]) => (
            <UserDataItem
              key={name}
              value={formik.values[name]}
              formik={formik}
              name={name}
              isdisabled={fieldActivity[name]}
              handleClick={handleClick}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              {...field}
            />
          ))}
          <Logout />
        </UserForm>
      )}
    </Formik>
  );
};

export default UserDataForm;

UserDataForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};
