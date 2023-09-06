<template>
  <article
    class="p-4 bg-white rounded-lg shadow-xl place-content-center text-slate-800"
  >
    <header>
      <h1 class="pb-5 text-lg font-semibold"><slot name="header"></slot></h1>
    </header>
    <slot></slot>
  </article>
</template>
