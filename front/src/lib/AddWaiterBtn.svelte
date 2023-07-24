<script lang="ts">
  import { dailyTable, monthlyTable, showD, showDialog } from "../stores";

  function dialogToggle() {
    showDialog.update((val) => !val);
    dailyTable.update(() => false);
    monthlyTable.update(() => false);
  }
  function changeDialog() {
    if (!$showD && $showDialog) {
      dialogToggle();
      setTimeout(dialogToggle, 100);
    } else if (!$showDialog) {
      dialogToggle();
    } else {
      alert("צריך קודם למלא את הסיכום היומי");
    }
  }
</script>

<button
  class="dialogBtn"
  on:click={changeDialog}
  >הוספת מלצרים
</button>

<style>
  .dialogBtn {
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
  }
  .dialogBtn:hover {
    scale: 1.1;
    cursor: pointer;
  }
</style>
