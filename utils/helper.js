const uniqid = require("uniqid");
const md5 = require("md5");

function nl2br(str) {
  return str.replace(/([^>])\n/g, "$1<br/>\n");
}

const set_filename = () => md5(uniqid());

const isEmpty = value =>
  value === null ||
  value === undefined ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = { nl2br, set_filename, isEmpty };
