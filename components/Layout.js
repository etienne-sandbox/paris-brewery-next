import React from "react";
import Head from "next/head";
import Beer from "./Beer";
import Link from "next/link";

const Layout = ({ children, isAbout = false }) => {
  return (
    <div className="content">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <Link href="/">
          <a className="home-link">
            <div className="beer">
              <Beer width="60" />
            </div>
            <h1>Paris Microbrasseries</h1>
          </a>
        </Link>
        {isAbout === false && (
          <Link href="/about">
            <a className="about">À propos</a>
          </Link>
        )}
      </header>
      <div>{children}</div>

      <style jsx>{`
        header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background: white;
          padding: 20px 40px;
          border-radius: 4px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .beer {
          margin-right: 20px;
        }
        .home-link {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: inherit;
          text-decoration: none;
        }
        h1 {
          font-weight: 400;
          margin: 0;
        }
        .about {
          font-size: 2em;
          text-decoration: none;
        }
        .about:hover {
          text-decoration: underline;
        }

        .content {
          max-width: 960px;
          margin: auto;
          padding: 40px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: Quicksand;
          background: #81c784;
          color: #263238;
        }
      `}</style>
    </div>
  );
};

export default Layout;
