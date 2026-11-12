import fs from "fs";

function check(name, html, needles) {
  const miss = needles.filter((n) => !html.includes(n));
  console.log(miss.length ? `FAIL ${name}: missing ${miss.join(" | ")}` : `OK   ${name}`);
  return miss.length === 0;
}

const home = fs.readFileSync("dist/index.html", "utf8");
const about = fs.readFileSync("dist/about/index.html", "utf8");
const hub = fs.readFileSync("dist/logistics/corridors/index.html", "utf8");
const leaf = fs.readFileSync(
  "dist/logistics/corridors/surat-hazira-nagpur-chandrapur/index.html",
  "utf8",
);

const allOk = [
  check("home", home, [
    // HTML serializes & as &amp; in attributes/title
    "ZAFTYS | 3PL &amp; Contract Logistics India",
    'og:site_name" content="ZAFTYS"',
    "youtube.com/@ZAFTYS",
    "x.com/zaftyslogistics",
    "ZAFTYS.</span>",
    "application/ld+json",
  ]),
  check("about", about, [
    "About ZAFTYS | Contract Logistics",
    "Shop and Establishment",
    "Badnera",
    "Who ZAFTYS is",
  ]),
  check("hub", hub, ["Routes", "Corridors", "Surat-Nagpur", "application/ld+json"]),
  check("leaf", leaf, ["Surat and Hazira", "DeliveryService", "Surat-Nagpur"]),
].every(Boolean);

process.exit(allOk ? 0 : 1);
