import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Card from "../components/Card";

const About = ({}) => {
  return (
    <Layout isAbout={true}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card title="A propos">
        <p>
          Site créer par{" "}
          <a href="https://twitter.com/Etienne_dot_js">@Etienne_dot_js</a>
        </p>
      </Card>
    </Layout>
  );
};

export default About;
