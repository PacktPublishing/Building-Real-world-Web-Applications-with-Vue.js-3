<template>
  <v-card class="mx-auto" width="600">
    <template v-slot:title>Welcome to the Admin Panel</template>
    <v-card-text>
      <p>
        Via this interface, you can create and edit quizzes. This panel is not
        perfect, but it works. As an extra challenge consider implementing the
        following features:
      </p>
      <ul class="ma-4">
        <li>
          Adding meta data to a quiz, such as a title and make it more
          identifiable in Admin Panel;
        </li>
        <li>Managing the order of Questions in a Quiz;</li>
        <li>Securing the Admin Panel via the Supabase OTP authentication;</li>
        <li>Adding validation on the Question dialog inputs</li>
      </ul>
      <p>Good luck!</p>
    </v-card-text>
  </v-card>
</template>
