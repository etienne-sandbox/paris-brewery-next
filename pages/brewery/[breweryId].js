import React from "react";
import Head from "next/head";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { extractId } from "../../utils/extractId";

const Brewery = ({ brewery }) => {
  if (!brewery) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>{brewery.name}</h1>
        <a href={brewery.website}>Site web</a>
        <div>
          {brewery.description.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </div>
        <ul>
          {brewery.beers.map(beer => {
            return (
              <li key={beer.id}>
                <Link href="/beer/[beerId]" as={`/beer/${beer.id}`}>
                  <a>{beer.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
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
