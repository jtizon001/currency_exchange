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

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><script>var dateVar =  $( '#date' ).datepicker({changeMonth: true, changeYear: true});</script>Enter a currency and date:<br><form enctype='application/json' id = 'historyForm'><input type='text' placeholder = 'From' name='historyCurrBase' id = 'historyCurrBase'> <input type='text' placeholder = 'To' name='historyCurrTarget' id = 'historyCurrTarget'> <input type='text' placeholder = 'mm/dd/yyyy' name='date' id = 'date'> <input class='btn btn-primary btn-lg' type='submit' name='submit' id = 'historyButton'></form><div><historyResult</div></div>");


    $( document.getElementById('historyButton') ).click(function(e) {
      // e.stopPropagation();
      e.preventDefault();
      alert("you clicked");
      var historyArray = $('form').serializeArray();
      console.log(historyArray);

      var historyJsonstring = {}
      jQuery.each(historyArray, function() {
        historyJsonstring[this.name] = this.value || '';
      });
      console.log(historyJsonstring);
      var historyDataObject = JSON.stringify(historyJsonstring);
      
      var historyDataObject2 = "{" + historyDataObject.substring(35, historyDataObject.length);

      console.log(historyDataObject2);




// _________________________ uncomment this once Jonny's app.py is ready for it _______________________________________________________

      $.ajax({
        method: "POST",
        // url: "http://192.241.142.13:80/getData/",
        url: "http://localhost:5000/getHistory",
        contentType: "application/json",
        data: historyDataObject2,
        error: function(response){
          console.log("error in ajax call");
        },
        success: function(response){
          console.log("success: ");
          console.log(response);

        
        stringHistoryResponse = JSON.stringify(response);
        stringHistorySymbol = JSON.stringify(historyArray[1]);
        stringHistorySymbol2 = stringHistorySymbol.substring(stringHistorySymbol.length-5, stringHistorySymbol.length-2).toUpperCase();

        document.getElementsByClassName('historyResult')[0].innerHTML = "<BR>= " + stringHistoryResponse.substring(8, stringHistoryResponse.length-1) + " " + stringHistorySymbol2;
        }

      }).done(function( ) {
        
        console.log("done");

      });



     });


  });

  
// _________________________ content box: Graphs _______________________________________________________


  $( document.getElementById('go-2') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';
    
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><Enter 2 currencies to compare:<form enctype='application/json'> <input type='text' placeholder ='Base' name='baseCurr' id ='baseCurr'> <input type='text' placeholder ='Target' name='targetCurr' id='targetCurr'> <select><option value='' disabled selected>Past...</option><option value='past30Days'>Past 30 Days</option><option value='past12Months'>Past 12 Months</option><option value='past5Years'>Past 5 Years</option></select> <input class='btn btn-primary btn-lg' type='submit' name='submit' id = 'graphButton'></form> </div>");

    $( document.getElementsByClassName('content-box-area') ).append( "<div id = 'chart'></div>");
  });

  $( document.getElementById('go-3') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';


    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><iframe src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51705.71556068031!2d-79.07397514277635!3d35.90763429846561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scurrency+exchange!5e0!3m2!1sen!2sus!4v1512932684975' width='800' height='600' align='middle' frameborder='0' style='border:0' allowfullscreen> </iframe></div>");

  });

  $( document.getElementById('go-4') ).click(function() {

    document.getElementsByClassName('content-box-area')[0].innerHTML = '';

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'>&nbsp;&nbsp;&nbsp;&nbsp;<iframe width='400' height='400' style='border:none;'' src='http://output15.rssinclude.com/output?type=iframe&amp;id=1164374&amp;hash=92e11872b1c3456f40e011c43086ad7e'></iframe></div>");

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
