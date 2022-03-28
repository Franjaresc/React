import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import LoadingComponent from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (value) => (value ? undefined : "Required");
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const CommentForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  const onSubmit = (values) => {
    console.log("onSubmit", values);
    toggleModal();
    props.postComment(props.dishId, values.rating, values.author, values.comment);
  };

  return (
    <div className="row">
      <Button outline onClick={toggleModal}>
        <span className="fa fa-pencil fa-lg"></span>
        Submit Comment
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Rating</label>
                  <Field
                    name="rating"
                    component="select"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Field>
                </div>
                <Field
                  name="author"
                  validate={composeValidators(required, maxLength(20))}
                >
                  {({ input, meta }) => (
                    <Row>
                      <Col md={12}>
                        <label>Name</label>
                        <input
                          {...input}
                          type="text"
                          id="author"
                          className="form-control"
                          placeholder="Your Name"
                        />
                        {meta.error && meta.touched && (
                          <div className="text-danger">{meta.error}</div>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Field name="comment" validate={composeValidators(required)}>
                  {({ input, meta }) => (
                    <Row>
                      <Col md={12}>
                        <label>Comment</label>
                        <textarea
                          {...input}
                          type="text"
                          id="comment"
                          className="form-control"
                          placeholder="Your Comment"
                          rows="5"
                        />
                        {meta.error && meta.touched && (
                          <div className="text-danger">{meta.error}</div>
                        )}
                      </Col>
                    </Row>
                  )}
                </Field>
                <Button
                  type="submit"
                  color="primary"
                  className="pull-right"
                  disabled={submitting || pristine}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  className="pull-right"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </form>
            )}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

const RenderDish = ({ dish }) => {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};
const RenderComments = ({ comments, postComment, dishId }) => {
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}{" "}
                at{" "}
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(Date.parse(comment.date)))}{" "}
                -- <br />{" "}
                <span className="text-warning">{comment.rating} Stars</span>{" "}
                <br />
              </p>
            </li>
          );
        })}
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
};

function DishdetailComponent(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <LoadingComponent />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default DishdetailComponent;
