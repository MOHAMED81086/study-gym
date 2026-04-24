const urlsToTest = [
  "https://www.spotebi.com/wp-content/uploads/2014/10/squats-exercise-illustration-spotebi.gif",
  "https://www.spotebi.com/wp-content/uploads/squats-exercise-illustration.gif",
  "https://www.spotebi.com/wp-content/uploads/2016/03/squats-exercise-illustration.gif",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/11181019/3364952047.gif",
  "https://media.tenor.com/2x_ehC9k9IUAAAAC/squats-speed.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif"
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
