d3.json("samples.json").then((data) => {
    
      var ids = data.samples.map(row => row.id);
      var metadata = data.metadata
      var ethnicity = metadata.map(row => row.ethnicity);
      var gender = metadata.map(row => row.gender);
      var age = metadata.map(row => row.age);
      var bbtype = metadata.map(row => row.bbtype);
      var location = metadata.map(row => row.location);
      var otu_ids = data.samples.map(row => row.otu_ids);
      var sample_values = data.samples.map(row => row.sample_values);
      var otu_labels = data.samples.map(row => row.otu_labels);


      var select = d3.select('select');

      ids.forEach(id => {
        var entry = select.append('option');
        entry.text(id)
      });

      function init() {
        var trace1 = [{
          x: otu_ids[0],
          y: sample_values[0],
          text: otu_labels[0],
          type: "bar",
          orientation: 'h'
        }];
      
        var layout1 = {
            title: `OTU Values for ID number ${ids[0]}`,
            xaxis: {title: 'Samples'},
            yaxis: {title: 'Operational Taxonomic Units'}
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

        var layout2 = {
          xaxis: {title: 'Operational Taxonomic Units'},
          yaxis: {title: 'Sample Values'}
        };
      
        Plotly.newPlot("bar", trace1, layout1);

        Plotly.newPlot("bubble",trace2, layout2);


        var container = d3.select('#sample-metadata');
        container.text(`ID: ${ids[0]} | Age: ${age[0]} | Ethnicity: ${ethnicity[0]} | Gender: ${gender[0]} | Belly Button Type: ${bbtype[0]} | Location: ${location[0]}`);
      }

      d3.selectAll("#selDataset").on("change", optionChanged);

      function optionChanged() {
        var id = select.property("value");
        
        for (i=0;i<ids.length;i++) {
        
          if (id === `${ids[i]}`) {
          var trace1 = [{
            x: otu_ids[i],
            y: sample_values[i],
            text: otu_labels[i],
            type: "bar",
            orientation: 'h'
          }];
        
          var layout1 = {
              title: `OTU Values for ID number ${ids[i]}`,
              xaxis: {title: 'Operational Taxonomic Units'},
              yaxis: {title: 'Samples'}
          };
  
          var trace2 =[{
            x: otu_ids[i],
            y: sample_values[i],
            mode: 'markers',
            marker: {
              size: sample_values[i],
              color: otu_ids[i]
            },
            text: otu_labels[i]
          }]
        
          Plotly.newPlot("bar", trace1, layout1);

          Plotly.newPlot("bubble",trace2)
  
  
          var container = d3.select('#sample-metadata');
          container.text(`ID: ${ids[i]} | Age: ${age[i]} | Ethnicity: ${ethnicity[i]} | Gender: ${gender[i]} | Belly Button Type: ${bbtype[i]} | Location: ${location[i]}`);
        }
        }
      }

      init();
    
  });

  

  
  