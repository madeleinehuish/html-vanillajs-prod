$(function() {
  // jQuery goes here...


  for(let i=0; i<5; i++) {
    $(".col3").hide(2000);// Uncomment this line to fade out the red box on page load
    $(".col1").fadeOut(2000); //if use fadeTo(2000, 0) this will take to opacity 0 without setting display: none
    $(".col2").fadeOut(4000);
    $(".col1").fadeIn(2000);
    $(".col1").fadeTo(1000, 0.2);
    $(".col2").fadeIn(4000);
    $(".col2").fadeTo(2000, 0.4);
    $(".col2").fadeToggle();
    $(".col2").fadeToggle();
    $(".col3").show(2000);
  }

  $("td:even").css("background-color", "#e0ffff");
  //can also use .hide() (to set display:none) and .show()
  //also .toggle()

});
