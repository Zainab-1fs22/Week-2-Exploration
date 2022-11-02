console.log("\nSynchronous Code Loop :\n");

function helloMssg() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Hello world! " + performance.now());
      rej("Rejected " + performance.now());
    }, 2000);
  });
}

async function loopMssg() {
  await helloMssg()
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    });

  for (var i = 0; i < 10; i++) {
    runIt(i);
  }

  function runIt(i) {
    setTimeout(function () {
      console.log("In-loop " + (i + 1) + performance.now() + " Sec");
    }, i * 1000);
  }
}
loopMssg();
