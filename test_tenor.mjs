import fs from 'fs';

async function fetchGifs() {
  const queries = [
    "female pushup animation",
    "female bodyweight squat animation",
    "female plank exercise animation",
    "female burpee animation",
    "female lunge exercise animation",
    "female mountain climbers animation",
    "female jumping jacks animation",
    "female superman exercise animation",
    "female bicycle crunches animation",
    "female leg raises animation"
  ];
  
  const results = {};
  
  for (const q of queries) {
    try {
      // Using tenor v1 public key
      const res = await fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(q)}&key=LIVDSRZULECB&limit=3`);
      const data = await res.json();
      results[q] = data.results.map(r => r.media[0].gif.url);
    } catch(e) {
      results[q] = [];
    }
  }
  
  console.log(JSON.stringify(results, null, 2));
}

fetchGifs();
