
$(document).ready(function () {

alert("hello");

//use ajax to fetch data from the python file "app.py"


  $( document.getElementById('button1') ).click(function() {
    alert("you clicked");

    var dataObject = $('form').serialize();
    console.log(dataObject);

    $.ajax({
      type: "POST",
      url: "http://localhost:5000/index",
      // dataType: "JSON",
      // data: {"base":"btc","target":"usd","amount":"100"},
      data: {"d": dataObject},
      error: function(response){
        console.log("error");
        alert("error");
      },
      success: function(response){
        console.log(response);
        alert(response);
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
