<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <main class="container mx-auto">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
