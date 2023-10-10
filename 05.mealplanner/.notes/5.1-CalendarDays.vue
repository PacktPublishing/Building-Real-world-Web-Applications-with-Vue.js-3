<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
    required: false,
    default: 7,
  },
});

interface Card {
  date: Date;
  content: string;
}

const generateCards = (startDate: Date, numberOfDays: number): Card[] => {
  const cards: Card[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate.getTime());
    const content = Card ${i + 1};
    cards.push({ date, content });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return cards;
};
const cards = ref<Card[]>(generateCards(props.date, props.days));
</script>