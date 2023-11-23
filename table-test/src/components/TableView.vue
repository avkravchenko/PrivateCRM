<template>
  <table>
    <thead>
      <th>#</th>
      <th>ФИО</th>
      <th>Диета</th>
      <th>Тариф</th>
      <th>Адрес</th>
      <th>Телефон</th>
      <th>Дата начала/конца</th>
      <th>Скидка</th>
      <th>Сумма</th>
      <th>Коммент. доставка</th>
      <th>Коммент. внутренний</th>
      <th >
        <span 
          @click.self="$emit('changeSortOrder')"
          :class="{ 'status': true, 'up-arrow': orderIcon, 'down-arrow': !orderIcon }">
            Статус
        </span>
        <SortList/>
      </th>
    </thead>
    <tbody>
      <tr v-for="user in usersToDisplay" :key="user.o_id">
        <td>
          {{ user.o_id }}
        </td>
        <td>
          {{ user.client_name }}
        </td>
        <td>
          <p v-if="user.diets.length === 1">
            {{
              user.diets[0]
            }}
          </p>
          <p v-else v-for="(item, index) in user.diets" :key="index">
            {{
              item
            }}
            <hr v-if="index !== user.diets.length - 1" />
          </p>
        </td>
        <td>
          <p v-if="user.tariff.length === 1">
            {{
              user.tariff[0]
            }}
          </p>
          <p v-else v-for="(item, index) in user.tariff" :key="index">
            {{
              item
            }}
            <hr v-if="index !== user.tariff.length - 1" />
          </p>
        </td>
        <td>
          {{ user.address }}
        </td>
        <td>{{ user.phone }}</td>
        <td>
          <p v-for="(date, index) in user.dates">{{ `${date.start_date}-${date.end_date}` }} <hr v-if="index !== user.dates.length - 1"></p>
        </td>
        <td>{{ user.discount }}%</td>
        <td>
          <p v-if="user.pay_status.toLowerCase() !== 'оплачен'">Стоим.: {{ user.order_sum }} р.</p>
          <p>{{ user.pay_status }}</p>
          <p v-if="user.pay_status.toLowerCase() !== 'оплачен'">Долг: {{ user.order_sum - +user.order_payed }} р.</p>
      </td>
      <td>{{ user.courier_comment }}</td>
      <td>{{ user.inner_comment }}</td>
      <td>
        <p v-for="(userStatus, index) in user.status">
          {{ userStatus.endDiff >= 0 ? 
            `заканчивается через ${userStatus.endDiff} дней`:
            `завершилось ${userStatus.endDiff * -1} дней назад` }}
            <hr v-if="index !== user.status.length - 1">
        </p>
      </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import SortList from '@/components/SortList.vue'
export default {
  props: {
    usersToDisplay: {
      type: Array,
      required: true,
    },
    orderIcon: {
      type: Boolean
    }
  },
  components: {
    SortList
  }
};
</script>

<style lang="scss" scoped>
table {
  margin: 20px auto;
  border: solid 1px green;
  text-align: center;
  border-collapse: collapse;

  .status {
    cursor: pointer;
  }

  .up-arrow::after {
    content: '⬆️';
    padding-left: 5px;
  }

  .down-arrow::after {
    content: '⬇️';
    padding-left: 5px;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border: solid 1px green;

    tr {
      text-align: center;
    }
  }
}
</style>
