/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, mkdirSync, writeFileSync } = require("fs");
const { globSync } = require("glob");
const { homepage } = require("./package.json");
const { load } = require("cheerio");

const htmlPages = globSync("./src/pages/**/*.html");
const baseTemplate = readFileSync("./src/base.html", "utf8");
const homepageURL = homepage;
const baseURL = homepageURL.endsWith("/") ? homepageURL : `${homepageURL}/`;

htmlPages.forEach((filePath) => {
  const pageContent = readFileSync(filePath, "utf8");
  const $ = load(pageContent);
  const pageTitle = $("title").text().trim();
  $("title").remove();
  const description = $('meta[name="description"]').attr("content").trim();
  $('meta[name="description"]').remove();
  let newPage = `${baseTemplate}`;
  newPage = newPage.replaceAll("__TITLE__", pageTitle);
  newPage = newPage.replaceAll("__DESCRIPTION__", description);
  const pageHead = $("head").html().trim();
  const pageBody = $("body").html().trim();
  newPage = newPage.replace("<!-- @head -->", pageHead);
  newPage = newPage.replace("<!-- @body -->", pageBody);
  const relativePath = filePath.replace("src/pages/", "");
  const fullURL = `${baseURL}${relativePath}`;
  newPage.replaceAll("__URL__", fullURL);
  const outputPath = `./dev/${relativePath}`;
  mkdirSync(outputPath.replace(/\/[^/]+$/, ""), { recursive: true });
  writeFileSync(outputPath, newPage, "utf8");
  console.log("Created:", outputPath.slice(1));
});

console.log("And... DONE");
