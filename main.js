// // the selector will match all input controls of type :checkbox
// // and attach a click event handler 
$(document).ready(function() {
$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });
});
// $(document).ready(function() {
//     $('input[type="checkbox"]').click(function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//     });
// });
let form = document.getElementById("form")
form.addEventListener('submit', calculate)

function calculate(e){
    e.preventDefault();

    var basic = document.getElementById("basic").value;
    var benefits = document.getElementById("ben").value;
    var showtax = document.getElementById("tax")
    var nsf = document.getElementById("ded");
    let rat = document.getElementById("rate");

    if(nsf.checked){
        var nssf = 200;
    }else {
        var nssf = 0;
    }
    if(rat.checked){
        var rate = 200;
    }else {
        var rate = 200;
    }
    if(basic<=12298 && nsf.checked && rat.checked){
        var tax =0;
        tax = ((basic)*0.1)
        showtax.innerHTML = "KSH" + tax;

    }

}