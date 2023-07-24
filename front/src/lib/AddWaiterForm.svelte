<script lang="ts">
  import calcWaiters from "../moneyCalcHelpers";
  import { currentDate, dailyCash, dailyCred, showDialog, waiters } from "../stores";

  interface waiter {
    name: string;
    hours: number;
    date: string;
    seventyPercent: boolean;
  }

  let hours: number;
  let minutes: number;
  let name: string;
  let is70: boolean;

  let curentWaiter: waiter;
  let waiterList = [];

  async function addWaiter() {
    if (is70 == undefined) {
      is70 = false;
    }
    let timeInHours: number = minutes / 60 + hours;
    // console.log(timeInHours, name, $currentDate, is70);
    curentWaiter = { name: name, hours: Number.parseFloat(timeInHours.toFixed(2)), date: $currentDate, seventyPercent: is70 };
    waiterList.push(curentWaiter);

    await fetch("http://localhost:3001/addWaiter", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "name": curentWaiter.name, "hours": curentWaiter.hours, "date": curentWaiter.date, "seventyPercent": curentWaiter.seventyPercent })
    });
    // .then((res) => console.log(res.json()));

    name = "";
    hours = null;
    minutes = null;
    is70 = false;
  }

  async function finishAdd() {
    waiters.update((arr) => waiterList.concat(arr));
    if ($waiters[$waiters.length - 1] == null && $waiters[$waiters.length - 1] == undefined) {
      $waiters.pop();
    }
    // console.log($waiters);
    let waiterListToDate: [];
    let dayExists: boolean = false;

    await fetch("http://localhost:3001/getByDate", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "date": $currentDate })
    })
      .then((res) => res.json())
      .then((data) => (waiterListToDate = data));

    let calcedWaiters: {}[] = calcWaiters($waiters, $dailyCash, $dailyCred);
    calcedWaiters.forEach(async (waiter) => {
      let waiterExists = false;
      console.log(waiter);
      await fetch("http://localhost:3001/checkWaiterCalc", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(waiter)
      })
        .then((res) => res.json())
        .then((data) => (waiterExists = data));
      if (waiterExists) {
        await fetch("http://localhost:3001/updateCalcWaiter", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(waiter)
        });
      } else {
        await fetch("http://localhost:3001/addCalcedWaiter", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(waiter)
        });
      }
    });

    await fetch("http://localhost:3001/checkDate", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "date": $currentDate })
    })
      .then((res) => res.json())
      .then((data) => (dayExists = data));

    if (dayExists) {
      await fetch("http://localhost:3001/updateDay", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ "date": $currentDate, "waiters": calcedWaiters, "cash": $dailyCash, "cred": $dailyCred })
      });
      // .then((res) => console.log(res.json()));
    } else {
      await fetch("http://localhost:3001/addDay", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ "date": $currentDate, "waiters": calcedWaiters, "cash": $dailyCash, "credit": $dailyCred })
      });
    }
    waiterList = [];
  }
</script>

<dialog
  open={$showDialog}
  class="form"
>
  <div class="form-cont">
    <h2>הוספת מלצר</h2>
    <label for="name-in">שם:</label>
    <input
      type="text"
      name="name"
      id="name-in"
      class="add-input"
      bind:value={name}
    />
    <label for="hours-in">שעות:</label>
    <input
      type="number"
      name="hours"
      id="hours-in"
      class="add-input"
      bind:value={hours}
    />
    <label for="minutes-in">דקות:</label>
    <input
      type="number"
      name="minutes"
      id="minutes-in"
      class="add-input"
      bind:value={minutes}
    />
    <div class="is70-cont">
      <label for="is70-in">70%?</label>
      <input
        type="checkbox"
        name="is70"
        id="is70-in"
        class="is70"
        bind:checked={is70}
      />
    </div>
    <button
      class="submit"
      on:click={addWaiter}
    >
      הוספה
    </button>
    <button
      class="submit finish"
      on:click={finishAdd}
    >
      סיום
    </button>
  </div>
</dialog>

<style>
  .form-cont {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .form {
    position: absolute;
    top: 50vh;
    transform: translateY(-50%);
    animation: dropIn 0.8s;
  }
  @keyframes dropIn {
    0% {
      left: -80%;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }
  .add-input {
    width: 15vw;
    aspect-ratio: 20/3;
    font-size: 1.5rem;
  }
  label {
    font-size: 1.5rem;
    text-decoration: underline;
  }
  .submit {
    width: 6vw;
    aspect-ratio: 20/4;
    font-size: 1.5rem;
    align-self: center;
    margin: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1.5px solid black;
    border-radius: 15px;
    transition: all 200ms;
  }
  .submit:hover {
    cursor: pointer;
    background-color: #d0d0d0;
  }
  .finish {
    margin-top: -5px;
  }
  .is70 {
    width: 3vw;
    aspect-ratio: 1/1;
    margin-right: 2vw;
  }
  .is70:hover {
    cursor: pointer;
  }
  .is70-cont {
    display: flex;
    align-items: center;
  }
</style>
