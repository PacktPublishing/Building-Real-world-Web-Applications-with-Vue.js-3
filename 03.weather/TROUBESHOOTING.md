# Trouble shooting

This document should help you resolve technical issues you may encounter.

## Development environment

The code has been writen using a long term stable (LTS) version of Node: [Node v18.12.0 (LTS)](https://nodejs.org/en/blog/release/v18.12.0). It is recommended to use the same or similar version.

💡 You can use [NVM](https://github.com/nvm-sh/nvm#node-version-manager---) to better control versions of Node between applications.

## Dependency versioning

While I encourage starting with the latest version of packages (which tend to include bugfixes over time), sometimes the latest version can be conflicting or not compatible with the setup. Then please note the following versions that were used in this project (this information is stored in the `package.json` and `package-lock.json` files as well).

### Project initialisation

Instead of initialising the app with `npm init vue@latest` you could pinpoint the exact same version as the source material by running `npm init vue@3.2.47`

Since it's an initialisation script, I would recommend starting with a clean slate instead of changing the version after installation.

### Syntax error

On **page 38 in the book**, when defining the `q` constant by combining the latitude and longitude in a template string, the backticks '`' are accidentally omitted from the instruction.

The instruction in the book shows:

```js
const q = ${latitude},${longitude};
```

The correct notation should be (note the backticks surrounding the template string):

```js
const q = `${latitude},${longitude}`;
```

Omitting the template stings will result in a syntax error.