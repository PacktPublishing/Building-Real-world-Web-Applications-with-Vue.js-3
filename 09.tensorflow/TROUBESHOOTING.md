# Trouble shooting

This document should help you resolve technical issues you may encounter.

## Development environment

The code has been writen using a long term stable (LTS) version of Node: [Node v18.12.0 (LTS)](https://nodejs.org/en/blog/release/v18.12.0). It is recommended to use the same or similar version.

💡 You can use [NVM](https://github.com/nvm-sh/nvm#node-version-manager---) to better control versions of Node between applications.

## Dependency versioning

While I encourage starting with the latest version of packages (which tend to include bugfixes over time), sometimes the latest version can be conflicting or not compatible with the setup. Then please note the following versions that were used in this project (this information is stored in the `package.json` and `package-lock.json` files as well).

### Tensorflow installation

Instead of installing the latest version with the `npm install @tensorflow/tfjs-backend-cpu @tensorflow/tfjs-backend-webgl` command, you can use the same versions with the following command: `npm install @tensorflow/tfjs-backend-cpu@4.13.0 @tensorflow/tfjs-backend-webgl@4.13.0`

### Coco SSD installation

Instead of installing the latest version with the `npm install @tensorflow-models/coco-ssd` command, you can use the same versions with the following command: `npm install @tensorflow-models/coco-ssd@2.2.3`

### VueUse installation

Instead of installing the latest version with the `npm i @vueuse/core` command, you can use the same versions with the following command: `npm i @vueuse/core@10.5.0`

### SSL plugin installation

Instead of installing the latest version with the `npm install --save-dev @vitejs/plugin-basic-ssl` command, you can use the same versions with the following command: `npm install --save-dev @vitejs/plugin-basic-ssl@1.0.1`