// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt'
  ],
  vuetify: {
    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      styles: true,
      autoImport: true,
      useVuetifyLabs: true,
    }
  },
  pinia: {
    autoImports: [
      'storeToRefs',
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
})
