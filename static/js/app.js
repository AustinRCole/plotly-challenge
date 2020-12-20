d3.json("samples.json").then((data) => {
    
      var ids = data.samples.map(row => row.id);
      var metadata = data.metadata
      var ethnicity = metadata.map(row => row.ethnicity);
      var gender = metadata.map(row => row.gender);
      var age = metadata.map(row => row.age);
      var bbtype = metadata.map(row => row.bbtype);
      var location = metadata.map(row => row.location);


    for (i = 0; i < data.samples.length; i++) {
      var otu_ids = data.samples.map(row => row.otu_ids)[i].sort((a,b) => b - a).slice(0,10);
      var sample_values = data.samples.map(row => row.sample_values).slice(0,10);
      var otu_labels = data.samples.map(row => row.otu_labels).slice(0,10);

      console.log(otu_ids[0]);
      
      function init() {
        var trace1 = [{
          x: otu_ids[0],
          y: sample_values[0],
          text: otu_labels[0],
          type: "bar",
          orientation: 'h'
        }];
      
        var layout1 = {
            title: `Top 10 OTU Values for ID number ${ids[0]}`
        };

        var trace2 =[{
          x: otu_ids[0],
          y: sample_values[0],
          mode: 'markers',
          marker: {
            size: sample_values[0],
            color: otu_ids[0]
          },
          text: otu_labels[0]
        }]
      
        Plotly.newPlot("bar", trace1, layout1);

        Plotly.newPlot("bubble",trace2)


        var container = d3.select('#sample-metadata');
        container.text(`ID: ${ids[0]}; Age: ${age[0]}; Ethnicity: ${ethnicity[0]}; Gender: ${gender[0]}; Belly Button Type: ${bbtype[0]}; Location: ${location[0]}`);
      }

      var select = d3.select('select');

      ids.forEach(id => {
        var entry = select.append('option');
        entry.text(id)
      });
  
      d3.selectAll("#selDataset").on("change", optionChanged);
  
    function optionChanged() {
      var dropdownMenu = d3.select("#selDataset");
      
      var dataset = dropdownMenu.property("value");
      
      var x = [];
      var y = [];
      var text = [];
    
      if (dataset === ids) {
          x = otu_ids,
          y = sample_values,
          text = otu_labels;
      }
  
      updatePlotly(x, y, text);
    }
    
    
    function updatePlotly(newdata) {
      Plotly.restyle("bar", "values", [newdata]);
    }
  
      init();

    }
  
  });

  

  
  