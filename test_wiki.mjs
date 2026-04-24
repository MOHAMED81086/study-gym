const list = ["run", "pushup", "squat", "crunch", "lunge"];
async function fetchWiki() {
  for(const i of list) {
    const rs = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=filetype:gif+${i}&utf8=&format=json&origin=*`);
    const d = await rs.json();
    console.log(i, d.query.search.slice(0,3).map(s=>s.title));
  }
}
fetchWiki();
