import React from "react";
import Card from "./Card";
import "./Cards.css";

const CardList = (props) => {
  return (
    <div className="card-list">
      <h2>{props.titulo}</h2>
      <div className="tarjetas">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default CardList;
