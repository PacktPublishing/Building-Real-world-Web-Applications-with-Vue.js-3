<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { socket } from "@/socket";

const route = useRoute();
const router = useRouter();

const init = (id: string): void => {
  socket.emit('quiz:select', id);
}

onMounted(() => {
  const id = route.params.id;
  if (id) {
    init(id.toString());
    router.push('/lobby');
  }
});
</script>