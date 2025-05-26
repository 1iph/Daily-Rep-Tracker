const Counter = document.getElementById("repCount")
const Decrease = document.getElementById("decrease")
const Increase = document.getElementById("increase")
const Save = document.getElementById("saved")
const MonthlyTotal = document.getElementById("monthly-total")
const DailyTotal = document.getElementById("daily-total")
const ClearButton = document.getElementById("clear")

window.addEventListener("DOMContentLoaded", () => {
  // Load saved reps and reset dates
  const savedCount = localStorage.getItem("repCount");
  const savedDaily = localStorage.getItem("dailyTotal");
  const savedMonthly = localStorage.getItem("monthlyTotal");
  const lastDailyReset = localStorage.getItem("lastDailyReset");
  const lastMonthlyReset = localStorage.getItem("lastMonthlyReset");

  if (savedCount !== null) Counter.textContent = savedCount;
  if (savedDaily !== null) DailyTotal.textContent = savedDaily;
  if (savedMonthly !== null) MonthlyTotal.textContent = savedMonthly;

  // Reset daily and monthly totals if needed
  resetDailyIfNeeded(lastDailyReset);
  resetMonthlyIfNeeded(lastMonthlyReset);
});

ClearButton.addEventListener("click", ClearHistory)
Increase.addEventListener("click", AddReps)
Decrease.addEventListener("click", DecreaseReps)
Save.addEventListener("click", SaveReps)

function AddReps() {
  let currentCount = parseInt(Counter.textContent);
  currentCount += 1;
  Counter.textContent = currentCount;
}

function DecreaseReps() {
  let currentCount = parseInt(Counter.textContent);
  if (currentCount > 0) {
    currentCount -= 1;
  }
  Counter.textContent = currentCount;
}

function SaveReps() {
  const count = parseInt(Counter.textContent);
  const daily = parseInt(DailyTotal.textContent);
  const monthly = parseInt(MonthlyTotal.textContent);

  const newDaily = daily + count;
  const newMonthly = monthly + count;

  DailyTotal.textContent = newDaily;
  MonthlyTotal.textContent = newMonthly;
  Counter.textContent = 0;

  // Save to localStorage
  localStorage.setItem("repCount", 0);
  localStorage.setItem("dailyTotal", newDaily);
  localStorage.setItem("monthlyTotal", newMonthly);
}

// Reset daily reps at 12 PM if date changed
function resetDailyIfNeeded(lastReset) {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);

  if (!lastReset) {
    localStorage.setItem("lastDailyReset", todayStr);
    return;
  }

  if (lastReset < todayStr && now >= noon) {
    DailyTotal.textContent = 0;
    localStorage.setItem("dailyTotal", 0);
    localStorage.setItem("lastDailyReset", todayStr);
  }
}

// Reset monthly reps on first day of month if month changed
function resetMonthlyIfNeeded(lastReset) {
  const now = new Date();
  const yearMonth = now.toISOString().slice(0, 7); // 'YYYY-MM'

  if (!lastReset) {
    localStorage.setItem("lastMonthlyReset", yearMonth);
    return;
  }

  if (lastReset < yearMonth) {
    MonthlyTotal.textContent = 0;
    localStorage.setItem("monthlyTotal", 0);
    localStorage.setItem("lastMonthlyReset", yearMonth);
  }
}
function ClearHistory() {
  localStorage.removeItem("dailyTotal")
  localStorage.removeItem("monthlyTotal")
  location.reload();

}