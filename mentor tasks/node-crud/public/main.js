const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");

update.addEventListener("click", (_) => {
  // Sending PUT Request here
  fetch("/quotes", {
    method: "put",
    headers: {
      //telling server we are sending json data
      "Content-Type": "application/json",
    },
    //convert json thru body property
    body: JSON.stringify({
      name: "Belle",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    //fetch returns a promise so we handle the response from server via .then
    .then((res) => {
      if (res.ok) return res.json();
    })
    //reloads itself with click avoiding js to update the DOM
    .then((response) => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", (_) => {
  // Sending DELETE Request here

  fetch("/quotes", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Belle",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageNoQuoteLeft.textContent = "No Belle's quote left to delete";
      } else {
        window.location.reload(true);
      }
    })
    .catch((error) => console.error(error));
});
