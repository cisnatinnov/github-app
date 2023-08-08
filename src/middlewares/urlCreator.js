const urlContent = (repo, file) => {
  let link = `https://api.github.com/repos/${repo}/contents`

  if (file) link = `https://api.github.com/repos/${repo}/contents/${file}`

  return link;
}

const urlCheckRuns = (repo) => {
  let link = `https://api.github.com/repos/${repo}/check-runs`

  return link;
}

module.exports = {
  urlContent,
  urlCheckRuns
}