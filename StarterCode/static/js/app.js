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
    //Creating variable for wfreq
    var washingfreq = firstdemo.wfreq
    //Clearing previous list
    demodata.html('')
    Object.entries(firstdemo).forEach(([key,value])=>{
        demodata.append("p").text(key+":"+value)
    })
    //Calling bonus plot
    bonusplot(washingfreq)
})

}

//Optionchanged function
function optionChanged(input)
{demoinfo(input)
plots(input)
}


//Plot function
function plots(input){
    d3.json("static/js/samples.json").then((data)=>{
        console.log(data.samples)
    var filteredsamples = data.samples.filter(samples=>samples.id==input)
    //fetching first element
    var firstsample = filteredsamples[0]
    //
    var sampleid = firstsample.otu_ids.map(id=>(`OTU ${id}`)).slice(0,10).reverse()
    var samplevalues = firstsample.sample_values.slice(0,10).reverse()
    var samplelables = firstsample.otu_labels.slice(0,10).reverse()
    //bar
    var trace = [{
        x:samplevalues,
        y:sampleid,
        text:samplelables,
        orientation:"h",
        type:"bar"

    }]

    Plotly.newPlot("bar",trace)

    //bubble
    var tracebub = [{
        x:firstsample.otu_ids,
        y:firstsample.sample_values,
        text:firstsample.otu_labels,
        mode: "markers",
        marker: {size:firstsample.sample_values , 
            color: firstsample.otu_ids}

    }]

    Plotly.newPlot("bubble",tracebub)

})

}

//Bonus section
function bonusplot(wfreq){
    var tracebonus = [{
        domain: {x:[0-1], y:[0-1]},
        value: wfreq,
        type: "indicator",
        mode:"gauge+number",
        gauge: {
            axis: { range: [0,9] },
            steps: [
              { range: [0, 4.5], color: "lightgreen" },
              { range: [4.5, 9], color: "lightblue" }
            ]} , title:{text:"Belly Button Washing Frequency"}
        
    }]
    Plotly.newPlot("gauge",tracebonus)
    
}