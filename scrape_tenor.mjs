import fs from 'fs';

async function fetchGifs() {
  const queries = [
    "woman-pushup",
    "woman-squat",
    "woman-plank",
    "woman-burpee",
    "woman-lunges",
    "woman-mountain-climbers",
    "woman-jumping-jacks",
    "woman-superman-exercise",
    "woman-crunches",
    "woman-leg-raises"
  ];
  
  const results = {};
  
  for (const q of queries) {
    try {
      const res = await fetch(`https://tenor.com/search/${q}-gifs`);
      const text = await res.text();
      const matches = text.match(/https:\/\/media\.tenor\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.gif/g);
      // Filter out some garbage if necessary, just take the first
      results[q] = matches ? matches[0] : 'NOT_FOUND';
    } catch(e) {
      results[q] = 'ERROR';
    }
  }
  
  console.log(JSON.stringify(results, null, 2));
}

fetchGifs();
