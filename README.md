# Sortable API Table

This project fetches superhero data from a public API and displays it in a paginated, sortable table. Users can filter heroes by name and navigate through pages of heroes.

## Features

- Fetches superhero data from [Superhero API](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json).
- Displays heroes in a table format with sorting functionality.
- Pagination controls to navigate through pages of heroes.
- Search functionality to filter heroes by name.

## Getting Started

### Prerequisites

Make sure you have a modern web browser and a basic understanding of HTML and JavaScript.

### Installation

1. Clone the repository:

   ```bash
   git clone https://learn.zone01kisumu.ke/git/somotto/sortable
   cd sortable
   ```

2. Open `index.html` in your web browser.

### Usage

1. Enter a name in the search box to filter heroes.
2. Click on the table headers to sort by that column.
3. Use the pagination buttons to navigate through pages of heroes.

## Code Structure

- `index.html`: The main HTML file containing the structure of the application.
- `heroTable.js`: Contains the JavaScript functions for fetching, filtering, sorting, and paginating the heroes.
- `style.css`: Contains the styles for the table and layout.

## Running Tests

To run the tests, ensure you have Jest installed. Then, run:

```bash
npm test
```

## Contributing

If you'd like to contribute, please fork the repository and submit a pull request.
