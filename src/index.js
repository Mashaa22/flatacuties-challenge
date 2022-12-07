// Your code here

//fetch data
function fetchData() {
  fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then((data) => {
      renderCharacters(data);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
//get dom elements
const characterBar = document.getElementById("character-bar");
const characterName = document.getElementById("name");
const characterImage = document.getElementById("image");
const characterVote = document.getElementById("vote-count");
const characterVoteForm = document.getElementById("votes-form");

// render characters
function renderCharacters(data) {
  data.forEach((data) => {
    const nameSpan = document.createElement("span");
    nameSpan.innerText = data.name;

    characterBar.appendChild(nameSpan);
    nameSpan.addEventListener("click", () => {
      characterName.textContent = data.name;
      characterImage.setAttribute("src", data.image);
      characterVote.textContent = data.votes;
    });
  });
}

// function input votes
characterVoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newVotes = parseInt(event.target.votes.value);
  const characterVote = document.getElementById("vote-count");
  let current = parseInt(characterVote.textContent);
  let votecount = (current += newVotes);
  characterVote.innerText = votecount;
  let updateVotes = {
    votes: votecount,
  };

  // Reset button to default
  document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("vote-count").innerText = 0;
  });

  fetch("http://localhost:3000/characters", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "",
    },
    method: "PATCH",
    body: JSON.stringify({
      votes: votecount,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
});
