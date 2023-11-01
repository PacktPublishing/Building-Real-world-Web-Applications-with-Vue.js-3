<template>
  <header class="w-full py-8 mb-4 border-b-2">
    <div class="container flex items-center justify-between h-full mx-auto">
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
