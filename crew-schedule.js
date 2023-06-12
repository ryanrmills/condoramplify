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
  { name: "Emily Davis", title: "Crew Member", experience: 3 },
  { name: "Michael Brown", title: "Pilot", experience: 7 },
  { name: "Sarah Wilson", title: "Pilot", experience: 6 },
  { name: "Robert Taylor", title: "Crew Member", experience: 4 },
  { name: "Olivia Thomas", title: "Crew Member", experience: 3 },
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
  { name: "Sophie Clark", title: "Crew Member", experience: 6 },
  // Add more personnel as needed
  { name: "Nathan Turner", title: "Pilot", experience: 9 },
  { name: "Lily Parker", title: "Pilot", experience: 3 },
  { name: "Henry Brooks", title: "Crew Member", experience: 5 },
  { name: "Grace Davis", title: "Crew Member", experience: 4 },
  // Add more personnel as needed
  { name: "Elijah Mitchell", title: "Pilot", experience: 7 },
  { name: "Aria Walker", title: "Pilot", experience: 4 },
  { name: "Oliver Baker", title: "Crew Member", experience: 6 },
  { name: "Chloe Foster", title: "Crew Member", experience: 3 },
];

///////////////////////////////////////////////////////

function generateCrewWithDelay() {
    // Show loading animation
    showLoadingAnimation();
  
    // Generate a crew after a random delay
    setTimeout(function () {
      generateCrew();
      // Hide loading animation
      hideLoadingAnimation();
    }, getRandomDelay());
  }
  
  function getRandomDelay() {
    // Generate a random delay between 1 and 5 seconds
    return Math.floor(Math.random() * 4000) + 1000;
  }
  
  function showLoadingAnimation() {
    // Display the loading animation
    var loadingAnimation = document.getElementById("loadingAnimation");
    loadingAnimation.style.display = "block";
  }
  
  function hideLoadingAnimation() {
    // Hide the loading animation
    var loadingAnimation = document.getElementById("loadingAnimation");
    loadingAnimation.style.display = "none";
  }

  /////////////////////////



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
    date: "2023-06-12",
    time: "3:00 EST",
    RTE: "ILM --> ATL",
  };
}

function displayCrew(table, crew) {
  // Create the table header
  var headerRow = document.createElement("tr");
  var headers = ["Name", "Title", "Flight Duty(hrs/day)"];
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
  flightInfoCell.textContent = "Flight Date: " + flightInfo.date + ", Time: " + flightInfo.time +", RTE: " + flightInfo.RTE;
  flightInfoRow.appendChild(flightInfoCell);
  flightInfoTable.appendChild(flightInfoRow);
}