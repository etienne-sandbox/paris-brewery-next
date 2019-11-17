import React from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { slugify } from "../utils/slugify";

const About = ({}) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <p>Bla bla bla bla</p>
      </div>
    </div>
  );
};

export default About;
