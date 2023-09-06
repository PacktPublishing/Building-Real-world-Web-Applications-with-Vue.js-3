<script setup lang="ts">
import { onMounted } from 'vue';
import { session, supabase } from 'src/boot/supabase';
import ButtonSignOut from 'src/components/ButtonSignOut.vue';

const upsertUser = async (user: { id: string; email: string }) => {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, email_address: user.email, updated_at: new Date() })
    .select();
  if (error) throw error;
};

onMounted(async () => {
  if (session.value?.user) {
    const { id, email } = session.value.user;
    await upsertUser({ id, email });
  }
});
</script>

<template>
  <q-page class="column items-center justify-center">
    <h1 class="text-h1">Account</h1>

    <q-card class="q-pa-lg row flex-center flex"
      >Signed in as {{ session?.user?.email }}<br />
      <button-sign-out flat />
    </q-card>
  </q-page>
</template>
