function renderTable() {
  var req = new XMLHttpRequest();
  req.addEventListener("load",function() {
    var data = this.responseText.split(",").map(item => item.split(".html").join(""));
    var table = document.getElementById("table");
    var row = document.createElement("tr");
    var title = document.createElement("th");
    title.innerText = "Title";
    row.appendChild(title);
    var link = document.createElement("th");
    link.innerText = "Link";
    row.appendChild(link);
    table.appendChild(row);
    if ( data[0] == "" && data.length == 1 ) return;
    for ( var i = 0; i < data.length; i++ ) {
      var row = document.createElement("tr");
      var title = document.createElement("td");
      title.innerText = data[i];
      row.appendChild(title);
      var link = document.createElement("td");
      var a = document.createElement("a");
      a.href = "/recipes/" + data[i] + ".html";
      a.target = "_blank";
      a.innerText = "Get Recipe";
      link.appendChild(a);
      row.appendChild(link);
      table.appendChild(row);
    }
  });
  req.open("GET","/list");
  req.send();
}

function registerNewRecipe() {
  var req = new XMLHttpRequest();
  req.addEventListener("load",function() {
    if ( this.responseText == "ok" ) {
      location.reload();
    } else {
      alert("An error occurred: " + this.responseText);
    }
  });
  req.open("GET","/register?" + document.getElementById("link").value + "," + document.getElementById("title").value);
  req.send();
}

window.onload = renderTable;
