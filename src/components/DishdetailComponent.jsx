import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

function DishdetailComponent(props) {
  const renderDish = (dish) => {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  const renderComments = (comments) => {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author} ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="container">
      <div className="row">
        {renderDish(props.dish)}
        {renderComments(props.dish.comments)}
      </div>
    </div>
  );
}
export default DishdetailComponent;
