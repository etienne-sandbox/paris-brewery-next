import React from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { extractId } from "../../utils/extractId";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { slugify } from "../../utils/slugify";

export async function getServerSideProps({ params }) {
  const brewerySlugAndId = params.breweryId;
  if (!brewerySlugAndId) {
    return { notFound: true };
  }
  const breweryId = extractId(brewerySlugAndId);
  try {
    const breweryResponse = await axios.get(
      `https://paris-brewery-api.herokuapp.com/brewery/${breweryId}`
    );
    return {
      props: { breweryId, brewery: breweryResponse.data },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
}

export default function Brewery({ brewery }) {
  return (
    <Layout>
      <Head>
        <title>{`${brewery.name} - Paris Microbrasseries`}</title>
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
        {brewery.beers.map((beer) => {
          return (
            <Link
              key={beer.id}
              href="/beer/[beerId]"
              as={`/beer/${slugify(beer.name)}-${beer.id}`}
            >
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
}
