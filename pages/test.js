import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import EpisodeCard from "../components/EpisodeCard";
import Journal from "../components/Journal";

const test = () => {
  const date = new Date().toDateString();
  const data = [
    {
      text: "Duis est eu aute pariatur est voluptate ea est commodo cupidatat quis dolore. Magna et ad velit cupidatat laborum enim. Duis voluptate ea tempor reprehenderit esse ad ad laboris sint reprehenderit cupidatat esse. Ipsum elit ex laboris incididunt do cupidatat reprehenderit qui laborum incididunt. Excepteur ullamco nulla labore sint mollit est qui tempor consequat minim quis enim laborum non. Nulla veniam tempor esse esse. Amet proident ea dolor reprehenderit anim. Aliquip ad in pariatur in id consequat id adipisicing anim eu labore. Quis proident elit velit dolore Lorem anim aliqua reprehenderit velit in sunt dolore. Aliquip magna dolore non duis esse Lorem esse Lorem in elit consectetur adipisicing nulla. Cupidatat aliqua occaecat proident est.",
      date: date,
    },
    {
      text: "Duis est eu aute pariatur est voluptate ea est commodo cupidatat quis dolore. Magna et ad velit cupidatat laborum enim. Duis voluptate ea tempor reprehenderit esse ad ad laboris sint reprehenderit cupidatat esse. Ipsum elit ex laboris incididunt do cupidatat reprehenderit qui laborum incididunt. Excepteur ullamco nulla labore sint mollit est qui tempor consequat minim quis enim laborum non. Nulla veniam tempor esse esse. Amet proident ea dolor reprehenderit anim. Aliquip ad in pariatur in id consequat id adipisicing anim eu labore. Quis proident elit velit dolore Lorem anim aliqua reprehenderit velit in sunt dolore. Aliquip magna dolore non duis esse Lorem esse Lorem in elit consectetur adipisicing nulla. Cupidatat aliqua occaecat proident est.",
      date: date,
    },
    {
      text: "Duis est eu aute pariatur est voluptate ea est commodo cupidatat quis dolore. Magna et ad velit cupidatat laborum enim. Duis voluptate ea tempor reprehenderit esse ad ad laboris sint reprehenderit cupidatat esse. Ipsum elit ex laboris incididunt do cupidatat reprehenderit qui laborum incididunt. Excepteur ullamco nulla labore sint mollit est qui tempor consequat minim quis enim laborum non. Nulla veniam tempor esse esse. Amet proident ea dolor reprehenderit anim. Aliquip ad in pariatur in id consequat id adipisicing anim eu labore. Quis proident elit velit dolore Lorem anim aliqua reprehenderit velit in sunt dolore. Aliquip magna dolore non duis esse Lorem esse Lorem in elit consectetur adipisicing nulla. Cupidatat aliqua occaecat proident est.",
      date: date,
    },
  ];
  return (
    <Container>
      <Journal data={data} />
    </Container>
  );
};

export default test;
