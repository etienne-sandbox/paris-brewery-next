import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function PageNotFound() {
  return (
    <Layout>
      <Card>
        <h2>404 - Page non trouvée</h2>
        <p>Rien à voir ici</p>
      </Card>
    </Layout>
  );
}
