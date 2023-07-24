<script lang="ts">
  import AddWaiterBtn from "./lib/AddWaiterBtn.svelte";
  import AddWaiterForm from "./lib/AddWaiterForm.svelte";
  import DailyForm from "./lib/DailyForm.svelte";
  import DailyTable from "./lib/DailyTable.svelte";
  import DailyTableBtn from "./lib/DailyTableBtn.svelte";
  import MonthlyTable from "./lib/MonthlyTable.svelte";
  import MonthlyTableBtn from "./lib/MonthlyTableBtn.svelte";
  import Nav from "./lib/Nav.svelte";
</script>

<main>
  <DailyForm />
  <Nav>
    <AddWaiterBtn />
    <DailyTableBtn />
    <MonthlyTableBtn />
  </Nav>
  <AddWaiterForm />
  <DailyTable />
  <MonthlyTable />
</main>

<style>
</style>
