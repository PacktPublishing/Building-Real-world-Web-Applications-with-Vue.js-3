<template>
  <header class="w-full py-8 border-b-2 mb-4">
    <div class="container h-full mx-auto flex items-center justify-between">
      <ULink
        to="/"
        class="font-bold"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
        >🏡 Home</ULink
      >
      <nav>
        <ul class="flex space-x-8 text-lg font-bold">
          <li>
            <ULink
              to="/portfolio"
              active-class="text-primary"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
              >🗂️ Portfolio</ULink
            >
          </li>
          <li>
            <ULink
              to="/me"
              active-class="text-primary"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
              >🧑‍💻 Me</ULink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
