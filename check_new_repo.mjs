async function check() {
  const rs = await fetch('https://api.github.com/repos/WRX-7/Bodyweight-Exercise-GIFs/git/trees/main?recursive=1');
  const d = await rs.json();
  if (d.tree) {
    const gifs = d.tree.filter(i => i.path.includes('.gif')).map(i => i.path);
    console.log(gifs.slice(0, 50));
  }
}
check();
