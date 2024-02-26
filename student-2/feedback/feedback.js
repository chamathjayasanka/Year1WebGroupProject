
let detailform = document.getElementById("detailform");

document.getElementById("send-feedback").addEventListener("click", event => {


  document.getElementById("f-name").style.color = "black";
  document.getElementById("fname").style.outline = ".1rem solid black";
  document.getElementById("l-name").style.color = "black";
  document.getElementById("lname").style.outline = ".1rem solid black";
  document.getElementById("e-mail").style.color = "black";
  document.getElementById("mail").style.outline = ".1rem solid black";
  document.getElementById("qq1").style.backgroundColor = "white";
  document.getElementById("qq2").style.backgroundColor = "white";
  document.getElementById("qq3").style.backgroundColor = "white";
  document.getElementById("qq4").style.backgroundColor = "white";
  document.getElementById("qq5").style.backgroundColor = "white";


  if (!document.getElementById("fname").value.trim().match(/^[a-zA-Z .]+$/)) {
    document.getElementById("f-name").style.color = "red";
    document.getElementById("fname").style.outline = ".1rem solid red";
    return;
  } else {
    document.getElementById("f-name").style.color = "black";
    document.getElementById("fname").style.outline = ".1rem solid black";
  }

  if (!document.getElementById("lname").value.trim().match(/^[a-zA-Z .]+$/)) {
    document.getElementById("l-name").style.color = "red";
    document.getElementById("lname").style.outline = ".1rem solid red";
    return;
  } else {
    document.getElementById("l-name").style.color = "black";
    document.getElementById("lname").style.outline = ".1rem solid black";
  }

  if (!document.getElementById("mail").value.trim().match(/^[a-zA-Z0-9+-.]+@[a-zA-Z0-9+-.]+$/)) {
    document.getElementById("e-mail").style.color = "red";
    document.getElementById("mail").style.outline = ".1rem solid red";
    return;
  } else {
    document.getElementById("e-mail").style.color = "black";
    document.getElementById("mail").style.outline = ".1rem solid black";
  }

  if (document.querySelector("input[name=\"rate\"]:checked") == null) {
    document.getElementById("qq1").style.backgroundColor = "#fb6355";
    return;
  } else {
    document.getElementById("qq1").style.backgroundColor = "white";
  }

  if (document.querySelector("input[name=\"firstvisit\"]:checked") == null) {
    document.getElementById("qq2").style.backgroundColor = "#fb6355";
    return;
  } else {
    document.getElementById("qq2").style.backgroundColor = "white";
  }

  if (document.querySelector("input[name=\"findneed\"]:checked") == null) {
    document.getElementById("qq3").style.backgroundColor = "#fb6355";
    return;
  } else {
    document.getElementById("qq3").style.backgroundColor = "white";
  }

  if (document.querySelector("input[name=\"easyinfo\"]:checked") == null) {
    document.getElementById("qq4").style.backgroundColor = "#fb6355";
    return;
  } else {
    document.getElementById("qq4").style.backgroundColor = "white";
  }


  if (document.querySelector("input[name=\"Prof\"]:checked") == null &&
    document.querySelector("input[name=\"Inform\"]:checked") == null &&
    document.querySelector("input[name=\"Visupleas\"]:checked") == null) {
    document.getElementById("qq5").style.backgroundColor = "#fb6355";
    return;
  } else {
    document.getElementById("qq5").style.backgroundColor = "white";
  }

  detailform.submit();
  document.getElementById("success-div").style.height = "100vh";
  document.querySelector("#success-div2 > button").addEventListener("click", e => {
    window.location.reload();
  });

});




