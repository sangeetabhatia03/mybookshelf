function populateSidebar(data)
{
 d3.select("#booklist")
   .append("ul")
   .attr("id", "books")
   .selectAll("li")
   .data(data)
   .enter().filter(function(d){return d.name.length > 1})
   .append("li")
   .text(function(d) {return d.name;})
   .style("color", function(d){
   	  var fillcol = d.read=="0"? "red" : "#66cc00";
  	  return fillcol;
   })
}

function organiseByField(event)
{
  var svg = d3.select("#bookviz").append("svg")
	  .attr("id","bookvizsvg")
	  .attr("width", 800)
	  .attr("height", 960);

  var nested_data = d3.nest()
				.key(function(d){return d.read})
				.entries(event.data);

}

$(document).ready(function () {
	d3.csv("/mybookshelf/data/allbooks.csv", function(error, data){	
   		populateSidebar(data)
    	$( "#bygenre" ).click(data,organiseByField);
	});	
});


