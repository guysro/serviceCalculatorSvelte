<script lang="ts">
  import { currentDate, dailyCash, dailyCred, showD, showDialog } from "../stores";

  let date: string;
  let cash: number;
  let cred: number;

  function submit() {
    console.log(date, cash, cred);
    if (cred && cash && date) {
      showD.update((val) => !val);
      showDialog.update(() => true);
      dailyCash.update(() => cash);
      dailyCred.update(() => cred);
      currentDate.update(() => date);
    } else {
      alert("חסר סעיף אחד או יותר");
    }
  }
</script>

<dialog
  class="daily-dialog"
  open={$showD}
>
  <div class="cont">
    <h2>סיכום יום</h2>
    <label for="date-in"> תאריך:</label>
    <input
      type="date"
      class="daily-input"
      name="date"
      id="date-in"
      bind:value={date}
    />
    <label for="cash-in">מזומן:</label>
    <input
      type="number"
      name="cash"
      id="cash-in"
      class="daily-input"
      bind:value={cash}
    />
    <label for="cred-in">אשראי:</label>
    <input
      type="number"
      name="cred"
      id="cred-in"
      class="daily-input"
      bind:value={cred}
    />
    <button
      on:click={submit}
      class="submit"
    >
      אישור
    </button>
  </div>
</dialog>

<style>
  .daily-dialog {
    top: 50vh;
    transform: translateY(-50%);
    animation: dropIn 0.8s;
    display: auto;
    border-radius: 10px;
  }
  .cont {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @keyframes dropIn {
    0% {
      right: -85%;
      opacity: 0;
    }
    100% {
      right: 0;
      opacity: 1;
    }
  }
  .daily-input {
    width: 15vw;
    aspect-ratio: 20/3;
    font-size: 1.5rem;
  }
  label {
    font-size: 1.5rem;
    text-decoration: underline;
  }
  .submit {
    width: 5vw;
    aspect-ratio: 20/3;
    font-size: 1.5rem;
    align-self: center;
    margin: 15px;
    margin-bottom: 5px;
    border: 1.5px solid black;
    border-radius: 15px;
    transition: all 200ms;
  }
  .submit:hover {
    cursor: pointer;
    background-color: #d0d0d0;
  }
</style>
