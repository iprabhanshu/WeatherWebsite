//defined a variable globally
var data;

//to check if the browser supports the XMLHttpRequest or else create an ActiveXObject
function getHTTPObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

function loadData() {
  var request = getHTTPObject();
  var city = document.getElementById("city").value;
  if (request) {
    request.onreadystatechange = function() {
      parseResponse(request);
    };
    request.open("GET","http://api.openweathermap.org/data/2.5/forecast?q=" + city + 
      "&units=metric&cnt=8" + "&mode=xml" + "&APPID=4d89d3eb3fbed207202d917b083c3980",true);
    request.send();
  }
}

function parseResponse(request){

if (request.readyState == 4) {
    if (request.status == 200 || request.status == 304) {
      data = request.responseXML;
      nextData(data);
    }
  }
} 


function nextData(data) {

  var dts = "";
  //getting all the elements by their tag name an storing value in a variable
  var cityname = data.getElementsByTagName("name")[0].firstChild.nodeValue;
  var date = data.getElementsByTagName("time")[0].getAttribute("day");
  var date = data.getElementsByTagName("time");
  var symbol = data.getElementsByTagName("symbol");
  var temp = data.getElementsByTagName("temperature");
  var wind = data.getElementsByTagName("windSpeed");
  var direction = data.getElementsByTagName("windDirection");
  var press = data.getElementsByTagName("pressure");
  var hum = data.getElementsByTagName("humidity");
  //creating variable with an empty array
  var myDate=[];
  var y=[];
  var x=[];
  var myTemp=[];
  var myWind=[];
  var myWind1=[];
  var myDirect=[];
  var myDirect1=[];
  var mypress=[];
  var mypress1=[];
  var myhumidity=[];

  dts = "<div class='weather-wrapper'>";
  //pushing all those value coming from xml to the empty array created above
  for (var i = 0; i < date.length; i++) {

    myDate.push(date[i].getAttribute("from"));
    y.push(symbol[i].getAttribute("var"));
    x.push(symbol[i].getAttribute("name"));
    myTemp.push(temp[i].getAttribute("value"));
    myWind.push(wind[i].getAttribute("mps"));
    myDirect.push(direction[i].getAttribute("name"));
    mypress.push(press[i].getAttribute("value"));
    myhumidity.push(hum[i].getAttribute("value"));
   
    var datefrom = date[i].getAttribute("from");
    var datefromsplit = datefrom.split("T"); 
    var dateto = date[i].getAttribute("to");
    var datetosplit = dateto.split("T");

    var ima = " http://openweathermap.org/img/w/" + symbol[i].getAttribute("var") + ".png";
    var tempea = temp[i].getAttribute("value");
    //fetching values in cards 
    dts += "<div class='weather-card '><div class='dates'>"+ datefromsplit[0] +"<br>" + datefromsplit[1] +" - " + 
    datetosplit[1] +"</div><div class='weather-icon sun'><div class='pic'><img src='" + ima + " '></div></div><h1> " + 
    tempea + "<sup>0</sup>C</h1><p>" + cityname +"</p></div>";

  }

  /*Make charts visible*/
  document.getElementById('myChart').style.display = "block";
  document.getElementById('myChart1').style.display = "block";
  
  dts += "</div>";
  document.getElementById('results').innerHTML = dts;

  var ctx = document.getElementById('myChart1').getContext('2d');
  var mixedChart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
          label: 'Humidity',
          data: myhumidity,
          backgroundColor:"rgb(0,0,0)",
        }],
    labels: myDate
  },
  options: {
    maintainAspectRatio: false
  }
});

  var ctx = document.getElementById('myChart').getContext('2d');
  var mixedChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
          label: 'Wind',
          data: myWind,
          backgroundColor:"rgb(0,0,0)",
          fill:false
        }, ],
    labels: myDate
  },
  options: {
    maintainAspectRatio: false
  }
});
}
