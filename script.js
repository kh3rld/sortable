let allHeroes = [];
let currentPage = 1;
let pageSize = 20;
let sortColumn = "name";
let sortOrder = "asc";

// Fetch data
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    allHeroes = data;
    renderTable();
  });

// Render table
function renderTable() {
  const tbody = document.querySelector("#heroTable tbody");
  tbody.innerHTML = "";

  const filteredHeroes = filterHeroes();
  const sortedHeroes = sortHeroes(filteredHeroes);
  const paginatedHeroes = paginateHeroes(sortedHeroes);

  paginatedHeroes.forEach((hero) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName || ""}</td>
            <td>${hero.powerstats.intelligence}</td>
            <td>${hero.powerstats.strength}</td>
            <td>${hero.powerstats.speed}</td>
            <td>${hero.powerstats.durability}</td>
            <td>${hero.powerstats.power}</td>
            <td>${hero.powerstats.combat}</td>
            <td>${hero.appearance.race || ""}</td>
            <td>${hero.appearance.gender || ""}</td>
            <td>${hero.appearance.height[1] || ""}</td>
            <td>${hero.appearance.weight[1] || ""}</td>
            <td>${hero.biography.placeOfBirth || ""}</td>
            <td>${hero.biography.alignment || ""}</td>
        `;
  });

  renderPagination(filteredHeroes.length);
}

// Filter heroes based on search
function filterHeroes() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  return allHeroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm)
  );
}

// Sort heroes
function sortHeroes(heroes) {
  return heroes.sort((a, b) => {
    let valueA = getNestedProperty(a, sortColumn);
    let valueB = getNestedProperty(b, sortColumn);

    if (valueA === undefined || valueA === "") return 1;
    if (valueB === undefined || valueB === "") return -1;

    if (typeof valueA === "string") valueA = valueA.toLowerCase();
    if (typeof valueB === "string") valueB = valueB.toLowerCase();

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

// Get nested property value
function getNestedProperty(obj, path) {
  return path.split(".").reduce((current, key) => current && current[key], obj);
}

// Paginate heroes
function paginateHeroes(heroes) {
  if (pageSize === "all") return heroes;
  const start = (currentPage - 1) * pageSize;
  return heroes.slice(start, start + pageSize);
}

// Render pagination controls
function renderPagination(totalHeroes) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  if (pageSize === "all") return;

  const totalPages = Math.ceil(totalHeroes / pageSize);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  paginationDiv.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderTable();
    });
    paginationDiv.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });
  paginationDiv.appendChild(nextButton);
}

// Event listeners
document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  renderTable();
});

document.getElementById("pageSize").addEventListener("change", (e) => {
  pageSize = e.target.value === "all" ? "all" : parseInt(e.target.value);
  currentPage = 1;
  renderTable();
});

document.querySelector("#heroTable thead").addEventListener("click", (e) => {
  if (e.target.tagName === "TH") {
    const clickedColumn = e.target.textContent.toLowerCase().replace(" ", "");
    if (clickedColumn === sortColumn) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortColumn = clickedColumn;
      sortOrder = "asc";
    }
    renderTable();
  }
});
