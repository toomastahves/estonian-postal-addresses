// Init address search box in UI.
var searchAddressInput;
var searchResultsList;
var selectedSearchResult;

// Getting addresses from server.
function searchAddresses() {
    var searchString = $('#search_address_input1').val();
    var features = 'EHAK,TANAV,VAIKEKOHT,EHITISHOONE';
    var resultsCount = 10;
    var url = 'http://xgis.maaamet.ee/xGIS/XGis?app_id=ADSAVALIK&user_id=at&dogis_link=getgazetteer&address=' + searchString + '&features=' + features + '&results=' + resultsCount + '&callback=?';
    $.getJSON(url, null, function (results) {
        parseRequest(results)
    });
}

function parseRequest(results) {
    $('#search_results_list1').empty();
    if (!results.featureMember.length) {
        for (var e in results.featureMember) {
            $('#search_results_list1').append('<a href="javascript:pickAddress(\'' + results.featureMember[e].PikkAadress + '\')">' + results.featureMember[e].PikkAadress + '</a><br>');
        }
    }
    for (var c = 0; c < results.featureMember.length; c++) {
        for (var e in results.featureMember[c]) {
            $('#search_results_list1').append('<a href="javascript:pickAddress(\'' + results.featureMember[c][e].PikkAadress + '\')">' + results.featureMember[c][e].PikkAadress + '</a><br>');
        }
    }
}

function pickAddress(selectedAddress) {
    $('#search_address_result1').val(selectedAddress);
}

// Delaying function to fire request to server when user has stopped typing.
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
$('#search_address_input1').keyup(function () {
    delay(function () {
        searchAddresses();
    }, 1000);
});
