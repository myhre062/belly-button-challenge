# belly-button-challenge

# Module 14 Challenge

## OverView
This project is a web application that visualizes and explores the Belly Button Biodiversity dataset, which catalogs the bacteria that can be found on a human belly button. There is an option to select from a number of participants. Participants are hidden by 

## File Structure

- `app.js`: Contains the JavaScript code for fetching data from the provided API, creating interactive charts (bar chart, bubble chart), and displaying demographic information based on the selected sample.
- `index.html`: The HTML file that serves as the main page of the web application, providing the structure and layout for the dashboard.

## Instructions

1. Open the `index.html` file in a web browser.
2. The application will automatically load and display the initial sample data.
3. Use the dropdown menu on the left to select a different participant's ID.
4. The charts and demographic information will update accordingly.

## Dependencies

This project relies on the following dependencies:

- [D3.js](https://d3js.org/) 
- [Plotly.js](https://plotly.com/javascript/)
- [Bootstrap](https://getbootstrap.com/) 

These dependencies are included via CDN links in the `index.html` file.

## File Breakdown

### `app.js`

This file contains the main JavaScript code for the application. Here's a brief overview of the functions:

- `init()`: Initializes the page by populating the dropdown menu with sample names and setting up event listeners.
- `barChart(sampleData)`: Creates a bar chart displaying the top 10 OTU (Operational Taxonomic Unit) values for the selected sample.
- `bubbleChart(sampleData)`: Creates a bubble chart displaying all OTU values for the selected sample.
- `demographicInfo(sampleData)`: Displays the demographic information for the selected sample.
- `newSelection(selectedSample)`: Handles the update of charts and demographic information when a new sample is selected from the dropdown menu.

### `index.html`

This file contains the HTML structure of the web application. It includes:

- A title and description for the dashboard.
- A container for the sample selection dropdown menu.
- A card to display the demographic information.
- Placeholders for the bar chart, and bubble chart.
- Links to the required JavaScript files (`app.js` and `bonus.js`).
