//Select references to the dropdown menu
var dropdownvar = d3.select("#selDataset")

//Read samples for json
d3.json("static/js/samples.json").then((data)=>{
console.log(data.names)
data.names.forEach(testid=>{
    dropdownvar.append("option").text(testid)
})
optionChanged(data.names[0])
})

//Append demographic data
function demoinfo(testid){
    d3.json("static/js/samples.json").then((data)=>{
        console.log(data.metadata)
    var demodata = d3.select("#sample-metadata")
    var filtereddata = data.metadata.filter(md=>md.id==testid)
    //fetching first element
    var firstdemo = filtereddata[0]
    //Clearing previous list
    demodata.html('')
    Object.entries(firstdemo).forEach(([key,value])=>{
        demodata.append("p").text(key+":"+value)
    })

})

}

//Optionchanged function
function optionChanged(input)
{demoinfo(input)}

//Plot function
function plots(input){
    d3.json("static/js/samples.json").then((data)=>{
        console.log(data.samples)
    var filteredsamples = data.samples.filter(samples=>samples.id==input)
    //fetching first element
    var firstsample = filtereddata[0]
    //
    var sampleid = firstsample.otu_ids.slice(0,10).reverse()
    var samplevalues = firstsample.sample_values.slice(0,10).reverse()
    var samplelables = firstsample.otu_labels.slice(0,10).reverse()
    //
    var trace = 

})

}