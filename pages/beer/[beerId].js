import React from "react";
import Head from "next/head";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { extractId } from "../../utils/extractId";
import { slugify } from "../../utils/slugify";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

const Beer = ({ beer }) => {
  if (!beer) {
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

      <Card title={beer.name + (beer.alcool ? ` - ${beer.alcool}%` : "")}>
        <p className="infos">
          <span>
            Brassée par:{" "}
            <Link
              href="/brewery/[breweryId]"
              as={`/brewery/${slugify(beer.brewery.name)}-${beer.brewery.id}`}
            >
              <a>{beer.brewery.name}</a>
            </Link>
          </span>
          {beer.alcool && (
            <React.Fragment>
              {" - "}
              <span>
                <strong>Alcool</strong>: {beer.alcool}%
              </span>
            </React.Fragment>
          )}
          {" - "}
          <a href={beer.url} target="_blank">
            Détails
          </a>
        </p>
        {beer.description.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </Card>

      <style jsx>{`
        .infos {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 30px;
          margin-bottom: 30px;
        }
      `}</style>
    </Layout>
  );
};

Beer.getInitialProps = async ({ query, res }) => {
  const beerSlugAndId = query.beerId;
  if (!beerSlugAndId) {
    return {};
  }
  const beerId = extractId(beerSlugAndId);
  try {
    const res = await axios.get(
      `https://paris-brewery-api.herokuapp.com/beer/${beerId}`
    );
    return { beerId, beer: res.data };
  } catch (error) {
    if (res && error.status === 404) {
      res.statusCode = 404;
    }
    return { beerId };
  }
};

export default Beer;
