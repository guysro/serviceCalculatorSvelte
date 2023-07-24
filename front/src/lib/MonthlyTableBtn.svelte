<script lang="ts">
  import { dailyTable, monthlyTable, showD, showDialog } from "../stores";

  const showTable = () => {
    if (!$showD) {
      monthlyTable.update((val) => !val);
      showD.update((val) => (val ? false : null));
      showDialog.update((val) => (val ? false : null));
      dailyTable.update((val) => (val ? false : null));
    } else {
      alert("קודם למלא את הטופס היומי");
    }
  };
</script>

<button
  class="dailyFormBtn"
  on:click={showTable}
>
  סיכום חודשי
</button>

<style>
  .dailyFormBtn {
    width: fit-content;
    padding-block: 5%;
    height: 8vh;
    border: 1.5px solid black;
    border-radius: 20px;
    background-color: #00000044;
    font-weight: 500;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 25px;
    color: #eeeeee;
    transition: all 0.2s;
    margin-right: 15px;
  }
  .dailyFormBtn:hover {
    scale: 1.1;
    cursor: pointer;
  }
</style>
