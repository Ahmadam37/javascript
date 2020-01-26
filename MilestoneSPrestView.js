	<!--<script language="javascript" type="text/javascript" src="/_layouts/15/sp.js"></script>-->
	<script language="javascript" type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
	<!--script language="javascript" type="text/javascript" src="/_layouts/15/sp.UI.dialog.js"></script-->
	<script language="javascript" type="text/javascript" src="/pwa/siteassets/jquery-2.2.4.min.js"></script>
	 
<script language="javascript" type="text/javascript">
   	//script v1.5
	 var hostweburl;
	var Projuid;

	$(document).ready(function () {
		
	hostweburl = _spPageContextInfo.siteAbsoluteUrl;
    	// Load the required SharePoint libraries.
    	// alert(hostweburl);
	Projuid = getQueryStringParameter("ProjUID");
		
		if (Projuid != null)
		{
			var executor = new SP.RequestExecutor(hostweburl);
    			execOperation(executor);
		}
	});
	
    // Function to execute basic operations.
    function execOperation() {

        	// Continue your program flow here.
		//Get ProjectUID from querystring
		
			var data= $.ajax({ 
		
			url: hostweburl + "/_api/ProjectData/Projects(guid'"+Projuid+"')/Tasks?$filter=TaskIsMilestone eq true&$Select=TaskName,TaskClientUniqueId,TaskFinishVariance,TaskPercentCompleted",
			type: "GET",
			dataType:"json",
			headers: {Accept:"application/json;odata=verbose"}
			});
		
		
			data.done(function(data,txtStatusResponse,restResponse){
				results = data.d.results;
				var txtContent = "";

				for(var i=0;i<results.length;i++)
				{
					var dataItem = results[i];
					
					txtContent += dataItem.TaskName.toString();
		  			txtContent += "--";
				}
				alert(txtContent);
			});
		
		
			data.fail(function(restResponse,txtStatusResponse,err){
				alert("Error retrieving project data:- " + restResponse.responseText + " - data could not be loaded");
			});	
    }
	
    // Function to retrieve a query string value.
    // For production purposes you may want to use
    // a library to handle the query string.
    function getQueryStringParameter(paramToRetrieve) {
        if(document.URL.indexOf("?") > 0)
		{
			var params = document.URL.split("?")[1].split("&");
				var strParams = "";
				for (var i = 0; i < params.length; i = i + 1) {
						var singleParam = params[i].split("=");
					if (singleParam[0].toLowerCase() == paramToRetrieve.toLowerCase())
					return singleParam[1];
				}
		}
    }
</script>