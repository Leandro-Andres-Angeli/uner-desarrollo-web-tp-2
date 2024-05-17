import React from "react";
import Card from "./Card";
import "./Cards.css";

const CardList = (props) => {
  return (
    <section className="card-list">
      <h2>{props.titulo}</h2>
      <div className="tarjetas">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </section>
  );
};

export default CardList;
