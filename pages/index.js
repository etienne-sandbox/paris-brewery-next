import React from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { slugify } from "../utils/slugify";
import Layout from "../components/Layout";
import Card from "../components/Card";

export async function getServerSideProps(context) {
  const res = await axios.get(
    "https://paris-brewery-api.herokuapp.com/brewery"
  );
  return {
    props: {
      breweries: res.data,
    },
  };
}

export default function Home({ breweries }) {
  return (
    <Layout>
      <Head>
        <title>Paris Microbrasseries</title>
      </Head>

      <Card title="Liste des microbrasseries">
        {breweries.map((brewery) => {
          return (
            <Link
              key={brewery.id}
              href="/brewery/[breweryId]"
              as={`/brewery/${slugify(brewery.name)}-${brewery.id}`}
            >
              <a className="item">{brewery.name}</a>
            </Link>
          );
        })}
      </Card>

      <style jsx>{`
        .item {
          display: block;
          font-size: 1.5rem;
          padding: 10px;
          color: inherit;
          text-decoration: none;
          transition-duration: 0.1s;
        }
        .item:nth-child(even) {
          background: #e8f5e9;
        }
        .item:hover {
          padding-left: 20px;
          background: #c8e6c9;
        }
      `}</style>
    </Layout>
  );
}
