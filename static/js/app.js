d3.json("../../samples.json").then((data) => {
    
    var trace1 = {
      x: data.samples.otu_ids,
      y: data.samples.sample_values,
      type: "bar",
      name: "Operational Taxonomic Units",
    };

    var data = [trace1];

    var layout = {
      title: "Operational Taxonomic Units",
      xaxis: { title: "Organ" },
      yaxis: { title: "Square Root of Survival" }
    };
  
    Plotly.newPlot("plot", data, layout);
  });