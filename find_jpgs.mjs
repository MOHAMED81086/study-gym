import fs from "fs";
async function doCheck() {
  const rs = await fetch('https://api.github.com/repos/yuhonas/free-exercise-db/git/trees/main?recursive=1');
  const d = await rs.json();
  const jpgs = (d.tree||[]).filter(i=>i.path.endsWith('.jpg')).map(i=>i.path);
  console.log(jpgs.filter(i => i.match(/cat.*stretch|glute.*bridge|knee.*flexor/i)));
}
doCheck();
