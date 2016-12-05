var app = angular.module('ChallengeApp', []);
app.controller('moviesController', function($scope, $http) {
	
	var getMovies = function(page){
		$http.get("https://api.themoviedb.org/3/movie/upcoming?page="+page+"&api_key=c5850ed73901b8d268d0898a8a9d8bff")
		.then(function(response) {
			var results = response.data.results;
			
			if(angular.isUndefined($scope.listMovies)){
				$scope.listMovies = [];
			}
			
			while (results.length > 0){
				$scope.listMovies.push(results.splice(0, 4));
			}
			console.log(`arrays`, $scope.listMovies);
			$scope.page = page;
			$scope.totalPages = response.data.total_pages;
		});
	};
	
	getMovies(1);
	
	$scope.moreMovies = function(page){
		getMovies(page);
	};
	
	$scope.getCategoryName = function(categoryId){
		listGenres = $scope.listGenres;
		return function(listGenres, categoryId) {
			var i=0, len=$scope.listGenres.length;
			for (; i<len; i++) {
			  if (+$scope.listGenres[i].id == +categoryId) {
				return $scope.listGenres[i];
			  }
			}
			return null;
		}
	}
	
	//select all genres
	$http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c5850ed73901b8d268d0898a8a9d8bff&language=en-US")
    .then(function(response) {
        var results = response.data.genres;		
		$scope.listGenres = [];
		$scope.listGenres.push(results);
		console.log("listGenres",$scope.listGenres);
    });
	
	$scope.showMore = function(movie){
		movie.show = !movie.show;
		console.log(movie);
	};
});
