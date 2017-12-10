$(document).ready(function () {



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

    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");
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


});






