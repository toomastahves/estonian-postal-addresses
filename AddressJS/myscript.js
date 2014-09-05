
var counter = 0;
var availableTags = [];

function loadXMLDoc() {
    var search_string = document.getElementById("search_address").value.replace(/^\s*/, "").replace(/\s*$/, "");
    search_string = escape(search_string);
    document.getElementById('address_results').style.display = 'block';
    var xgisurl = "http://xgis.maaamet.ee/xGIS/XGis?app_id=ADSAVALIK&user_id=at";
    var checked_elements = 'EHAK,TANAV,VAIKEKOHT,EHITISHOONE';
    var res_cnt = 10;
    if (!search_string) {
        clearResults();
        return;
    }
    counter++;
    var final_url = xgisurl + "&dogis_link=getgazetteer&address=" + search_string + "&features=" + checked_elements + "&results=" + res_cnt + "&check=" + counter;

    var a = document.createElement("script");
    a.setAttribute("src", final_url);
    document.getElementsByTagName("head")[0].appendChild(a);
}

function close() {
    document.getElementById("address_results").style.display = "none";
}

function clearResults() {
    document.getElementById("no_results").style.display = "none";
    for (var i = document.getElementById("results_list").childNodes.length - 1; i >= 0; i--) {
        document.getElementById("results_list").removeChild(document.getElementById("results_list").childNodes[i]);
    }
}

function parseRequest(results, count) {
    if (count != counter) {
        return;
    }
    clearResults();
    if (!results || !results.featureMember) {
        document.getElementById("no_results").style.display = "block";
        return;
    }
    if (!results.featureMember.length) {
        for (var e in results.featureMember) {
            var d = document.createElement("div");
            d.innerHTML = '<a href="javascript:pickAddress(\'' + results.featureMember[e].PikkAadress + '\')">' + results.featureMember[e].PikkAadress + '</a>';
            document.getElementById("results_list").appendChild(d);
            availableTags.push(results.featureMember[e].PikkAadress);
        }
        return;
    }
    for (var c = 0; c < results.featureMember.length; c++) {
        for (var e in results.featureMember[c]) {
            var d = document.createElement("div");
            d.innerHTML = '<a href="javascript:pickAddress(\'' + results.featureMember[c][e].PikkAadress + '\')">' + results.featureMember[c][e].PikkAadress + '</a>';
            document.getElementById("results_list").appendChild(d);
            availableTags.push(results.featureMember[c][e].PikkAadress);
        }
    }
}

function pickAddress(picked_address) {
    document.getElementById("address_results").style.display = "none";
    document.getElementById("search_address").value = picked_address;
}
