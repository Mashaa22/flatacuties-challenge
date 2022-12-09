/// Your code here

//fetch data
function fetchData() {
  fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then((data) => {
      getCharacters(data);
    });
}
//get dom elements
const characterBar = document.getElementById("character-bar");
const characterName = document.getElementById("name");
const characterImage = document.getElementById("image");
const characterVote = document.getElementById("vote-count");
const characterVoteForm = document.getElementById("votes-form");

// getting characters
function getCharacters(data) {
  data.forEach((data) => {
// creating span for animals
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

// input the votes
characterVoteForm.addEventListener("submit", (event) => {

  // prevent page from refreshing
  event.preventDefault();
  const newVotes = parseInt(event.target.votes.value);
  const characterVote = document.querySelector('#vote-count');
  let current = parseInt(characterVote.textContent);
  let votecount = (current += newVotes);
  characterVote.innerText = votecount;
  let updateVotes = {
    votes: votecount,
  };
  

  // Reset button to default
  document.getElementById("reset-btn").addEventListener("click", (e) => {
    document.getElementById("vote-count").innerText = 0;
  });


// updating the data
  fetch("http://localhost:3000/characters", {
    method: "PATCH",
    headers: { 'Content-Type': "application/json"},
    body: JSON.stringify({
      votes: votecount,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
});