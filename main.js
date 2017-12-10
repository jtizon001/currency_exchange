$(document).ready(function () {


  $( document.getElementById("baseCurr") ).click(function() {
    $(this).select(); 
  });

  $( document.getElementById("targetCurr") ).click(function() {
    $(this).select(); 
  }); 

  $( document.getElementById("amount") ).click(function() {
    $(this).select(); 
  });

  


// _________________________ ajax call for conversion _______________________________________________________

//use ajax to fetch data from the python file "app.py"
  $( document.getElementById('button1') ).click(function() {
    alert("you clicked");

    var dataObject = $('form').serialize();

    var newDataObject = '{"base":"' + dataObject[5] + dataObject[6] + dataObject[7] + '","target":"' + dataObject[16] + dataObject[17] + dataObject[18] + '","amount":"100"}';

    console.log(dataObject);
    console.log(newDataObject);

    // if(dataObject[1].length() == 3 || dataObject[3].length() == 3){

      $.ajax({
        method: "POST",
        url: "https://jtizon001.github.io/getData/",
        dataType: "JSON",
        // data: {"base":"btc","target":"usd","amount":"100"},
        // data: {"d": dataObject},
        data: newDataObject,
        error: function(response){
          console.log("error in ajax call");
          alert("error in ajax call");
        },
        success: function(response){
          console.log("success: ");
          alert("success: ");
          // $( document.getElementById('resultDiv') ).html(response);
        }

      }).done(function( ) {
        
        console.log("done");

      });

      alert("2");

    // }

    // else{
    //   alert("please enter the 3-character symbol of your currency.");
    // }
 
  });




// _________________________ content box stuff _______________________________________________________

  $( document.getElementById('go-1') ).click(function() {
    
    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");

//jquery UI thing that might be useful here
    // $( "#date" ).datepicker();

  });

  $( document.getElementById('go-2') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

    $( document.getElementsByClassName('content-box-area') ).append( "<div id = 'chart'></div>");
  });

  $( document.getElementById('go-3') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';


    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><iframe src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51705.71556068031!2d-79.07397514277635!3d35.90763429846561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scurrency+exchange!5e0!3m2!1sen!2sus!4v1512932684975' width='800' height='600' align='middle' frameborder='0' style='border:0' allowfullscreen> </iframe></div>");

  });

  $( document.getElementById('go-4') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");

  });



// _________________________ autocomplete _______________________________________________________

  $( function() {
    var availableTags = [
      "USD",
      "JPY",
      "BGN",
      "CZK",
      "DKK",
      "GBP",
      "HUF",
      "PLN",
      "RON",
      "SEK",
      "CHF",
      "NOK",
      "HRK",
      "RUB",
      "TRY",
      "AUD",
      "BRL",
      "CAD",
      "CNY",
      "HKD",
      "IDR",
      "ILS",
      "INR",
      "KRW",
      "MXN",
      "MYR",
      "NZD",
      "PHP",
      "SGD",
      "THB",
      "ZAR",
      "BTC",
    ];
    $("#baseCurr").autocomplete({
      source: availableTags
    });
    $("#targetCurr").autocomplete({
      source: availableTags
    });
  } );
  
  //chart
// 2 arrays with dummy currency rate info of certain time frame
// these 2 arrays should be returned by some database access call
  //  $(function(){
    $( document.getElementById('go-2') ).click(function() {
        var currency1 = [10, 20, 30, 40, 50]
        var currency2 = [5, 20, 40, 55, 60]

//array of dates corresponding to above currency rates
        var x = ['2016-01-01', '2016-01-02', '2016-01-03', '2016-01-04', '2016-01-05']

// Needed for proper format of graph creation
// Adds currency name to head of array
        currency1.unshift('currency1');  //currency1 = ['currency1', 10, 20, 30,...]
        currency2.unshift('currency2');  //currency2 = ['currency2', 5, 20, 40,...]

        x.unshift('x');  //x = ['x', '2016-01-01',....]

        var chart = c3.generate({

            // 'bindto' to specify which html element to add graph to
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [x, currency1, currency2]
            },
            axis: {
                x: {
                    type: 'timeseries'
                }
            }
        });

        // Not sure if necessary, just something extra
        $("#chart").append($("<button id='show'>Show (currency2)</button>"));
        $("#chart").append($("<button id='hide'>Hide (currency2)</button>"));
        document.getElementById('show').addEventListener('click', function() {
            chart.show(['currency2'])
        });
        document.getElementById('hide').addEventListener('click', function() {
            chart.hide(['currency2'])
        });

    });
});






