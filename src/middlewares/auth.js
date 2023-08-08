const { createAppAuth } = require('@octokit/auth-app');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const fs = require('fs');

// Replace with the path to your private key file
const pem = fs.readFileSync('./waizly-smee.private-key.pem', 'utf8');

// This function creates a JWT that you can use with
// Axios or any other HTTP client to make requests to
// GitHub as your app.
const createJWT = async (installationId) => {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: pem,
    installationId,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  });

  const { token } = await auth({ type: 'installation' });
  return token;
}

// Given an object, return true if all the values
// are semver version strings. `1.2.3` is OK, `>=1.2.3`
// is not.
const isStrictDependencies = (deps) => {
  return !Object.keys(deps).find(key => {
    return !/^\d+\.\d+\.\d+$/.test(deps[key]);
  });
}

module.exports = {
  createJWT,
  isStrictDependencies
}