<template>
  <header><h1>Тестовое задание для PrivateCRM</h1></header>
  <TableView
    :usersToDisplay="result.flat()"
    :orderIcon="isOrderChanged"
    @changeSortOrder="isOrderChanged = !isOrderChanged"
  />
</template>

<script>
import jsonData from "@/data/data.json";
import dayjs from "dayjs";
import TableView from "@/components/TableView.vue";
import { dateHelper } from "@/utils/dateHelper";

export default {
  components: {
    TableView,
  },
  data() {
    return {
      orders: jsonData,
      isOrderChanged: true,
      firstCondition: [],
      secondCondition: [],
      thirdCondition: [],
      fourthCondition: [],
      fifthCondition: [],
      result: [[], [], [], [], []],
    };
  },

  created() {
    this.orders.forEach((user, index, arr) => {
      user["status"] = dateHelper(user.dates, "diff");
      return user;
    });
  },
  mounted() {
    this.fillConditions();
    this.sortFirstCondition(false);
    this.result[1] = this.secondCondition;
    this.result[2] = this.thirdCondition;
    this.sortFourthCondition(false);
    this.sortFifthCondition(false);
    // this.result.flat().forEach((item) => {
    //   item.dates = dateHelper(item.dates, "disp");
    // });
  },
  methods: {
    fillConditions() {
      const today = dayjs();
      const tomorrow = today.add(1, "day");
      const getLatestStartDate = (order) => {
        const startDates = order.dates.map((date) => dayjs(date.start_date));
        return startDates.reduce((latestDate, currentDate) => {
          return currentDate.isAfter(latestDate) ? currentDate : latestDate;
        }, dayjs("1970-01-01"));
      };

      const getLatestEndDate = (order) => {
        const endDates = order.dates.map((date) => dayjs(date.end_date));
        return endDates.reduce((latestDate, currentDate) => {
          return currentDate.isAfter(latestDate) ? currentDate : latestDate;
        }, dayjs("1970-01-01"));
      };

      const getEarliestEndDate = (order) => {
        const endDates = order.dates.map((date) => dayjs(date.end_date));
        return endDates.reduce((earliestDate, currentDate) => {
          return currentDate.isBefore(earliestDate)
            ? currentDate
            : earliestDate;
        }, today);
      };

      const isItEndsToday = (order) => {
        const endDates = order.dates.map((date) =>
          dayjs(date.end_date).startOf("day").isSame(today.startOf("day"))
        );
        return endDates;
      };

      const isItEndsTomorrow = (order) => {
        const endDates = order.dates.map((date) =>
          dayjs(date.end_date).isSame(tomorrow, "day")
        );
        return endDates;
      };

      for (let i = 0; i < this.orders.length; i++) {
        let latestStartDate = getLatestStartDate(this.orders[i]);
        let latestEndDate = getLatestEndDate(this.orders[i]);
        let itEndsToday = isItEndsToday(this.orders[i]);
        let itEndsTomorrow = isItEndsTomorrow(this.orders[i]);
        let itIsEarliestDate = getEarliestEndDate(this.orders[i]);

        if (latestStartDate.isAfter(today)) {
          this.firstCondition.push(this.orders[i]);
        }

        if (
          itEndsToday.some((day) => day === true) &&
          !this.firstCondition.some((day) => day.o_id === this.orders[i].o_id)
        ) {
          this.secondCondition.push(this.orders[i]);
        }

        if (
          itEndsTomorrow.some((day) => day === true) &&
          !this.firstCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.secondCondition.some((day) => day.o_id === this.orders[i].o_id)
        ) {
          this.thirdCondition.push(this.orders[i]);
        }

        if (
          latestEndDate.isAfter(tomorrow) &&
          !this.firstCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.secondCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.thirdCondition.some((day) => day.o_id === this.orders[i].o_id)
        ) {
          this.fourthCondition.push(this.orders[i]);
        }

        if (
          itIsEarliestDate.isBefore(today) &&
          !this.firstCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.secondCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.thirdCondition.some(
            (day) => day.o_id === this.orders[i].o_id
          ) &&
          !this.fourthCondition.some((day) => day.o_id === this.orders[i].o_id)
        ) {
          this.fifthCondition.push(this.orders[i]);
        }
      }
    },

    sortFirstCondition(ascDsc) {
      const getLatestStartDate = (order) => {
        const startDates = order.dates.map((date) => dayjs(date.start_date));
        return startDates.reduce((latestDate, currentDate) => {
          return currentDate.isAfter(latestDate) ? currentDate : latestDate;
        }, dayjs("1970-01-01"));
      };

      this.firstCondition.sort((a, b) => {
        const latestStartDateA = getLatestStartDate(a);
        const latestStartDateB = getLatestStartDate(b);

        if (ascDsc) {
          return latestStartDateA.diff(latestStartDateB, "day");
        } else {
          return latestStartDateB.diff(latestStartDateA, "day");
        }
      });

      this.result[0] = this.firstCondition;
    },

    sortFourthCondition(ascDsc) {
      const getLatestEndDate = (order) => {
        const endDates = order.dates.map((date) => dayjs(date.end_date));
        return endDates.reduce((latestDate, currentDate) => {
          return currentDate.isAfter(latestDate) ? currentDate : latestDate;
        }, dayjs("1970-01-01"));
      };

      this.fourthCondition.sort((a, b) => {
        const latestStartDateA = getLatestEndDate(a);
        const latestStartDateB = getLatestEndDate(b);

        if (ascDsc) {
          return latestStartDateB.diff(latestStartDateA, "day");
        } else {
          return latestStartDateA.diff(latestStartDateB, "day");
        }
      });

      this.result[3] = this.fourthCondition;
    },
    sortFifthCondition(ascDsc) {
      const today = dayjs();
      const getEarliestEndDate = (order) => {
        const endDates = order.dates.map((date) => dayjs(date.end_date));
        return endDates.reduce((earliestDate, currentDate) => {
          return currentDate.isBefore(earliestDate)
            ? currentDate
            : earliestDate;
        }, today);
      };
      this.fifthCondition.sort((a, b) => {
        const earliestDateA = getEarliestEndDate(a);
        const earliestDateB = getEarliestEndDate(b);

        if (ascDsc) {
          return earliestDateA.diff(earliestDateB, "day");
        } else {
          return earliestDateB.diff(earliestDateA, "day");
        }
      });
      this.result[4] = this.fifthCondition;
      console.log(123123123123);
    },
  },
  watch: {
    isOrderChanged(old, newValue) {
      console.log(old, newValue);
      this.sortFirstCondition(newValue);
      this.result[1] = this.secondCondition;
      this.result[2] = this.thirdCondition;
      this.sortFourthCondition(newValue);
      this.sortFifthCondition(newValue);
    },
  },
};
</script>
