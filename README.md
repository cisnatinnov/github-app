# Instalation

1. Install [Node](https://nodejs.org/en/download)
2. Restart Computer
3. Open terminal type 'node -v' to check [Node](https://nodejs.org/en/download) was installed

## Getting Started

### Let's build a GitHub app that enforces pinning exact dependencies in package.json: no ^, >=, or *.

### Go to your GitHub developer settings and create a new GitHub App. Make sure to note your GitHub App ID, Client ID, Client Secret, and Private Keys

Step by step for install 'Github App':
1. Click your 'Photo Profile'
2. Click 'Settings'
3. Click 'Developer Settings'
4. Click 'New Github App'
5. Confirm access
6. Fill mandatory field (GitHub App name, Homepage URL, Webhook URL)
7. 'Select an access level' each 'Permissions' on 'Repository permissions
' to grant your 'Github App' do to your choosen repository
8. Choose 'Where can this GitHub App be installed? Only on this account or Any account'
9. Select one or more 'Subscribe to events' 'Based on the permissions you’ve selected, what events would you like to subscribe to?'
10. Click 'Create Github App'
11. After the app created, you will get GitHub App ID, and Client ID
12. Click 'Generate a new client secret' to get client secret
13. 'Generate a private key to sign access token requests'
14. Choose an account to install
15. Select 'All repositories' or 'Only select repositories'
16. Click 'Install'

# OpenAI

1. Signup using google account
2. Verify Your Phone Number
3. Resolve Puzzle To Prove That You are A Human
4. Fill Verify Code
5. Create New 'api-keys'

# Implementation

1. Clone this repository `git clone https://github.com/cisnatinnov/github-app.git` or use `GitHub Desktop`
2. Install required depedencies `npm install @octokit/auth-app axios dotenv express fs node-fetch nodemon openai path`
3. Copy paste  your `GitHub App ID, Client ID, Client Secret, Private Keys` and `api-keys` to .env file


## Reference
1. http://thecodebarbarian.com/building-a-github-app-with-node-js.html
2. https://platform.openai.com/account/api-keys
3. https://medium.com/@samho1996/how-do-i-make-use-of-chatgpt-to-review-my-code-33efd8f42178