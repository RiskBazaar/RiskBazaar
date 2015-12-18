//html parsering to gather names from static html page

// *** Issue with this Approach *** //

//specific knowledge of information location on the page 
    //ie: which section is the list of names under

//**********************************//


var request = require('request');
var cheerio = require('cheerio');

request({
    method: 'GET',
    url: 'https://www.actuaries.org.uk/studying/exam-results/ca1-actuarial-risk-management'
}, function(err, response, body) {
    if (err) return console.error(err);
    // console.log(body);

    // Tell Cherrio to load the HTML
    $ = cheerio.load(body);
    var parsedResults = [];

    $('div.field-body').each(function() {

        //pulling all names from the "p" tag
        //Data equals list of names 
    	Data = $('p', this).text();
    	console.log(Data);

    	// var names = JSON.parse(Data);

    	// names.forEach(function(result) {
    	// 	console.log(result);
    	// });

    	// var metadata = {
     //    rank: parseInt(rank),
     //    title: title,
     //    url: url,
     //    points: parseInt(points),
     //    username: username,
     //    comments: parseInt(comments)
     //  };
      // Push meta-data into parsedResults array
      // parsedResults.push(metadata);

    });

    // Log our finished parse results in the terminal
    // console.log(parsedResults);


});

//---------------------------------------------------------------------\\

//example way of isolating info from particular page 


//     $('span.comhead').each(function(i, element){
//       // Select the previous element
//       var a = $(this).prev();
//       console.log(a.text())
//       // Get the rank by parsing the element two levels above the "a" element
//       // var rank = a.parent().parent().text();
//       // Parse the link title
//       // var title = a.text();
//       // Parse the href attribute from the "a" element
//       // var url = a.attr('href');
//       // Get the subtext children from the next row in the HTML table.
//       // var subtext = a.parent().parent().next().children('.subtext').children();
//       // Extract the relevant data from the children
//       // var points = $(subtext).eq(0).text();
//       // var username = $(subtext).eq(1).text();
//       // var comments = $(subtext).eq(2).text();

});

