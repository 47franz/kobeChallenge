var app = angular.module('ChallengeApp', []);
app.controller('moviesController', function($scope, $http) {
  
  //select all genres
  $http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c5850ed73901b8d268d0898a8a9d8bff&language=en-US")
    .then(function(response) {
        var results = response.data.genres;    
    $scope.listGenres = [];
    $scope.listGenres.push(results);
    });
  
  //select a genre name
  var getCategoryName = function(categoryId){
    listGenres = $scope.listGenres[0];
    var i=0, len=listGenres.length;
    for (; i<len; i++) {
      if (+listGenres[i].id == +categoryId) {
      return listGenres[i];
      }
    }
  }
  
  //get 20 movies from API
  var getMovies = function(page){
    $http.get("https://api.themoviedb.org/3/movie/upcoming?page="+page+"&api_key=c5850ed73901b8d268d0898a8a9d8bff")
    .then(function(response) {
      var results = response.data.results;
      
	  //if the movies list is undefined start a movies list
      if(angular.isUndefined($scope.listMovies)){
        $scope.listMovies = [];
      }
      
	  //set the genre name on movie object
      results.map(function(value) {
        value.categoryNames = [];
          value.genre_ids.map(function(id){
           value.categoryNames.push(getCategoryName(id).name);
          });
      });
      
	  //divide movie list in minor arrays from exhibition in a bootstrap row
      while (results.length > 0){
        $scope.listMovies.push(results.splice(0, 4));
      }
	  
	  //set the current page and total pages
      $scope.page = page;
      $scope.totalPages = response.data.total_pages;
    });
  };
  
  //start movie list
  getMovies(1);
  
  $scope.moreMovies = function(page){
    getMovies(page);
  };
  
  //show more movies
  $scope.showMore = function(movie){
    movie.show = !movie.show;
  };
});
