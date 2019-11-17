import React from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { slugify } from "../utils/slugify";

const Home = ({ breweries }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href="/about">
          <a>A propos</a>
        </Link>
        <ul>
          {breweries.map(brewery => {
            return (
              <li key={brewery.id}>
                <Link
                  href="/brewery/[breweryId]"
                  as={`/brewery/${slugify(brewery.name)}-${brewery.id}`}
                >
                  <a>{brewery.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await axios.get(
    "https://paris-brewery-api.herokuapp.com/brewery"
  );
  return { breweries: res.data };
};

export default Home;
