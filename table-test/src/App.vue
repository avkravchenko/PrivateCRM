<template>
  <header><h1>Тестовое задание для PrivateCRM</h1></header>
  <TableView
    @changeSortOrder="changeTheOrder"
    :usersToDisplay="displayedData"
    :orderIcon="isOrderChanged"
  />
</template>

<script>
import jsonData from "@/data/data.json";
import { dateHelper } from "@/utils/dateHelper";
import { findMaxAndSort } from "@/utils/findMaxAndSort";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import TableView from "@/components/TableView.vue";

export default {
  components: {
    TableView,
  },
  data() {
    return {
      users: jsonData,
      formattedData: [],
      sortedData: [],
      isOrderChanged: false,
    };
  },
  computed: {
    displayedData() {
      return this.sortedData.length > 0 ? this.sortedData : this.formattedData;
    },
  },
  watch: {
    "$route.query.option": function (newOption, oldOption) {
      if (
        newOption === "startsInXDays" ||
        newOption === "endsToday" ||
        newOption === "endsTomorrow" ||
        newOption === "endsInXDays" ||
        newOption === "endedXDaysAgo"
      ) {
        this.sortData(newOption);
      }
    },
    isOrderChanged: function () {
      this.sortData(this.$route.query.option);
    },
  },
  created() {
    this.formattedData = jsonData.map((user, index, arr) => {
      user["status"] = dateHelper(user.dates, "diff");
      user.dates = dateHelper(user.dates, "disp");
      return user;
    });
  },
  methods: {
    changeTheOrder() {
      console.log(111);
      if (this.$route.query.option) this.isOrderChanged = !this.isOrderChanged;
    },
    sortData(mode) {
      this.sortedData = [...this.formattedData].sort((a, b) => {
        return findMaxAndSort(a.status, b.status, this.isOrderChanged, mode);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Poppins", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

header {
  text-align: center;
}
</style>
