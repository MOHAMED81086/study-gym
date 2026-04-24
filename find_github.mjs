async function getGithubGifs() {
  const urls = [
    "https://api.github.com/repos/nuno-faria/workout-tracker/git/trees/main?recursive=1",
    "https://api.github.com/repos/abhisheknaiidu/fitness-app/git/trees/main?recursive=1",
    "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/trees/main?recursive=1"
  ];
  for(const url of urls) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const gifs = (data.tree || []).filter(t => t.path.endsWith('.gif'));
      console.log(url, gifs.length);
    } catch(e) {}
  }
}
getGithubGifs();
