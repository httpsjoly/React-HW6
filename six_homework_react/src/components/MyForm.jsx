import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name field is required'),
  email: Yup.string().email('Incorrect format Email').required('Email is a required field'),
  phone: Yup.string().matches(/^\d+$/, 'Only numbers can be entered').min(12, 'Phone must be 12 characters long').max(12, 'Phone must be 12 characters long').required('Phone is a required field'),
});

const MyForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  const [savedData, setSavedData] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    const resultString = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}`;

    alert(resultString);

    setSavedData((prevData) => [...prevData, values]);

    resetForm();
  };

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          setSavedData(parsedData);
        }
      } catch (error) {
        console.error('Error unpacking saved data', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(savedData));
  }, [savedData]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <Field type="text" id="phone" name="phone" />
          <ErrorMessage name="phone" component="div" />
        </div>

        <button type="submit">Sent</button>
      </Form>
    </Formik>
  );
};

export default MyForm;