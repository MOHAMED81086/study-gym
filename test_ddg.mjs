import fs from "fs";
const terms = ["female pushup gif", "female squat gif"];
async function fetchGifs() {
  for (const t of terms) {
    try {
      const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(t)}`);
      const body = await res.text();
      const imgs = body.match(/<img[^>]+src="([^">]+)"/g);
      console.log(t, imgs ? imgs.slice(0,3) : "none");
    } catch(e) {}
  }
}
fetchGifs();
