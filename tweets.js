import fakeData from "./testData";

// TWEET DATA REPRESENTATION
var currIndex = 0;
var scene = document.querySelector("a-scene");
// TODO: replace with caps
const tweetInterval = 1000;
// on interval, create sphere that represents tweet
window.setInterval(() => {
  const tweetball = document.createElement("a-sphere");
  tweetball.setAttribute("radius", `0.1`);
  tweetball.setAttribute("color", `#000000`);
  const numFs = fakeData.filter((x) => x === "f").length;
  const color = (255 * numFs) / 15 + 0.1;
  tweetball.setAttribute("radius", `${color}`);
  tweetball.setAttribute("position", `0 ${fakeData[currIndex].length / 20} -3`);
  currIndex++;
  // TODO: make it loop from start
  currIndex = currIndex % fakeData.length;
  scene.appendChild(tweetball);
}, tweetInterval);
