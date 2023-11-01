<template>
  <div class="bg-green-100">
    <div class="container flex items-center justify-between p-4 py-8 mx-auto">
      <div>
        Made with ❤️ using
        <ULink
          to="https://www.nuxt.com/"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
          >NuxtJs</ULink
        >
        &amp;
        <ULink
          to="https://www.storyblok.com/"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
          >Storyblok</ULink
        >
      </div>
      <div>Copyright {{ new Date().getFullYear() }}</div>
    </div>
  </div>
</template>
