console.log("\nAsynchronous Code Loop :\n");

setTimeout(() => {
  console.log("Hello world!");
}, 2000);

for (var i = 0; i < 10; i++) {
  runIt(i);
}

function runIt(i) {
  setTimeout(function () {
    console.log("In-loop " + (i + 1) + " Sec");
  }, i * 1000);
}
