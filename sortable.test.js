import { filterHeroes, sortHeroes, paginateHeroes } from "./script";

describe("Hero Table Functions", () => {
  let heroes;

  beforeAll(() => {
    heroes = [
      {
        name: "Batman",
        powerstats: { intelligence: 100, strength: 50 },
        biography: { fullName: "Bruce Wayne" },
      },
      {
        name: "Superman",
        powerstats: { intelligence: 95, strength: 100 },
        biography: { fullName: "Clark Kent" },
      },
      {
        name: "Wonder Woman",
        powerstats: { intelligence: 90, strength: 80 },
        biography: { fullName: "Diana Prince" },
      },
    ];
  });

  test("filterHeroes should return heroes containing search term", () => {
    const filtered = filterHeroes(heroes, "man");
    expect(filtered).toHaveLength(2);
  });

  test("sortHeroes should sort heroes by name ascending", () => {
    const sorted = sortHeroes(heroes, "name", "asc");
    expect(sorted[0].name).toBe("Batman");
    expect(sorted[1].name).toBe("Superman");
    expect(sorted[2].name).toBe("Wonder Woman");
  });

  test("paginateHeroes should return the correct heroes for the current page", () => {
    const paginated = paginateHeroes(heroes, 1, 2);
    expect(paginated).toHaveLength(2);
  });
});
