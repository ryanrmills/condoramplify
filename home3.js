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