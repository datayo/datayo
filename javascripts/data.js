var width = 1280,
    height = 560;

var color = d3.scale.category20();

//var force = d3.layout.force()
//    .charge(-3000)
//    .linkDistance(30)
//    .gravity(0.1)
//    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");

d3.json("data/data.json", function(error, graph) {
    if (error) throw error;

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter()
        .append("line")
            .attr("class", "link")
            .style("stroke", "#7F2A68")
            .style("stroke-width", 6);

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("circle")
            .attr("class", "node")
            .attr("r", 6)
            .style("stroke", "#9E698F")
            .style("stroke-width", 3)
            .style("fill", "white")
        .call(force.drag);

    node.on("mouseover", function(d){
        d3.select(this)
            .attr("r", 12);
    });

    node.on("mouseleave", function(d){
        d3.select(this)
            .attr("r", 6);
    })

    node.append('title')
        .text(function(d) { return d.name; });

    var labels = svg.selectAll("text.lable")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .attr("fill", "white")
        .attr("color", "white")
        .attr("align", "center")
        .text(function(d) {  return d.name;  });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    labels.attr("transform", function(d){
        return "translate(" + (d.x + 10) + "," + (d.y + 5) + ")";
    })
    //force.on("tick", function() {
    //});
});
