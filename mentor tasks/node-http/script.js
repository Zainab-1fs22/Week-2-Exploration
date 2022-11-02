document.addEventListener("submit", sendData);

function sendData(e) {
  e.preventDefault(); //to prevent page refresh when add is clicked

  //get the value of the inputs at that instant:
  const a = document.querySelector("#num1").value;
  const b = document.querySelector("#num2").value;

  //fetch takes 2 inputs - url endpoint & json request obj => returns promise
  fetch("/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      a: parseInt(a),
      b: parseInt(b),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { result } = data;
      document.querySelector(".result").innerText = `The sum is: ${result}`;
    })
    .catch((err) => console.log(err));
}
