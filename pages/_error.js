import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";

function Error({ statusCode }) {
  return (
    <Layout>
      <Card>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </Card>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
