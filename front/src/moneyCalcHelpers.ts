function calcWaiters(waiters, cash, cred) {
  let waitersCalced = [{}];
  waitersCalced = [];
  let totalHours = 0;
  waiters.forEach((waiter) => {
    totalHours += waiter.hours;
  });

  let cash70 = 0;
  let cred70 = 0;

  let cashPerHour70 = (cash / totalHours) * 0.7;
  let creditPerHour70 = (cred / totalHours) * 0.7;

  waiters.forEach((waiter) => {
    if (waiter.seventyPercent) {
      let currentWaiterName = waiter.name;
      let currentWaiterCash = Number.parseFloat((cashPerHour70 * waiter.hours).toFixed(2));
      let currentWaiterCred = Number.parseFloat((creditPerHour70 * waiter.hours).toFixed(2));

      cash70 += currentWaiterCash;
      cred70 += currentWaiterCred;

      totalHours -= waiter.hours;
      let waiterCalced = { name: currentWaiterName, cash: currentWaiterCash, cred: currentWaiterCred, date: waiter.date, seventyPercent: waiter.seventyPercent, hours: waiter.hours };
      waitersCalced.push(waiterCalced);
    }
  });

  let cashAfter70 = cash - cash70;
  let credAfter70 = cred - cred70;
  let cashPerHour = cashAfter70 / totalHours;
  let creditPerHour = credAfter70 / totalHours;

  waiters.forEach((waiter) => {
    if (!waiter.seventyPercent) {
      let currentWaiterName = waiter.name;
      let currentWaiterCash = Number.parseFloat((cashPerHour * waiter.hours).toFixed(2));
      let currentWaiterCred = Number.parseFloat((creditPerHour * waiter.hours).toFixed(2));

      totalHours -= waiter.hours;
      let waiterCalced = { name: currentWaiterName, cash: currentWaiterCash, cred: currentWaiterCred, date: waiter.date, seventyPercent: waiter.seventyPercent, hours: waiter.hours };
      waitersCalced.push(waiterCalced);
    }
  });
  return waitersCalced;
}

export default calcWaiters;
