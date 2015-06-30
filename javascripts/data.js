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


    var groups;
    //noinspection JSUnusedAssignment
    groups = svg.selectAll(".group").data(graph.groups)
        .enter()
        .append("rect")
        .attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
        .attr("width", 160)
        .attr("height", 25)
        .attr("fill", "#7F2A68")
        .style("stroke", "white");

    var labelGroups;
    labelGroups = svg.selectAll(".labelGroups").data(graph.groups)
        .enter().append("text")
        .attr("fill", "white")
        .attr("align", "center")
        .attr("x", function (d) { return d.x + 7 })
        .attr("y", function (d) { return d.y + 18 })
        .style("cursor", "hand")
        .text(function (d) {
            return d.name;
        });

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter()
        .append("line")
            .attr("class", "link")
            .style("stroke", "#7F2A68")
            .style("stroke-width", 6);

    var node = svg.selectAll(".node").data(graph.nodes)
        .enter().append("circle")
            .attr("class", "node")
            .attr("r", 6)
            .style("stroke", "#9E698F")
            .style("stroke-width", 3)
            .style("fill", "white");

    node.on("mouseover", function(){
        d3.select(this)
            .attr("r", 9);
    });

    node.on("mouseleave", function(){
        d3.select(this)
            .attr("r", 6);
    });

    node.append('title')
        .text(function(d) { return d.name; });

    var labels = svg.selectAll("text.lable")
        .data(graph.nodes).enter().append("text")
        .attr("class", "label")
        .attr("fill", "white")
        .attr("color", "white")
        .attr("align", "center")
        .style("cursor", "hand")
        .text(function(d) {  return d.name;  });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    function getNode(index){
        return d3.selectAll("circle")[0][index].attributes;
    }

    link.attr("x1", function(d) { return getNode(d.source).cx.value; })
        .attr("y1", function(d) { return getNode(d.source).cy.value ; })
        .attr("x2", function(d) { return getNode(d.target).cx.value; })
        .attr("y2", function(d) { return getNode(d.target).cy.value ; });


    labels.attr("transform", function(d){
        return "translate(" + (d.x + 10) + "," + (d.y + 5) + ")";
    });
});
