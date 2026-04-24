async function checkWGER() {
  try {
    const res = await fetch("https://wger.de/api/v2/exerciseimage/?limit=200");
    const data = await res.json();
    console.log(data.results.slice(0,10).map(x => x.image));
  } catch(e) {}
}
checkWGER();
