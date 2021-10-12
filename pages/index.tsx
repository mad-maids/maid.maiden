import { dynamic, Fallback, useDeno } from "aleph/react";
import React from "react";
import Button from "~/components/Button.tsx";
import GreyTriangle from "~/components/GreyTriangle.tsx";

const thisYear = (new Date()).getFullYear();
const title = "Maiden";
const about = "API for educational purposes.";
const keywords = [
  "maid",
  "mad maids",
  "api",
  "rest",
];
const ogImage = "https://og-serverless-git-master-darkristy.vercel.app/og.jpg" +
  "?title=API%20for%20educational%20purposes!&author=Mad%20Maids&website=api.maid.uz&handle=@uwussimo&image=https://genemator.uz/gifs/cm.gif";

const UniverseTriangle = dynamic(() =>
  import("~/components/UniverseTriangle.tsx")
);

export default function Home() {
  const { version } = useDeno(() => ({
    version: Deno.version.deno,
  }));

  return (
    <div className="index-page">
      <head>
        <title>{title}</title>
        <meta name="description" content={about} />
        <meta name="keywords" content={keywords.join(",")} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={about} />
        <meta name="og:image" content={ogImage} />
        <link rel="stylesheet" href="~/style/index.css" />
      </head>
      <div className="fullscreen-page">
        <Fallback to={<GreyTriangle />}>
          <UniverseTriangle />
        </Fallback>
        <h1>Server for Educational Purposes.</h1>
        <p className="intro">
          <strong>Maiden</strong>{" "}
          is an rest api with WIUT related database which gives you the best
          developer experience for building modern web applications:<br />{" "}
          Timetable, Intranet and Access to Mad Maid's Applications,<br />{" "}
          additional developer tools brought by Mad Maids to you!
        </p>
        <p className="intro short">
          <strong>Aleph.js</strong>{" "}
          gives you the best developer experience for building modern web
          applications in Deno.
        </p>
        <div className="buttons">
          <a href="/docs/get-started">
            <Button strong>Get Started</Button>
          </a>
          <a href="/docs">
            <Button strong>Documentation</Button>
          </a>
        </div>
      </div>
      <footer>
        <p>Copyright © {thisYear} Mad Maids.</p>
        <p>Built with Deno - v{version}</p>
        <p>(AGPL-3.0 License)</p>
      </footer>
    </div>
  );
}
