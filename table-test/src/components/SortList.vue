<template>
  <div>
    <select v-model="selectedOption">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: null,
      options: [
        { label: "Начинается через Х дней", value: "startsInXDays" },
        { label: "Заканчивается сегодня", value: "endsToday" },
        { label: "Заканчивается завтра", value: "endsTomorrow" },
        { label: "Заканчивается через Х дней", value: "endsInXDays" },
        { label: "Закончилось Х дней назад", value: "endedXDaysAgo" },
      ],
    };
  },
  beforeMount() {
    // Set selectedOption based on the query parameter
    const queryOption = this.$route;
    console.log(queryOption);
  },
  watch: {
    selectedOption(newOption) {
      // Update the query parameter when selectedOption changes
      this.$router.push({ query: { option: newOption } });
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>
