const urls = [
  "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up-Woman.gif",
  "https://fitnessprogramer.com/wp-content/uploads/2021/02/Kneeling-Push-Up.gif", // female usually in this graphic
  "https://fitnessprogramer.com/wp-content/uploads/2021/02/Squat-Woman.gif",
  "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bodyweight-Squat.gif",
  "https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank-Woman.gif",
  "https://fitnessprogramer.com/wp-content/uploads/2015/11/Push-up.gif",
  "https://fitnessprogramer.com/wp-content/uploads/2015/11/Squat.gif"
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: "HEAD" });
      console.log(u, res.status);
    } catch(e) {}
  }
}
check();
