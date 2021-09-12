import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import './form.css';

const Form = ({ createForm }) => {
  const validationsSchema = yup.object().shape({
    firstName: yup.string().typeError('Be a string').required('Necessarily'),
    lastName: yup.string().typeError('Be a string').required('Necessarily'),
    email: yup.string().email('Enter correct email').required('Necessarily'),
    phone: yup.string().required('Necessarily'),
  });
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }}
        validateOnBlur
        onSubmit={(value) => {
          createForm(value);
        }}
        validationSchema={validationsSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className="form">
            <div className="form-group">
              <label htmlFor={'firstName'}>Name:</label>
              <input
                type="text"
                className="form-control"
                name={`firstName`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder="Name"
              ></input>
              {touched.firstName && errors.firstName && (
                <p className="error">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`lastName`}>Surname:</label>
              <input
                type="text"
                className="form-control"
                name={`lastName`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                placeholder="Surname"
              ></input>
              {touched.lastName && errors.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`email`}>E-mail:</label>
              <input
                type="email"
                className="form-control"
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email"
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>

              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`phone`}>Phone:</label>
              <input
                type="tel"
                pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
                className="form-control"
                name={`phone`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Phone"
              ></input>
              <small>Format: (123)456-7890</small>
              {touched.phone && errors.phone && (
                <p className="error">{errors.phone}</p>
              )}
            </div>

            <button
              disabled={!isValid && !dirty}
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default Form;
