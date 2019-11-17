import React from "react";
import Head from "next/head";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { extractId } from "../../utils/extractId";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

const Brewery = ({ brewery }) => {
  if (!brewery) {
    return (
      <Layout>
        <Card>
          <p>404 - Page introuvable</p>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card title={brewery.name}>
        <p className="infos">
          <a href={brewery.website} target="_blank">
            Site web de {brewery.name}
          </a>
        </p>
        <div>
          {brewery.description.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </div>
      </Card>

      <Card subTitle="Liste des bières">
        {brewery.beers.map(beer => {
          return (
            <Link key={beer.id} href="/beer/[beerId]" as={`/beer/${beer.id}`}>
              <a className="item">{beer.name}</a>
            </Link>
          );
        })}
      </Card>

      <style jsx>{`
        .infos {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .item {
          display: block;
          font-size: 1.2rem;
          padding: 8px;
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
};

Brewery.getInitialProps = async ({ query, res }) => {
  const brewerySlugAndId = query.breweryId;
  if (!brewerySlugAndId) {
    return {};
  }
  const breweryId = extractId(brewerySlugAndId);
  try {
    const res = await axios.get(
      `https://paris-brewery-api.herokuapp.com/brewery/${breweryId}`
    );
    return { breweryId, brewery: res.data };
  } catch (error) {
    if (res && error.status === 404) {
      res.statusCode = 404;
    }
    return { breweryId };
  }
};

export default Brewery;
