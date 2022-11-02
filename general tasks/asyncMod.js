console.log("\nAsynchronous Code Loop :\n" + performance.now() + "\n");

var dt = new Date();

setTimeout(() => {
  console.log("Hello world! " + performance.now());
}, 2000);

for (var i = 0; i < 10; i++) {
  runIt(i);
}

function runIt(i) {
  setTimeout(function () {
    console.log("In-loop " + (i + 1) + " " + performance.now() + " Sec");
  }, i * 1000);
}
