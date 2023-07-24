<script lang="ts">
  import { currentDate, dailyTable, showDialog } from "../stores";
  interface waiter {
    name: string;
    hours: number;
    date: string;
    cash: number;
    cred: number;
    seventyPercent: boolean;
  }

  interface day {
    date: string;
    cash: number;
    credit: number;
    waiters: waiter[];
  }

  let day: day;
  $: $dailyTable,
    fetch("http://localhost:3001/getCurrentDay", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "date": $currentDate })
    })
      .then((res) => res.json())
      .then((data) => (day = data));
</script>

<table>
  {#if $dailyTable}
    {#if day}
      <tr>
        <th>שם</th>
        <th>שעות</th>
        <th>מזומן</th>
        <th>אשראי</th>
        <th>70%</th>
      </tr>
      {#each day.waiters as waiter}
        <tr>
          <th>{waiter.name}</th>
          <td>{waiter.hours}</td>
          <td>{waiter.cash}</td>
          <td>{waiter.cred}</td>
          <td>{waiter.seventyPercent ? "כן" : "לא"}</td>
        </tr>
      {/each}
    {:else}
      {alert("אין מלצרים")}
      {dailyTable.update(() => false)}
      {showDialog.update(() => true)}
    {/if}
  {/if}
</table>

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
