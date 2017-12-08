
$(document).ready(function () {

// alert("hello");

//use ajax to fetch data from the python file "app.py"


  $( document.getElementById('button1') ).click(function() {
    alert("you clicked");

    var dataObject = $('form').serialize();
    console.log(dataObject);

    $.ajax({
      method: "POST",
      url: "https://jtizon001.github.io/getData",
      dataType: "JSON",
      // data: {"base":"btc","target":"usd","amount":"100"},
      data: {"d": dataObject},
      error: function(response){
        console.log("error in ajax call");
        alert("error in ajax call");
      },
      success: function(response){
        console.log("success: " + response);
        alert("success: " + response);
        // $( document.getElementById('resultDiv') ).html(response);
      }

    }).done(function( ) {
      
      console.log("done");

    });

    alert("2");

 
  });
 




//   $.getJSON('http://example.com/your/webservice?param1=x&param2=y', 
//     function(data, textStatus, jqXHR) {
//         alert(data);
//     }
// )
});
