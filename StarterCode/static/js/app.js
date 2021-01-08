//Select references to the dropdown menu
var dropdownvar = d3.select("#selDataset")

//Read samples for json
d3.json("static/js/samples.json").then((data)=>{
 console.log(data.names)

})