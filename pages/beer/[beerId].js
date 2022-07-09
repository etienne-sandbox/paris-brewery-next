import React from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { extractId } from "../../utils/extractId";
import { slugify } from "../../utils/slugify";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

export async function getServerSideProps({ params }) {
  const beerSlugAndId = params.beerId;
  if (!beerSlugAndId) {
    return { notFound: true };
  }
  const beerId = extractId(beerSlugAndId);
  try {
    const res = await axios.get(
      `https://paris-brewery-api.herokuapp.com/beer/${beerId}`
    );
    return {
      props: { beerId, beer: res.data },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
}

export default function Beer({ beer }) {
  return (
    <Layout>
      <Head>
        <title>{`${beer.name} par ${beer.brewery.name} - Paris Microbrasseries`}</title>
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
}
