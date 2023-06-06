var map;
        
var currentAnimationFrame = 0;
var animationFrames = 0;
var animationIntervalFunctionId;

function loadMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.7, lng: -96.2}, zoom: 4
  });
  refreshWeatherLayer();

  //weather layer refreshes at the next 5 minute mark
  var now = new Date().getTime();
  var msSinceLastFive = now % (5*60*1000);
  var msUntilNextFive = (5*60*1000) - msSinceLastFive;
  setTimeout(function(){
    refreshWeatherLayer();
    //refresh again in 5 minutes
    setInterval(refreshWeatherLayer, 5*60*1000);
  }, msUntilNextFive + 10*100);
}

//probably a smarter way to format dates
function getDateString(date){     

  var year = date.getUTCFullYear();
  var month = date.getUTCMonth()+1;
  if(month < 10){
    month = "0" + month;
  }
  var day = date.getUTCDate();
  if(day < 10){
    day = "0" + day;
  }
  var hour = date.getUTCHours();
  if(hour < 10){
    hour = "0" + hour;
  }
  //the weather api only gives us weather at 5 minutes marks, round down
  var minute = date.getUTCMinutes();
  minute = minute - (minute%5);
  if(minute < 10){
    minute = "0" + minute;
  }

  return year.toString()+month.toString()+day.toString()+hour.toString()+minute.toString();   
}

function refreshWeatherLayer(){
  var animateWeather = document.getElementById("animateWeatherCheckBox").checked;
  var weatherAnimationPastFrameCount = 24;
  var weatherAnimationInterval = 100;

  setWeather(animateWeather, weatherAnimationPastFrameCount, weatherAnimationInterval);
}

function setWeather(animate, weatherAnimationPastFrameCount, weatherAnimationInterval){

  if(animationIntervalFunctionId){
    clearInterval(animationIntervalFunctionId);        
  }

  //remove previous overlays
  map.overlayMapTypes.clear();

  if(animate){       
    var baseDate = new Date();

    var i = 0;
    for(var index = -weatherAnimationPastFrameCount; index <= 0; index++){   
      var frameDate = new Date(baseDate.getTime() + index * 5 * 60 * 1000);
      var frameWeatherString = getDateString(frameDate);
      addWeatherFrame(i, frameWeatherString, 0);
      i++;
    }
    animationFrames = i;
    animationIntervalFunctionId = setInterval(incrementAnimationFrame, weatherAnimationInterval);
  }
  else{
    addWeatherFrame(0, getDateString(new Date()), 1);
  }  
}

function addWeatherFrame(index, frameWeatherDate, frameOpacity){

  var frame = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/ridge::USCOMP-N0Q-" + frameWeatherDate + "/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    },
    tileSize: new google.maps.Size(256, 256),
    opacity:frameOpacity,
    isPng: true
  });
  map.overlayMapTypes.setAt(index, frame);        
}

function incrementAnimationFrame(){
  map.overlayMapTypes.getAt(currentAnimationFrame).setOpacity(0);
  currentAnimationFrame++;
  if(currentAnimationFrame >= animationFrames){
    currentAnimationFrame = 0;
  }
  map.overlayMapTypes.getAt(currentAnimationFrame).setOpacity(1);
}

function setAnimateHelpTextVisibility(){
  var animateWeather = document.getElementById("animateWeatherCheckBox").checked;
  if(animateWeather){
    document.getElementById("animateHelpText").style.display = "block";
  }
  else{
    document.getElementById("animateHelpText").style.display = "none";
  }
}

// Define the list of planes
var planeList = [];
var planeCount = 10; // Number of planes needed

for (var i = 1; i <= planeCount; i++) {
  var plane = { tailNumber: "PLN" + i.toString().padStart(3, "0"), type: "Type " + i };
  planeList.push(plane);
}

// Define the list of personnel
var personnelList = [
  { name: "John Doe", title: "Pilot", experience: 5 },
  { name: "Jane Smith", title: "Pilot", experience: 8 },
  { name: "Tom Johnson", title: "Crew Member", experience: 3 },
  { name: "Emily Davis", title: "Crew Member", experience: 2 },
  { name: "Michael Brown", title: "Pilot", experience: 7 },
  { name: "Sarah Wilson", title: "Pilot", experience: 6 },
  { name: "Robert Taylor", title: "Crew Member", experience: 4 },
  { name: "Olivia Thomas", title: "Crew Member", experience: 1 },
  // Add more personnel as needed
  { name: "Daniel Anderson", title: "Pilot", experience: 9 },
  { name: "Sophia Martinez", title: "Pilot", experience: 3 },
  { name: "Jackson Lewis", title: "Crew Member", experience: 5 },
  { name: "Victoria Walker", title: "Crew Member", experience: 2 },
  // Add more personnel as needed
  { name: "William Moore", title: "Pilot", experience: 4 },
  { name: "Ava Clark", title: "Pilot", experience: 2 },
  { name: "Ethan Hall", title: "Crew Member", experience: 6 },
  { name: "Isabella Turner", title: "Crew Member", experience: 3 },
  // Add more personnel as needed
  { name: "Jacob Baker", title: "Pilot", experience: 7 },
  { name: "Mia Foster", title: "Pilot", experience: 4 },
  { name: "Liam Murphy", title: "Crew Member", experience: 5 },
  { name: "Emma Butler", title: "Crew Member", experience: 2 },
  { name: "Adam Wilson", title: "Pilot", experience: 6 },
  { name: "Eva Thompson", title: "Pilot", experience: 4 },
  { name: "Lucas Anderson", title: "Crew Member", experience: 7 },
  { name: "Sophie Clark", title: "Crew Member", experience: 1 },
  // Add more personnel as needed
  { name: "Nathan Turner", title: "Pilot", experience: 9 },
  { name: "Lily Parker", title: "Pilot", experience: 3 },
  { name: "Henry Brooks", title: "Crew Member", experience: 5 },
  { name: "Grace Davis", title: "Crew Member", experience: 2 },
  // Add more personnel as needed
  { name: "Elijah Mitchell", title: "Pilot", experience: 7 },
  { name: "Aria Walker", title: "Pilot", experience: 4 },
  { name: "Oliver Baker", title: "Crew Member", experience: 6 },
  { name: "Chloe Foster", title: "Crew Member", experience: 3 },
];

// Variables to store the generated crew and approved crew
function generateCrew() {
  // Generate a crew for a single plane
  var crew = generateSingleCrew();

  // Generate flight information
  flightInfo = generateFlightInfo();

  // Display the tail number
  var tailNumberTable = document.getElementById("tailNumberTable");
  tailNumberTable.innerHTML = "";
  var tailNumberRow = document.createElement("tr");
  var tailNumberCell = document.createElement("td");
  tailNumberCell.textContent = "Tail Number: " + flightInfo.tailNumber;
  tailNumberRow.appendChild(tailNumberCell);
  tailNumberTable.appendChild(tailNumberRow);

  // Display the generated crew
  var crewTable = document.getElementById("generatedCrewTable");
  crewTable.innerHTML = "";
  displayCrew(crewTable, crew);
  
  // Store the generated crew
  generatedCrew = crew;
}

function generateSingleCrew() {
  var crew = [];

  // Randomly select a pilot
  var randomPilotIndex = Math.floor(Math.random() * personnelList.length);
  var pilot = personnelList[randomPilotIndex];
  crew.push(pilot);

  // Randomly select crew members
  var remainingPersonnel = personnelList.filter(function (person) {
    return person.title === "Crew Member";
  });
  for (var i = 0; i < 3; i++) {
    var randomCrewIndex = Math.floor(Math.random() * remainingPersonnel.length);
    var crewMember = remainingPersonnel[randomCrewIndex];
    crew.push(crewMember);
    remainingPersonnel.splice(randomCrewIndex, 1);
  }

  return crew;
}

function generateFlightInfo() {
  // Replace this with your code to generate the flight information
  // Example flight information:
  return {
    tailNumber: planeList[Math.floor(Math.random() * planeList.length)].tailNumber,
    date: "2023-06-06",
    time: "10:00 AM"
  };
}

function displayCrew(table, crew) {
  // Create the table header
  var headerRow = document.createElement("tr");
  var headers = ["Name", "Title", "Experience"];
  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Add crew members to the table
  crew.forEach(function (member) {
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var titleCell = document.createElement("td");
    var experienceCell = document.createElement("td");
    nameCell.appendChild(document.createTextNode(member.name));
    titleCell.appendChild(document.createTextNode(member.title));
    experienceCell.appendChild(document.createTextNode(member.experience));
    row.appendChild(nameCell);
    row.appendChild(titleCell);
    row.appendChild(experienceCell);
    table.appendChild(row);
  });
}

function approveCrew() {
  // Store the generated crew as the approved crew
  approvedCrew = generatedCrew;

  // Display the approved crew
  var approvedCrewTable = document.getElementById("approvedCrewTable");
  approvedCrewTable.innerHTML = "";
  displayCrew(approvedCrewTable, approvedCrew);

  // Display the flight information
  var flightInfoTable = document.getElementById("flightInfoTable");
  flightInfoTable.innerHTML = "";
  var flightInfoRow = document.createElement("tr");
  var flightInfoCell = document.createElement("td");
  flightInfoCell.textContent = "Flight Date: " + flightInfo.date + ", Time: " + flightInfo.time;
  flightInfoRow.appendChild(flightInfoCell);
  flightInfoTable.appendChild(flightInfoRow);
}

