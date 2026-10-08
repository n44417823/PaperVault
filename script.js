
/* ===================================
   PAPERVAULT SEARCH ENGINE
   =================================== */

// Find our HTML elements

const searchInput = document.querySelector("#paper-search");

const paperCards = document.querySelectorAll("#papers article");

const resultsCount = document.querySelector("#results-count");

const noResults = document.querySelector("#no-results");


// Make searches ignore uppercase letters and punctuation

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}


// Our search function

function searchPapers() {

  const searchText = normalize(searchInput.value);

  const searchWords = searchText.split(" ").filter(Boolean);

  let matches = 0;

  paperCards.forEach(function(card) {

    const keywords = normalize(
      card.dataset.search + " " + card.textContent
    );

    const isMatch = searchWords.every(function(word) {
      return keywords.includes(word);
    });

    card.hidden = !isMatch;

    if (isMatch) {
      matches++;
    }

  });

  resultsCount.textContent =
    "Showing " + matches + " of " +
    paperCards.length + " demo listings";

  noResults.hidden = matches !== 0;

}


// Search automatically as the user types

searchInput.addEventListener("input", searchPapers);


// Show all listings when the page first loads

searchPapers();
