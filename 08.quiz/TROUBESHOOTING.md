# Trouble shooting

This document should help you resolve technical issues you may encounter.

## Development environment

The code has been writen using a long term stable (LTS) version of Node: [Node v18.12.0 (LTS)](https://nodejs.org/en/blog/release/v18.12.0). It is recommended to use the same or similar version.

💡 You can use [NVM](https://github.com/nvm-sh/nvm#node-version-manager---) to better control versions of Node between applications.

## Dependency versioning

While I encourage starting with the latest version of packages (which tend to include bugfixes over time), sometimes the latest version can be conflicting or not compatible with the setup. Then please note the following versions that were used in this project (this information is stored in the `package.json` and `package-lock.json` files as well).

### Server initialisation

Instead of initialising the app with `npx nuxi@latest init server` you could pinpoint the exact same version as the source material by running `npx nuxi@3.7.3 init server`

Since it's an initialisation script, I would recommend starting with a clean slate instead of changing the version after installation.

#### Vuetify plugin installation

Instead of installing the latest version with the `npm install --save-dev @invictus.codes/nuxt-vuetify` command, you can use the same versions with the following command: `npm install --save-dev @invictus.codes/nuxt-vuetify@0.3.0`

#### Supabase installation

Instead of installing the latest version with the `npm install @supabase/supabase-js` command, you can use the same versions with the following command: `npm install @supabase/supabase-js@2.36.0`

#### Pinia installation

Instead of installing the latest version with the `npm install pinia @pinia/nuxt` command, you can use the same versions with the following command: `npm install pinia@2.1.6 @pinia/nuxt@0.4.11`

### Node project initialisation

Instead of initialising the app with `npm install express socket.io ts-node @types/node` you could pinpoint the exact same version as the source material by running `npm install express@4.18.2 socket.io@4.7.2 ts-node@10.9.1 @types/node@20.7.0`

Since it's an initialisation script, I would recommend starting with a clean slate instead of changing the version after installation.

#### Setting up scripts in parallel

Instead of installing the latest versions with the `npm install nodemon npm-run-all ts-node @types/node open chalk` command, you can use the same versions with the following command: `npm install nodemon@3.0.1 npm-run-all@4.1.5 ts-node@10.9.1 @types/node@20.7.0 open@9.1.0 chalk@5.3.0`

### Creating the Client Quiz App

Instead of initialising the app with `npm create vuetify` you could pinpoint the exact same version as the source material by running `npm create vuetify@3.3.17`

Since it's an initialisation script, I would recommend starting with a clean slate instead of changing the version after installation.

#### Adding the Socket Client

Instead of installing the latest version with the `npm install socket.io-client` command, you can use the same versions with the following command: `npm install socket.io-client@4.7.2`

#### Adding confetti

Instead of installing the latest version with the `npm install vue-confetti-explosion` command, you can use the same versions with the following command: `npm install vue-confetti-explosion@1.0.2`