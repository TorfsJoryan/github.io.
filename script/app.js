'use strict';
var ismanga = false;

function GetGenre( Genre ){
  var xhttp = new XMLHttpRequest(),
  genre= document.querySelector('.Genre');

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(xhttp.responseText);
      genre.innerHTML = "";
      var input = result.data;
      for (var i = 0; i < input.length; i++) {
        if (i != 0) 
        {
          genre.innerHTML += ", " +result.data[i].attributes.name;
        }
        else {
          genre.innerHTML += result.data[i].attributes.name;
        }

      }
    }
  };
xhttp.open("GET", Genre, true);
xhttp.send();
}

function GetAnime( Name ) {
  var xhttp = new XMLHttpRequest(),
  resultHolder= document.querySelector('#resultHolder'),
  coverImage= document.querySelector('.coverImage'),
  posterImage= document.querySelector('.posterImage'),
  title= document.querySelector('.title'),
  synopsis= document.querySelector('.synopsis'),
  year= document.querySelector('.Year'),
  rating= document.querySelector('.Rating'),
  status= document.querySelector('.Status');


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(xhttp.responseText);
      coverImage.style.backgroundImage = 'url('+ result.data[0].attributes.coverImage.original + ')';
      posterImage.innerHTML = '<img src="'+result.data[0].attributes.posterImage.large +'" />';
      title.innerHTML = result.data[0].attributes.titles.en + " / " + result.data[0].attributes.titles.en_jp;
      synopsis.innerHTML = result.data[0].attributes.synopsis;
      year.innerHTML = result.data[0].attributes.startDate;
      rating.innerHTML = result.data[0].attributes.averageRating + "/100";
      status.innerHTML = result.data[0].attributes.status;
      GetGenre(result.data[0].relationships.genres.links.related);
    }
  };
  if(ismanga){
    xhttp.open("GET", 'https://kitsu.io/api/edge/manga?filter[text]='+ Name, true);
  }
  else {
    xhttp.open("GET", 'https://kitsu.io/api/edge/anime?filter[text]='+ Name, true);
  }
  xhttp.send();
}

function DarkMode() {
   var checkbox = document.querySelector('.DarkMode'),
   mainpage = document.querySelector('.mainPage'),
   form = document.querySelector('.form');
    checkbox.addEventListener('change', function (event) {
      if (checkbox.checked) {
        document.body.style.backgroundColor = "#282828";
        mainpage.style.color  = "rgba(255, 255, 255, 0.882)"; 
        form.style.color  = "rgba(255, 255, 255, 0.882)";
      } else {
        document.body.style.backgroundColor = "rgba(255, 255, 255, 0.882)"; 
        mainpage.style.color = "#282828";
        form.style.color  = "#282828";
        }
    });
}
function MangaorAnimePicker() {
   var checkbox = document.querySelector('.Manga');
   var locationInput = document.querySelector('#animeOrManga');
    checkbox.addEventListener('change', function (event) {
      if (checkbox.checked) {
        ismanga = true;
        if (locationInput) 
        {
          GetAnime(locationInput.value)
        }
      } else {
        ismanga = false;
         if (locationInput) 
        {
          GetAnime(locationInput.value)
        }
      }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  GetAnime("Fairy tail");
    var locationInput = document.querySelector('#animeOrManga');

     if (locationInput) {
        locationInput.addEventListener('input', function(e) {
            GetAnime(e.target.value);
        });
     }
     DarkMode();
     MangaorAnimePicker();
});