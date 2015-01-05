
function searchEstonianAddresses(nameOfResultBox, id) {
    // Init UI elements for searching addresses.
    var selectedSearchResult = nameOfResultBox;

    var searchAddressInput = '#search_address_input' + id;
    var searchResultsList = '#search_results_list' + id;
    var addressPickingDiv = '#address_pick_div' + id;

    function appendSearchDiv() {
        $('#' + selectedSearchResult).after('<div id="address_pick_div' + id + '">Otsi aadressit: <input id="search_address_input' + id + '" type="text" /> <a id="close' + id + '" href="#">Sulge</a><div id="address_results' + id + '"><div id="search_results_list' + id + '"></div></div></div>');
        $(addressPickingDiv).hide();
    }
    appendSearchDiv();

    // Getting addresses from server.
    function searchAddresses() {
        var searchString = $(searchAddressInput).val();
        var features = 'EHAK,TANAV,VAIKEKOHT,EHITISHOONE';
        var resultsCount = 10;
        var url = 'http://xgis.maaamet.ee/xGIS/XGis?app_id=ADSAVALIK&user_id=at&dogis_link=getgazetteer&address=' + searchString + '&features=' + features + '&results=' + resultsCount + '&callback=?';
        $.getJSON(url, null, function (results) {
            parseRequest(results)
        });
    }

    function parseRequest(results) {
        $(searchResultsList).empty();
        if (!results.featureMember.length) {
            for (var e in results.featureMember) {
                $(searchResultsList).append('<a href="javascript:pickAddress(\'' + results.featureMember[e].PikkAadress + '\',\'' + selectedSearchResult + '\')">' + results.featureMember[e].PikkAadress + '</a><br>');
            }
        }
        for (var c = 0; c < results.featureMember.length; c++) {
            for (var e in results.featureMember[c]) {
                $(searchResultsList).append('<a href="javascript:pickAddress(\'' + results.featureMember[c][e].PikkAadress + '\',\'' + selectedSearchResult + '\')">' + results.featureMember[c][e].PikkAadress + '</a><br>');
            }
        }
    }

    window.pickAddress = function (selectedAddress, resultDivName) {
        $('#' + resultDivName).val(selectedAddress);
    }

    $('#close' + id).click(function () {
        $('#close' + id).parent().hide();
    });
    
    // Delaying function to fire request to server when user has stopped typing.
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    $(searchAddressInput).keyup(function () {
        delay(searchAddresses, 1000);
    });

    $('#' + selectedSearchResult).click(function () {
        $(addressPickingDiv).show();
    });

}

searchEstonianAddresses('search_address_result1', 1);
searchEstonianAddresses('search_address_result2', 2);