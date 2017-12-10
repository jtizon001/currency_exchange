
$(document).ready(function () {

// alert("hello");


//use ajax to fetch data from the python file "app.py"
  $( document.getElementById('button1') ).click(function() {
    alert("you clicked");

    var dataObject = $('form').serialize();
    console.log(dataObject);

    $.ajax({
      method: "POST",
      url: "https://jtizon001.github.io/getData/",
      // dataType: "JSON",
      // data: {"base":"btc","target":"usd","amount":"100"},
      data: {"d": dataObject},
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

 
  });
 

  $( document.getElementById('go-1') ).click(function() {
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");
    // document.getElementsByClassName('content-box').innerHTML += 'TEST 2 TEST 2'

  });

  $( document.getElementById('go-2') ).click(function() {
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");
  });

  $( document.getElementById('go-3') ).click(function() {
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><iframe src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51705.71556068031!2d-79.07397514277635!3d35.90763429846561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scurrency+exchange!5e0!3m2!1sen!2sus!4v1512932684975' width='800' height='600' align='middle' frameborder='0' style='border:0' allowfullscreen> </iframe></div>");

  });

  $( document.getElementById('go-4') ).click(function() {
    $( document.getElementsByClassName('content-box-area') ).append( "<div class = 'content-box'><p>content will go here :)</p></div>");

  });


});






