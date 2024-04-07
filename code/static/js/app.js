const sampleUrl = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

let samples = d3.json(sampleUrl);

function init() {
    // Initialize the page with the first sample
    samples.then( data => {
        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        data.names.forEach(name => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // listener to make new sample data show when new person is selected in dropdown
        dropdownMenu.on("change", function() {
            let newSample = d3.select(this).property("value");
            newSelection(newSample);
        });
        
        let firstSample = data.names[0];
        barChart(firstSample);
        bubbleChart(firstSample);
        demographicInfo(firstSample);
    })
}

function barChart(sampleData) {
    samples.then( data => {
        // make sure the sample data mactches with a person in the samples json and 
        // filter that person out
        let currentSample = data.samples.filter(current => current.id === sampleData)[0];
        let otu_ids = currentSample.otu_ids;
        let otu_labels = currentSample.otu_labels;
        let sample_values = currentSample.sample_values;

        // reverse() function to show data from largest to least otu data
        let barData = [{
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        let layout = {
            title: "Top 10 Bacteria Found on Participant",
        };

        Plotly.newPlot("bar", barData, layout);
    });
}

function bubbleChart(sampleData) {
    samples.then(data => {
        // Find the selected sample data
        let currentSample = data.samples.find(sample => sample.id === sampleData);
        let otuIds = currentSample.otu_ids;
        let otuLabels = currentSample.otu_labels;
        let sampleValues = currentSample.sample_values;

        // Create bubble chart data
        let bubbleData = [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues, 
                color: otuIds, 
                colorscale: "Earth" 
            }
        }];

        let layout = {
            title: "All Bacteria Found on Participant",
        };

        Plotly.newPlot("bubble", bubbleData, layout);
    });
}

function demographicInfo(sampleData) {
    samples.then(data => {
        // find the metadata to show demogrphic info
        let metadata = data.metadata.find(sample => sample.id === parseInt(sampleData));
        
        // select the container to show demogrphic info on page
        let metadataContainer = d3.select("#sample-metadata");

        // remove any metadata that might be there from previous iterations
        metadataContainer.html("");

        // loop through the metadata and add the key-value pairs to the metadataContainer
        for (let key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                let value = metadata[key];
                metadataContainer.append("p").text(`${key}: ${value}`);
            }
        }
    });
}

// Function to handle dropdown change
function newSelection(selectedSample) {
    console.log("Selected Sample:", selectedSample);
    barChart(selectedSample);
    bubbleChart(selectedSample);
    demographicInfo(selectedSample);
}

init();