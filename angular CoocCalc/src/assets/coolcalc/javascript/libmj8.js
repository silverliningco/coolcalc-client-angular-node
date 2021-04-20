/*  ----------------------------------------------------------------------------------------------------------------------------------------------

 libMJ8 is a small local library to initialize the CoolCalc MJ8 application.
 In most cases you should not make any changes here other than setting the correct values of the following first-level attributes:
     * sessionUserURL
     * APIDomain => normally "stagingapi.coolcalc.com" for staging, "api3.coolcalc.com" for production.
     * localDomain => typically "my-local-host" for development, "www.my-domain.com" for production.
     * MJ8AjaxURL
     * MJ8ReportURL

 ---------------------------------------------------------------------------------------------------------------------------------------------- */
 var libMJ8 = {

    sessionUserURL: "https://localhost:3000/coolcalc/user/",

    khipuConfigURL: "https://cdn.coolcalc.com/config/mj8/v-bootstrap/staging/khipu-js.json",

    APIDomain: "stagingapi.coolcalc.com",
    localDomain: "localhost:3000",

    APIClientEndpoint: "/coolcalc/client",

    MJ8AjaxURL: "/coolcalc/client/staging/mj8-reports.ashx",

    MJ8ReportURL: "/coolcalc/ui/mj8/v-bootstrap/staging/MJ8Report.html",

    mapTraceConfigURL: "https://cdn.coolcalc.com/config/map-trace/staging/map-trace.json",    

};

libMJ8.loadSessionUser = function(callback) {

    var http  = new XMLHttpRequest();
    http.open("GET", this.sessionUserURL, true);

    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            if (http.status == 200) {
                var myUserInfo = JSON.parse(http.responseText);
                if (callback) {
                    callback(myUserInfo);
                }
            } else {
                alert("Sorry, unable to start CoolCalc session.");
            }
        }
    }

    http.send();
}

libMJ8.landingPage = function(funFactory) {

    var myObj = this;

    var myConfig = {
        khipuConfigURL: this.khipuConfigURL,
        APIDomain: this.APIDomain,
        localDomain: this.localDomain,
        APIClientEndpoint: this.APIClientEndpoint,
        MJ8AjaxURL: this.MJ8AjaxURL,
        MJ8ReportURL: this.MJ8ReportURL,
        mapTraceConfigURL: this.mapTraceConfigURL,    
        SVGIconURL: this.SVGIconURL
    }

    function userInfoCallback(myUserInfo) {
        var myLandingResourceLink = coolcalc.hateoasLinkParam();
        if (myLandingResourceLink) {
            coolcalc.MJ8.loadLandingResource(myConfig, myUserInfo, funFactory, funFactory.startupCallback(), myLandingResourceLink);
        } else {
            coolcalc.MJ8.projectList(myConfig, myUserInfo, funFactory, funFactory.startupCallback());
        }
    }
    this.loadSessionUser(userInfoCallback);
}

libMJ8.projectList = function(funFactory) {

    var myObj = this;

    var myConfig = {
        khipuConfigURL: this.khipuConfigURL,
        APIDomain: this.APIDomain,
        localDomain: this.localDomain,
        APIClientEndpoint: this.APIClientEndpoint,
        MJ8AjaxURL: this.MJ8AjaxURL,
        MJ8ReportURL: this.MJ8ReportURL,
        mapTraceConfigURL: this.mapTraceConfigURL,    
        SVGIconURL: this.SVGIconURL
    }

    function userInfoCallback(myUserInfo) {
        coolcalc.MJ8.projectList(myConfig, myUserInfo, funFactory, funFactory.startupCallback());
    }
    this.loadSessionUser(userInfoCallback);
}

libMJ8.MJ8Report = function() {

    var restUI = new khipu({ DOMElementId: "mj8-report", CSS: {hiddenContent: "d-none"} }, null);

    var urlParams = coolcalc.getJsonFromUrl(location.href);
    var myURL = this.MJ8AjaxURL + "?reportId=" + encodeURIComponent(urlParams["report_id"]);

    var http  = new XMLHttpRequest();
    http.open("GET", myURL, true);
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var myReport = JSON.parse(http.responseText);
            coolcalc.renderMJ8Report(document.getElementById("mj8-report"), "", myReport, "MJ8Report", {}, restUI);
        }
    }
    http.send();

}


