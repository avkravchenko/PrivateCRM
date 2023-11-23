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
  mounted() {
    //   пробовал после перезагрузки достать с помощью this.$route.query.option, но так и не получилось, поэтому метод с window
    const queryOption = window.location.search.match(/=([^&]+)/);
    const value = queryOption[1];
    if (this.options.some((option) => option.value === value)) {
      this.selectedOption = value;
    }
  },
  watch: {
    selectedOption(newOption) {
      this.$router.push({ query: { option: newOption } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
