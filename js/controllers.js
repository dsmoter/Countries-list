var appModule = angular.module('appModule', []);

appModule.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

appModule.filter('filtruj', function() {
  return function() {
    return;
  }
});

appModule.controller('CountriesCtrl', function($scope, $http) {

  // sort options

  $scope.selectData = {
    options: [
      { name: 'Ascending', reverse: false},
      { name: 'Descending', reverse: true}
    ],
    selectedOption: { name: 'Ascending', reverse: false}
  };

  $scope.allCountries = {
    "africa": {
      data: [],
      checked: false
    },
    "antarctica": {
      data: [],
      checked: false
    },
    "asia": {
      data: [],
      checked: false
    },
    "europe": {
      data: [],
      checked: false
    },
    "north america": {
      data: [],
      checked: false
    },
    "oceania": {
      data: [],
      checked: false
    },
    "south america": {
      data: [],
      checked: false
    }
  };

  $scope.allSelected = function(continent) {
    return $scope.allCountries[continent].data.every(function(itm){ return itm.checked;});
  }

  $scope.toggleContinent = function(continent, isAllSelected) {
    var toggleStatus = !isAllSelected;
    angular.forEach($scope.allCountries[continent].data, function(itm){itm.checked = toggleStatus;});
  }

  $scope.continentCheckbox = function(continent) {
    var allSelected = $scope.allSelected(continent);
    $scope.toggleContinent(continent, allSelected);
  }

  $scope.countryCheckbox = function(continent) {
    var allSelected = $scope.allSelected(continent);
    $scope.allCountries[continent].checked = allSelected;
  }

  $scope.parseCountries = function(data, continent) {
    var length = data.length;

    for(var i=0; i<length; i++) {
      data[i].checked = false;
      $scope.allCountries[continent].data.push(data[i]);
    }

  }

	$http.get('https://api.teleport.org/api/continents/geonames:AF/countries/').
		then(function(response) {
			var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'africa');

		}, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:AN/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'antarctica');
    }, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:AS/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'asia');

    }, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:EU/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'europe');
    }, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:NA/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'north america');

    }, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:OC/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'oceania');
    }, function(response) {
      console.err('Error during api consuming.')
  });

  $http.get('https://api.teleport.org/api/continents/geonames:SA/countries/').
    then(function(response) {
      var localCoutries = response.data._links['country:items'];

      $scope.parseCountries(localCoutries, 'south america');

    }, function(response) {
      console.err('Error during api consuming.')
  });
});