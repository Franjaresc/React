/* eslint-disable react/jsx-pascal-case */
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

const required = (value) => (value ? undefined : "Required");
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = (min) => (value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;
const isNumber = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const validEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

function ContactComponent(props) {
  const onSubmit = (values) => {
    props.postFeedback(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message,
      props.feedbacks.feedbacks.length
    );

    console.log(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message,
      props.feedbacks.feedbacks.length
    );
    console.log("current state is: " + JSON.stringify({ values }));
    alert("Your feedback is: " + JSON.stringify({ values }));
  };

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstname"
                  validate={composeValidators(required, maxLength(15))}
                >
                  {({ input, meta }) => (
                    <Row className="form-group">
                      <Label htmlFor="firstname" md={2}>
                        First Name
                      </Label>
                      <Col md={10}>
                        <input
                          {...input}
                          type="text"
                          id="firstname"
                          placeholder="First Name"
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Field
                  name="lastname"
                  validate={composeValidators(
                    required,
                    maxLength(15),
                    minLength(2)
                  )}
                >
                  {({ input, meta }) => (
                    <Row className="form-group">
                      <Label htmlFor="lastname" md={2}>
                        Last Name
                      </Label>
                      <Col md={10}>
                        <input
                          {...input}
                          type="text"
                          id="lastname"
                          placeholder="Last Name"
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Field
                  name="telnum"
                  validate={composeValidators(
                    required,
                    maxLength(15),
                    minLength(8),
                    isNumber
                  )}
                >
                  {({ input, meta }) => (
                    <Row className="form-group">
                      <Label htmlFor="telnum" md={2}>
                        Tel. Number
                      </Label>
                      <Col md={10}>
                        <input
                          {...input}
                          type="text"
                          id="telnum"
                          placeholder="Tel. Number"
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Field
                  name="email"
                  validate={composeValidators(required, validEmail)}
                >
                  {({ input, meta }) => (
                    <Row className="form-group">
                      <Label htmlFor="email" md={2}>
                        Email
                      </Label>
                      <Col md={10}>
                        <input
                          {...input}
                          type="email"
                          id="email"
                          placeholder="Email"
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Row className="form-group">
                  <Col md={{ size: 6, offset: 2 }}>
                    <div className="form-check">
                      <Label check>
                        <Field
                          name="agree"
                          component="input"
                          type="checkbox"
                          className="form-check-input"
                        />
                        <strong>May we contact you?</strong>
                      </Label>
                    </div>
                  </Col>
                  <Col md={{ size: 3, offset: 1 }}>
                    <Field
                      name="contactType"
                      component="select"
                      className="form-control"
                    >
                      <option value="Tel.">Tel.</option>
                      <option value="Email">Email</option>
                    </Field>
                  </Col>
                </Row>
                <Field name="message" validate={composeValidators(required)}>
                  {({ input, meta }) => (
                    <Row className="form-group">
                      <Label htmlFor="message" md={2}>
                        Your Feedback
                      </Label>
                      <Col md={10}>
                        <textarea
                          {...input}
                          type="text"
                          id="message"
                          placeholder="Your Feedback"
                          className="form-control"
                          rows="12"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary" disabled={submitting} >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      disabled={pristine || submitting}
                      onClick={form.reset}
                    >
                      Clear Values
                    </Button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
