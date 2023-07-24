<script lang="ts">
  import { currentDate, dailyTable, monthlyTable } from "../stores";
  interface waiter {
    name: string;
    hours: number;
    date: string;
    cash: number;
    cred: number;
    seventyPercent: boolean;
  }

  interface day {
    waiters: waiter[];
  }

  let waitersSumed: { name: string; cash: number; credit: number; hours: number }[] = [];
  let allDays: day[] = [];
  let month = Number.parseInt($currentDate.slice(5, 7));

  $: $dailyTable,
    fetch("http://localhost:3001/getDays", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "month": $currentDate.slice(5, 7) })
    })
      .then((res) => res.json())
      .then((data) => (allDays = data))
      .then(() => (waitersSumed = sumWaiters(allDays)));

  function sumWaiters(days: day[]): { name: string; cash: number; credit: number; hours: number }[] {
    const sumWaitersDataMap = new Map<string, { hours: number; cash: number; credit: number }>();

    for (const day of days) {
      for (const waiter of day.waiters) {
        const existingWaiterData = sumWaitersDataMap.get(waiter.name) || { hours: 0, cash: 0, credit: 0 };
        existingWaiterData.hours += waiter.hours;
        existingWaiterData.cash += waiter.cash;
        existingWaiterData.credit += waiter.cred;
        sumWaitersDataMap.set(waiter.name, existingWaiterData);
      }
    }

    const summedWaitersDataArray: { name: string; hours: number; cash: number; credit: number }[] = [];
    for (const [name, { hours, cash, credit }] of sumWaitersDataMap) {
      summedWaitersDataArray.push({ name, hours, cash, credit });
    }

    return summedWaitersDataArray;
  }

  // const addToArr = () => {
  //   allWaiters.forEach((waiter) => {
  //     if (!waiterNames.includes(waiter.name)) {
  //       waiterNames.push(waiter.name);
  //       waitersSumed.push(waiter);
  //       console.log("added new");
  //     } else if (waiterNames.includes(waiter.name)) {
  //       waitersSumed[waiterNames.indexOf(waiter.name)].cash += waiter.cash;
  //       waitersSumed[waiterNames.indexOf(waiter.name)].cred += waiter.cred;
  //       waitersSumed[waiterNames.indexOf(waiter.name)].hours += waiter.hours;
  //       console.log("added params");
  //     }
  //   });
  //   return "";
  // };
</script>

{#if $monthlyTable}
  <!-- {addToArr()} -->
  <table>
    <tr>
      <th>שם</th>
      <th>שעות</th>
      <th>מזומן</th>
      <th>אשראי</th>
    </tr>
    {#each waitersSumed as waiter}
      <tr>
        <th>{waiter.name}</th>
        <td>{waiter.hours.toFixed(2)}</td>
        <td>{waiter.cash.toFixed(2)}</td>
        <td>{waiter.credit.toFixed(2)}</td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  table {
    border: 1px solid black;
    font-size: 25px;
    border-spacing: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  tr {
    border: 1px solid black;
  }
  th {
    font-size: 30px;
  }
  td,
  th {
    border: 1px solid black;
    width: fit-content;
    height: 2vh;
    padding: 10px;
  }
</style>
