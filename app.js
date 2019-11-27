//declaring global variables
var description;
var degree;          
var thelocation;
// the current icon is based on the waether(from the api)
var currentIcon;

//waiting for the page to load , we will use arrow funciton (shorter function syntax)
window.addEventListener('load',pageLoaded);
   
function pageLoaded(){
    

    // checking if the user accpted accessing the location
    if(navigator.geolocation){
        
        // first patrameter is a callback function we dfeined which recieves the Position object
        navigator.geolocation.getCurrentPosition(showlocation,null,null)

    }else{
      // if the user did not allow it 

       document.getElementsByClassName('location-timezone').innerHTML = "You did not allow your location services";

    }


}
function showlocation(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    


    const proxy = `https://cors-anywhere.herokuapp.com/`;

    const callApi = `${proxy}https://api.darksky.net/forecast/b24170bbef2514d7e6e92da26772471d/${lat},${long}`;
    
    //sending request to the DarkSky API, .then is used to execute whats inside it after the response is recieved.
    fetch(callApi).then(function(response){
        //converting the response to JSON.
        return response.json();
    }).then(function (data){
 
        // now the data is in json
          console.log(data);
          //retriveing infor from the JSON File
          
          var temperature = data.currently.temperature;
          var summary = data.currently.summary;
          var locationz = data.timezone;

          currentIcon = data.currently.icon;
          
          var iconID = document.querySelector(".icon");
          console.log(iconID);
          //get refrences to html elements
          getHtmlElements();
          // set HTML elements
          setHtmlElements(temperature,summary,locationz);

          //change the icon based on the weather 
          setIcons(currentIcon,iconID)
    
    });

}

function getHtmlElements(){
          
    description = document.querySelector('.temperature-desciption');

    console.log(description);

    degree = document.querySelector('.temperature-degree');

    thelocation = document.querySelector('.location-timezone');

}


function setHtmlElements(temperature,summary,locationz){

    degree.textContent = temperature;
    description.textContent = summary;
    thelocation.textContent = locationz;
}


function setIcons(icon,iconID){
   
    //define a new icon  object
    const skycons = new Skycons({"color":"white"});
    
    //regex to replace dashes with undersocres because the skycone api needs underscore and the icon property in the darksky api contains dahses.
    // and make it uppercase because thats what skycone needs
    icon = icon.replace(/-/g, '_').toUpperCase();
    
    console.log(iconID)
    
    //set the icon 
    skycons.set(iconID,Skycons[icon]);

    skycons.play()

}