import React from "react";
import Head from "next/head";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { extractId } from "../../utils/extractId";
import { slugify } from "../../utils/slugify";

const Beer = ({ beer }) => {
  if (!beer) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>{beer.name}</h1>
        <a href={beer.url}>Détails</a>
        <p>
          Brassée par:{" "}
          <Link
            href="/brewery/[breweryId]"
            as={`/brewery/${slugify(beer.brewery.name)}-${beer.brewery.id}`}
          >
            <a>{beer.brewery.name}</a>
          </Link>
        </p>
        {beer.description.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </div>
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
