const queries = {
  pushups: ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif"],
  squats: ["https://media.tenor.com/2x_ehC9k9IUAAAAC/squats-speed.gif", "https://media.giphy.com/media/xT8qB1xN98zM9V3l9O/giphy.gif"],
  plank: ["https://media.tenor.com/_Mh2P3B_aT8AAAAC/plank-exercise.gif", "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif", "https://media.giphy.com/media/l2Je0oOcT4cioSIfu/giphy.gif"],
  burpees: ["https://media.tenor.com/PZcZ80H16lQAAAAC/burpee-exercise.gif", "https://media.giphy.com/media/23hPPMRgPwkNGBENfI/giphy.gif", "https://media.giphy.com/media/xT8qB7r6sU2zMv1mUw/giphy.gif"],
  lunges: ["https://media.tenor.com/I8i54S5DftUAAAAC/lunges.gif", "https://media.giphy.com/media/l41YkQ2Ew8VnUu2uA/giphy.gif"],
  mountain_climbers: ["https://media.tenor.com/QhV_h-xKOfkAAAAC/mountain-climbers.gif", "https://media.giphy.com/media/26FPJJOKsJ8BGLW0g/giphy.gif"],
  jumping_jacks: ["https://media.tenor.com/V_a1Z_a5NscAAAAC/jumping-jacks.gif", "https://media.giphy.com/media/xT8qB1bZ0X1yN9b1C4/giphy.gif"],
  superman: ["https://media.tenor.com/tH0nB2uUxtgAAAAC/superman-exercise.gif", "https://media.giphy.com/media/3o7TKKt2TfXfU63t8Y/giphy.gif"],
  bicycle_crunches: ["https://media.tenor.com/bQ9aG-lO6LAAAAAC/bicycle-crunches.gif", "https://media.giphy.com/media/l2JdZ3u2Z2E1kZ2uY/giphy.gif"],
  leg_raises: ["https://media.tenor.com/X4yD_v_i5b8AAAAC/leg-raises.gif", "https://media.giphy.com/media/26FPpY9D1H87H33tC/giphy.gif"]
};

async function testAll() {
  for (const [key, urls] of Object.entries(queries)) {
    console.log(key + ":");
    for (const url of urls) {
      try {
        const r = await fetch(url, { method: "HEAD" });
        console.log("  ", r.status, url);
      } catch(e) {
        console.log("  ", "ERROR", url);
      }
    }
  }
}
testAll();
