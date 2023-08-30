import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from '@chakra-ui/react'

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
  const toast = useToast()
  const handleRegister = async(values) => {
  const res = await fetch('http://localhost:3005/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  })
  const data = await res.json()
  console.log(data)
  toast({
    title: data.msg,
    status: res.status==409 ? 'warning':'success',
    isClosable: true,
  })

  };
  return (
    <div className={styles.form}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values,{resetForm}) => {
          handleRegister(values);
          resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="fullName" placeholder="FullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            <Field name="phoneNumber" placeholder="Phone Number" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field name="email" type="email" placeholder="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <Field name="password" type="Password" placeholder="Password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <Field
              name="confirmPassword"
              type="Password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
