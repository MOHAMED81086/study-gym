const exercises = [
  "woman push up workout",
  "woman squat workout",
  "woman plank workout",
  "woman burpee workout",
  "woman lunge workout",
  "woman mountain climber workout",
  "woman jumping jacks workout",
  "woman superman workout",
  "woman crunches workout",
  "woman leg raises workout"
];

async function findGiphyIds() {
  for (const ex of exercises) {
    try {
      const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=pLURtkhVrGQm3MWE61AS74Hk1b2ruX56&q=${encodeURIComponent(ex)}&limit=1`);
      if(resp.status === 200) {
        const data = await resp.json();
        console.log(ex, "=>", data.data[0]?.images?.original?.url);
      } else {
        console.log(ex, "=> API ERROR", resp.status);
      }
    } catch(e) { console.log(ex, "=> FETCH ERROR"); }
  }
}
findGiphyIds();
