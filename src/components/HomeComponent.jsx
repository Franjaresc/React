import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import LoadingComponent from "./LoadingComponent";
import { motion } from "framer-motion";

const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <LoadingComponent />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, translateY: +100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1 }}
      >
        <Card>
          <CardImg top src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </motion.div>
    );
  }
};

function HomeComponent(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promoLoading}
            errMess={props.promoErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMess={props.leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
}
export default HomeComponent;
