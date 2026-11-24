// Live search: filters game cards by name or genre as you type
const searchForm = document.querySelector(".landing-search");
const searchInput = searchForm.querySelector("input");
const sections = document.querySelectorAll("#trending, #most-played");
const noResults = document.querySelector(".no-results");

function filterGames(query) {
  const term = query.trim().toLowerCase();
  let totalVisible = 0;

  sections.forEach((section) => {
    let visibleInSection = 0;

    section.querySelectorAll(".card").forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const genre = card.querySelector(".genre").textContent.toLowerCase();
      const matches = name.includes(term) || genre.includes(term);

      card.hidden = !matches;
      if (matches) visibleInSection++;
    });

    // Hide a whole section when none of its games match
    section.hidden = visibleInSection === 0;
    totalVisible += visibleInSection;
  });

  noResults.hidden = totalVisible > 0;
}

searchInput.addEventListener("input", () => filterGames(searchInput.value));

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  filterGames(searchInput.value);

  // Scroll to the results (or the "no results" message)
  const target = [...sections].find((section) => !section.hidden) || noResults;
  target.scrollIntoView({ behavior: "smooth" });
});
