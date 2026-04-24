const urlsToTest = [
  "https://darebee.com/images/exercises/pushups.gif",
  "https://darebee.com/images/exercises/squats.gif",
  "https://darebee.com/images/exercises/plank.gif"
];

async function check() {
  for (const u of urlsToTest) {
    try {
      const res = await fetch(u, { method: "HEAD" });
      console.log(u, res.status);
    } catch(e) {
      console.log(u, "ERROR");
    }
  }
}
check();
