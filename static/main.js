$(document).ready(function () {


// _________________________ ajax call for conversion _______________________________________________________

//use ajax to fetch data from the python file "app.py"
  $( document.getElementById('button1') ).click(function(e) {
    e.preventDefault();
    // e.stopPropagation();


    var array = $('form').serializeArray();
    var jsonstring = {}
    jQuery.each(array, function() {
      jsonstring[this.name] = this.value || '';
    });
    console.log(jsonstring);
    var dataObject = JSON.stringify(jsonstring);
    console.log(dataObject);


//just for testing:
    //var hardCodedObject = '{"base":"btc","target":"usd","amount":"100"}'

    // if(dataObject[1].length() == 3 || dataObject[3].length() == 3){

      $.ajax({
        method: "POST",
        // url: "http://192.241.142.13:80/getData/",
        url: "http://localhost:5000/getData",
        contentType: "application/json",
        // dataType: "JSON",
        // data: {"base":"btc","target":"usd","amount":"100"},
        // data: {"d": dataObject},
        data: dataObject,
        error: function(response){
          console.log("error in ajax call");
        },
        success: function(response){
          console.log("success: ");
          console.log(response);


          // var stringResponse = JSON.parse(response);
        // $( document.getElementsByClassName('result') ).append(response);

        stringResponse = JSON.stringify(response);
        stringSymbol = JSON.stringify(array[1]);
        stringSymbol2 = stringSymbol.substring(stringSymbol.length-5, stringSymbol.length-2).toUpperCase();

        document.getElementsByClassName('result')[0].innerHTML = "<BR>= " + stringResponse.substring(8, stringResponse.length-1) + " " + stringSymbol2;
        
        // document.getElementsByClassName('container')[0].appendChild(response);


          // $( document.getElementById('resultDiv') ).html(response);
        }

      }).done(function( ) {
        
        console.log("done");

      });

    // }

    // else{
    //   alert("please enter the 3-character symbol of your currency.");
    // }
 
  });







// _________________________ content box: History _______________________________________________________

  $( document.getElementById('go-1') ).click(function() {
    
    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><script>var dateVar =  $( '#date' ).datepicker({changeMonth: true, changeYear: true});</script>Enter 2 currencies and a date, and find out the old exchange rate:<br><form enctype='application/json' id = 'historyForm'><input type='text' placeholder = 'From' name='historyCurrBase' id = 'historyCurrBase'> <input type='text' placeholder = 'To' name='historyCurrTarget' id = 'historyCurrTarget'> <input type='text' placeholder = 'mm/dd/yyyy' name='date' id = 'date'> <input class='btn btn-primary btn-lg' type='submit' name='submit' id = 'historyButton'></form><div id = 'historyResult'></div></div>");


    $( document.getElementById('historyButton') ).click(function(e) {
      // e.stopPropagation();
      e.preventDefault();

      var historyArray = $('#historyForm').serializeArray();
      console.log(historyArray);

      var historyJsonstring = {}
      jQuery.each(historyArray, function() {
        historyJsonstring[this.name] = this.value || '';
      });
      var historyDataObject = JSON.stringify(historyJsonstring);




// _________________________ AJAX call for history box _______________________________________________________

      $.ajax({
        method: "POST",
        // url: "http://192.241.142.13:80/getData/",
        url: "http://localhost:5000/getHistory",
        contentType: "application/json",
        data: historyDataObject,
        error: function(response){
          console.log("error in ajax call");
          alert("Your inputs or the date may be invalid");
        },
        success: function(response){
          console.log("success: ");
          console.log(response);

        
        stringHistoryResponse = JSON.stringify(response);
        stringHistorySymbol = JSON.stringify(historyArray[1]);

        console.log(stringHistorySymbol, stringHistoryResponse);

        stringHistorySymbol2 = stringHistorySymbol.substring(stringHistorySymbol.length-5, stringHistorySymbol.length-2).toUpperCase();

        console.log(stringHistorySymbol2);

        document.getElementById('historyResult').innerHTML = "<BR>On this date in history, the conversion rate was " + stringHistoryResponse.substring(8, stringHistoryResponse.length-1);
        // + " " + stringHistorySymbol2;
        }

      }).done(function( ) {
        
        console.log("done");

      });



     });


  });

  
// _________________________ content box: Graphs _______________________________________________________


  $( document.getElementById('go-2') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';
    
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'>Enter a base currency and up to 2 target currencies to compare:<br><form enctype='application/json' id='graphForm'> <input type='text' placeholder ='Base' name='baseCurr' id ='baseCurr'> <input type='text' placeholder ='Target' name='targetCurr' id='targetCurr t1'> <select id='timeDropdown'><option value='' disabled selected>Past...</option><option value='past30Days'>Past 30 Days</option><option value='past12Months'>Past 12 Months</option><option value='past5Years'>Past 5 Years</option></select> <input class='btn btn-primary btn-lg' type='submit' name='submit' id = 'graphButton'></form> </div>");

    $("#graphButton").click(function(e) {
      e.preventDefault();

      var range = document.getElementById('timeDropdown').value
      var array = $('#graphForm').serializeArray();
      console.log(array);

      var graphJson = {};
      jQuery.each(array, function() {
        graphJson[this.name] = this.value || '';
      });
      console.log(graphJson);
      var graphJsonObject = JSON.stringify(graphJson);
      console.log(graphJsonObject);

      var graphJsonObj2 = graphJsonObject.substring(0, graphJsonObject.length-1) + ',"range":' + '"' + range + '"}';

      console.log(graphJsonObj2);





      $.ajax({
      method: "POST",
      url: "http://localhost:5000/getGraphData",
      contentType: "application/json",
      data: graphJsonObj2,
      error: function(response) {
        console.log("error graph");
      },
      success: function(response) {
        console.log("success graph");

        console.log(response);
        //response = {rate: { date: [base, target, rate] } }  ---> {key: { key : value(3)}}

        var dates = [];
        var rates = [];
        var base;
        var target;

        for (key in response) {
          for (key2 in response[key]) {
            base = response[key][key2][0];
            target = response[key][key2][1];
            dates.push(key2);
            rates.push(response[key][key2][2]);
          }
        }

        $( document.getElementsByClassName('content-box-area') ).append( "<div id = 'chart'></div>");
        makeGraph(dates, rates, base, target);
      }

    }).done(function() {

      console.log("done");
    })

    })



    //$( document.getElementsByClassName('content-box-area') ).append( "<div id = 'chart'></div>");
    //makeGraph();
  });
// _____________________________________content box: Maps____________________________________________



  $( document.getElementById('go-3') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';


    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box' id = 'content-box-map'><iframe src='https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d206827.95187267763!2d-79.109654!3d35.905687!3m2!1i1024!2i768!4f13.1!2m1!1sinternational+currency+exchange+close+to+me!5e0!3m2!1sen!2sus!4v1513112364416' width='100%'' height='400' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

  });

//__________________________________content box: Travel news_______________________________________________________


  $( document.getElementById('go-4') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

     $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'id = 'content-box-map'>&nbsp;&nbsp;&nbsp;&nbsp;<iframe width='100%' height='400' style='border:none;'' src='http://output15.rssinclude.com/output?type=iframe&amp;id=1164374&amp;hash=92e11872b1c3456f40e011c43086ad7e'></iframe></div>");
  });



// _________________________ autocomplete _______________________________________________________

  $( function() {
    var availableTags = [
      "USD",
      "EUR",
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
  
  
  
  
  
  
  // _________________________ Charts stuff _______________________________________________________

    var makeGraph = function(dates, currency1, base, target) {

      currency1.unshift(target);

      dates.unshift('x');

      var chart = c3.generate({

        // 'bindto' to specify which html element to add graph to
        bindto: '#chart',
        data: {
          x: 'x',
          xFormat: '%m/%d/%Y',
          columns: [dates, currency1]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%m/%d/%Y'
            }
          }
        }
      });

      /*
      // Not sure if necessary, just something extra
      $("#chart").append($("<button id='show'>Show</button>"));
      $("#chart").append($("<button id='hide'>Hide</button>"));
      document.getElementById('show').addEventListener('click', function() {
        chart.show(['currency1'])
      });
      document.getElementById('hide').addEventListener('click', function() {
        chart.hide(['currency1'])
      });
      */

    }
});
