import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from '@chakra-ui/react'

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const toast = useToast()
  const handleLogin = async(values) => {
  const res = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  })
  const data = await res.json()
  console.log(data)
  toast({
    title: data.msg,
    status: res.status==401 ? 'warning':'success',
    isClosable: true,
  })

  };
  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values,{resetForm}) => {
          handleLogin(values);
          resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="phoneNumber" placeholder="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field name="password" type="Password" placeholder="Password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
