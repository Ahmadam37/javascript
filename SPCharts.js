//<script language="javascript" src="/_layouts/15/SP.RequestExecutor.js" type="text/javascript"></script>
//<script language="javascript" src="/pwa/SiteAssets/elm-jquery-3.3.1.min.js" type="text/javascript"></script>
/* <script language="javascript" src="/pwa/SiteAssets/Amcharts/core.js" type="text/javascript"></script>
<script language="javascript" src="/pwa/SiteAssets/Amcharts/charts.js" type="text/javascript"></script>
<script language="javascript" src="/pwa/SiteAssets/Amcharts/themes/animated.js" type="text/javascript"></script>
*/

//<script type="text/javascript">

_spBodyOnLoadFunctionNames.push("DrawProductCounter");


var hostUrl;
var projectId;
var projectDataUrl;
var stageName;
var oDataResult;

// Create chart
var chart = am4core.createFromConfig({
    // Set inner radius
    "innerRadius": -15,
  
    // Add axis
    "xAxes": [{
      // Set axis type and settings
      "type": "ValueAxis",
      "min": 0,
      "max": 100,
      "strictMinMax": true,
  
      // Add axis ranges
      "axisRanges": [{
        "value": 0,
        "endValue": 50,
        "axisFill": {
          "fillOpacity": 1,
          "fill": "#67b7dc"
        }
      }, {
        "value": 50,
        "endValue": 80,
        "axisFill": {
          "fillOpacity": 1,
          "fill": "#6771dc"
        }
      }, {
        "value": 80,
        "endValue": 100,
        "axisFill": {
          "fillOpacity": 1,
          "fill": "#a367dc"
        }
      }]
    }],
  
    // Add hand
    "hands": [{
      "type": "ClockHand",
      "id": "h1"
    }]
  }, "divgauge", "GaugeChart");


function getQueryStringParameter(myParam) {

    if (document.URL.indexOf("?") > 0) {
        var params = document.URL.split("?")[1].split("&");
        
      
        
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            console.log(params[i]);

            console.log(singleParam[0]);
            console.log(singleParam[1]);

            if (singleParam[0].toLowerCase() == myParam.toLowerCase())
                return singleParam[1];
        }
    }

}

function DrawProductCounter(){

    //hostUrl = "http://nahj.elm.sa/pwa";
    
    hostUrl = _spPageContextInfo.siteAbsoluteUrl;
    console.log("hosturl is " + hostUrl);

    projectId = getQueryStringParameter("ProjUID");

    if (projectId != null) {

        console.log(projectId);

        projectDataUrl = hostUrl + "/_api/ProjectData/Projects(guid'" + projectId + "')";
        
        // Get Project Counter Data from list WF-Workflow Stage Tracking
       
        console.log(projectDataUrl);

        $(document).ready(function() {
        
            var executor = new SP.RequestExecutor(hostUrl);
        
            getProjectInfo(executor);
            
        });
       
    }
}

function getProjectInfo() {

    var dataStage = $.ajax({

        url: projectDataUrl,
        type: "GET",
        dataType: "json",
        headers: { Accept: "application/json;odata=verbose" }
    });

    dataStage.done(function(dataStage, txtStatusResponse, restResponse) {
        
        //stageName = dataStage.d.results[0].StageName; 
        var projectName = dataStage.d.ProjectName;

        var ProjectCalendarDuration = dataStage.d.ProjectCalendarDuration;

        console.log(ProjectCalendarDuration);

        console.log(projectName);
        var hand = chart.hands.getIndex(0);
        hand.showValue(ProjectCalendarDuration);
        // Get project stage information where stage status = 1 from StagesInfo
        //projectDataUrl = hostUrl + "/_api/web/lists/getByTitle('WF-Workflow Stage Tracking')/items?$filter=ProjectUID eq '" + projectId + "' and StageName eq '" + stageName + "'";

    });

}
 

//</script>
<button onclick="DrawProductCounter()" type="button">Click me</button>
<div id= "divgauge"></div>