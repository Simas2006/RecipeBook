function renderTable() {
  var req = new XMLHttpRequest();
  req.addEventListener("load",function() {
    var data = this.responseText.split(",");
    var table = document.getElementById("table");
    var row = document.createElement("tr");
    var title = document.createElement("th");
    title.innerText = "Title";
    row.appendChild(title);
    var link = document.createElement("th");
    link.innerText = "Link";
    row.appendChild(link);
    table.appendChild(row);
    for ( var i = 0; i < data.length; i++ ) {
      var row = document.createElement("tr");
      var title = document.createElement("td");
      title.innerText = data[i];
      row.appendChild(title);
      var link = document.createElement("td");
      var a = document.createElement("a");
      a.href = "/recipes/" + data[i];
      a.innerText = "Get Recipe";
      link.appendChild(a);
      row.appendChild(link);
      table.appendChild(row);
    }
  });
  req.open("GET","/list");
  req.send();
}

window.onload = renderTable;
