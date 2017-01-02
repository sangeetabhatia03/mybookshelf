// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var svg = d3.select("#bookviz").append("svg")
    .attr("id","bookvizsvg")
    .attr("width", 800)
    .attr("height", 960);

d3.csv("/mybookshelf/data/myshelf.csv", function(error, data){	
 	
  data.forEach(function(d){
   d.publication_year = +d.publication_year;
  });
 
  
// Some placement calculations; we need 5 rectangles in each row.
  var g = svg.selectAll("g").data(data).enter();
  g.append("rect")
    .attr("class","year")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("x", function(d){return ((d.publication_year - 1900)%10)*80;})
    .attr("y", function(d){return (Math.floor((d.publication_year - 1900)/10))*90;})
    .attr("width", 70)
    .attr("height", 80)
    .attr("fill-opacity", 0.7)
    .style("fill", function(d){
  	var fillcol = d.read=="0"? "red" : "green";
  	return fillcol;
  })
    .on("mouseover", function(d) {
      if(d.read=="1"){
                 div.transition()    
                      .duration(200)    
                      .style("opacity", .9);    
                  div  .html( d.name + "<br/>"  + d.author)  
                      .style("left", (d3.event.pageX) + "px")    
                      .style("top", (d3.event.pageY - 28) + "px");}	
    })					
    .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
    });


  g.append("text")   
    .text(function(d){return d.publication_year;})
    .attr("y",function(d){return  40 + Math.floor((d.publication_year - 1900)/10)*90;})
    .attr("x", function(d){return 20+((d.publication_year - 1900)%10)*80;})
    .attr("fill","#fff")
    .style("stroke-width", 1)
    .style({"font-size":"18px"}); 


 d3.select("#booklist")
   .append("ul")
   .attr("id", "books")
   .selectAll("li")
   .data(data)
   .enter().filter(function(d){return d.name.length > 1})
   .append("li")
   .text(function(d) {return d.name;});

});

