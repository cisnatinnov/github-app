const express = require('express');
const app = express();
const { createJWT, isStrictDependencies } = require('../middlewares/auth');
const { urlContent } = require('../middlewares/urlCreator');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

app.post('/', async (req, res) => {
  let body = req.body,
  installationId = body.installation.id,
  repo = body.repository.full_name
  await getPackageJSON(repo, installationId, res);
})

app.get('/', (req, res) => {
  console.log('Github get');
})

const githubRequest = async (url, installationId, method, data) => {
  const token = await createJWT(installationId);

  const accept = url.includes('/check-runs') ?
    'application/vnd.github.antiope-preview+json' :
    'application/vnd.github.machine-man-preview+json';

    const res = await axios({
      method,
      url: url,
      data,
      headers: {
        authorization: `bearer ${token}`,
        accept
      }
    });
  return res.data;
}

const getResponse = async (openai, request) => {
  const completion = await openai.createChatCompletion(request);

  const review = completion.data?.choices[0]?.message?.content;
  return review;
};

const getPackageJSON = async (repo, installationId, res) => {
  const pkg = await githubRequest(urlContent(repo, 'package.json'), installationId).
    then(res => res.content).
    then(content => Buffer.from(content, 'base64').toString('utf8'));

  const reset = '\x1b[0m';
  const green = '\x1b[32m';
  try {    
    const prompt = `
    Review the code below and provide feedback on how to improve it.
    ${pkg}`

    // Config OpenAI API.
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Get a response from OpenAI API.
    await getResponse(openai, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
    .then((response) => {
      console.log(`${green}Review package.json:${reset}\n${response}${reset}\n`);
    })
    .catch((error) => {
      console.error(error);
    })

    const data = JSON.parse(pkg),
    dependencies = data.dependencies,
    strictDependencies = isStrictDependencies(dependencies);

    if (strictDependencies) console.log(`${green}Review package.json:${reset}`)
    else console.log(`Must use dependencies with specific version`)
  } catch (err) {
    console.log(res, err);
  }
}

module.exports = app