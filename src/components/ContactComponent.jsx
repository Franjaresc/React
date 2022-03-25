import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from "reactstrap";
import { Link } from "react-router-dom";

function ContactComponent() {

  const [firstName, setFirstName] = useState("");  
  const [lastName, setLastName] = useState("");
  const [telNum, setTelNum] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [contactType, setContactType] = useState("Tel.");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    telNum: false,
    email: false,
    agree: false,
    contactType: false,
    message: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('current state is: '+ JSON.stringify({firstName, lastName, telNum, email, agree, contactType, message}));
    alert('current state is: '+ JSON.stringify({firstName, lastName, telNum, email, agree, contactType, message}));
  }

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  }

  const validate = () => {
    const Errors = {
      firstName: "",
      lastName: "",
      telNum: "",
      email: "",
      agree: "",
      contactType: "",
      message: ""
    };

    if (touched.firstName && firstName.length < 3) {
      Errors.firstName = "First Name must be at least 3 characters";
    }
    if (touched.lastName && lastName.length < 3) {
      Errors.lastName = "Last Name must be at least 3 characters";
    }
    const reg = /^\d+$/;
    if (touched.telNum && telNum && !reg.test(telNum)) {
      Errors.telNum = "Tel. Number must contain only numbers";
    }
    if (touched.email && email.split('').filter(x => x === '@').length !== 1) {
      Errors.email = "Email must be a valid email address";
    }
    if (touched.agree && !agree) {
      Errors.agree = "Must agree to terms and conditions";
    }
    if (touched.contactType && contactType === "") {
      Errors.contactType = "Please select contact type";
    }
    if (touched.message && message.length < 15) {
      Errors.message = "Message must be at least 15 characters";
    }

    return Errors;
  };

  const errors = validate();

  return (
    <div className="container">
      <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
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
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label htmlFor="firstName" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  valid={errors.firstName === ""}
                  invalid={errors.firstName !== ""}
                  onBlur={handleBlur("firstName")}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="lastName" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  valid={errors.lastName === ""}
                  invalid={errors.lastName !== ""}
                  onBlur={handleBlur("lastName")}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="telNum" md={2}>
                Tel. Number
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="telNum"
                  name="telNum"
                  placeholder="Tel. Number"
                  value={telNum}
                  valid={errors.telNum === ""}
                  invalid={errors.telNum !== ""}
                  onBlur={handleBlur("telNum")}
                  onChange={(e) => setTelNum(e.target.value)}
                />
                <FormFeedback>{errors.telNum}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  valid={errors.email === ""}
                  invalid={errors.email !== ""}
                  onBlur={handleBlur("email")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      checked={agree}
                      valid={errors.agree === ""}
                      invalid={errors.agree !== ""}
                      onBlur={handleBlur("agree")}
                      onChange={(e) => setAgree(e.target.checked)}
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </FormGroup>
                <FormFeedback>{errors.agree}</FormFeedback>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Input
                  type="select"
                  name="contactType"
                  value={contactType}
                  valid={errors.contactType === ""}
                  invalid={errors.contactType !== ""}
                  onBlur={handleBlur("contactType")}
                  onChange={(e) => setContactType(e.target.value)}
                >
                  <option value="Tel.">Tel.</option>
                  <option value="Email">Email</option>
                </Input>
                <FormFeedback>{errors.contactType}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  id="message"
                  name="message"
                  rows="12"
                  value={message}
                  valid={errors.message === ""}
                  invalid={errors.message !== ""}
                  onBlur={handleBlur("message")}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FormFeedback>{errors.message}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
