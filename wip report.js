/**
 * Project
 * 
 * Version  Date            Author           					Remarks
 * 1.00     5/31/16			Chris								Automated WIP report     		
 */



function main(request, response){	// initial function called as default function in script
	
	if(request.getMethod() == 'GET'){	// as script is run
	
		function1();
	}
	else{								// after submit
	
		function2();
	}
}

function function1(){
	
    // Set UI fields
    var form = nlapiCreateForm("WIP Report");  
    form.addField('datefield','date', 'From').setLayoutType('normal', 'startcol');
    form.addField('datefield2','date', 'To');
    form.addSubmitButton('Submit');
   
    response.writePage(form);
}
function function2(){
	
	// Searches
	
	
	// create unique list of projects
	var uniqList = getUniq(/*Project search results array*/);
	
	// create "hashmap" for each project, in the form of an array used to create windows
    	var w = window;
	for(var x = 0; x < uniqList.length; x++){
		
		w[uniqList[x]] = {
				internalID:__,
				projectID:__,
				projStatus:__,
				projName:__,
				compName:__,
				projType:__,
				custID:__,
				projSalesRep:__,
				projManager:__,
				projStart:__,
				projCreated:__,
				revAdjust:__,
				custAdjust:__,
				estimatedRev:__,
				estimatedCost:__,
				actualBilling:__,
				actualCost:__,
				actualEnd:__,
				subsidiary:__,
				loggedHours:__,
				trainingHours:__,
				notes:__,
		}
	}
	
	// loop through search results (1 for each type of search) to set data in to hashmap
	
	
	// print data in to html table
    html  = '<html>' +
    		'<head>' +
    			'<link rel="stylesheet" type="text/css" href="https://system.netsuite.com/core/media/media.nl?id=425588&c=811217&h=e19743fa68e87d972399&_xt=.css">' +
    			'<script src="http://code.jquery.com/jquery-1.5.1.min.js" type="text/javascript"></script>' +
    			'<script src="https://system.netsuite.com/core/media/media.nl?id=420986&c=811217&h=4117b836519d6a473b55&_xt=.js" type="text/javascript"></script>' +
    		'</head>' +
    		'<body>' +
    			'<table id = "myTable">' +
			    	'<tr id="myTRTitle">' +
			            '<td id="myTDTitleDatac">Internal ID</td>' +
			            '<td id="myTDTitleData">PROJ ID</td>' +
			            '<td id="myTDTitleData">PROJ Status @ time of report</td>' +
			            '<td id="myTDTitleData">PROJ Name</td>' +
			            '<td id="myTDTitleData">Company Name</td>' +
			            '<td id="myTDTitleData">PROJ Type</td>' +
			            '<td id="myTDTitleData">Customer ID</td>' +
			            '<td id="myTDTitleData">PROJ Sales Rep</td>' +
			            '<td id="myTDTitleData">PROJ Manager</td>' +
			            '<td id="myTDTitleData">PROJ Start date</td>' +
			            '<td id="myTDTitleData">PROJ Created date</td>' +
			            '<td id="myTDTitleData">Net Est. Rev Adjust (adjustments)</td>' +
			            '<td id="myTDTitleData">Net Est. Cost Adjust (adjustments)</td>' +
			            '<td id="myTDTitleData">Estimated Rev (from SO)</td>' +
			            '<td id="myTDTitleData">Estimated Cost (from SO)</td>' +
			            '<td id="myTDTitleData">ORIGINAL ESTIMATED GP (from SO)</td>' +
			            '<td id="myTDTitleData">Actual Billings to Date (Invoices)</td>' +
			            '<td id="myTDTitleData">Actual Cost to Date (vendor bills, inventory, other expenses)</td>' +
			            '<td id="myTDTitleData">ACTUAL (commissionable) GP</td>' +
			            '<td id="myTDTitleData">Estimated GP</td>' +
			            '<td id="myTDTitleData">% Complete</td>' +
			            '<td id="myTDTitleData">Earned Revenue</td>' +
			            '<td id="myTDTitleData">Actual GP to date</td>' +
			            '<td id="myTDTitleData">GP %</td>' +
			            '<td id="myTDTitleData">Net (Billings / Cost in Excess)</td>' +
			            '<td id="myTDTitleData">Cost in Excess</td>' +
			            '<td id="myTDTitleData">Billings in Excess</td>' +
			            '<td id="myTDTitleData">Backlog</td>' +
			            '<td id="myTDTitleData">Cost Activity after Month End?</td>' +
			            '<td id="myTDTitleData">Class</td>' +
			            '<td id="myTDTitleData">Actual End Date</td>' +
			            '<td id="myTDTitleData">Subsidiary</td>' +
			            '<td id="myTDTitleData">Logged Hrs</td>' +
			            '<td id="myTDTitleData">Training Hrs</td>' +
			            '<td id="myTDTitleData">Notes</td>' +
		            '</tr>';
	
    
    for(var x = 0; x < uniqList.length; x++){
    	
    	var origEstGP = (w[uniqList[x]].estimatedRev - w[uniqList[x]].revAdjust) - (w[uniqList[x]].estimatedCost - w[uniqList[x]].custAdjust);
    	var actualGP = w[uniqList[x]].actualBilling - w[uniqList[x]].actualCost;
    	var estGP = w[uniqList[x]].estimatedRev - w[uniqList[x]].estimatedCost;
    	var pctComplete = w[uniqList[x]].actualCost / w[uniqList[x]].estimatedCost;
    	var earnedRev = w[uniqList[x]].estimatedRev * pctComplete;
    	var actualGPtoDate = earnedRev - w[uniqList[x]].actualCost;
    	var pctGP = estGP / w[uniqList[x]].estimatedRev;
    	var net = earnedRev - w[uniqList[x]].actualBilling;
    	var backlog = w[uniqList[x]].estimatedRev - earnedRev;

    	if(net > 0){
    		
	    	var excess = net;
	    	var billingExcess = 0;
    
    	}else{
    		
    		var excess = 0;
    		var billingExcess = net;  	
    	}

    }
    
    html += 	'</table>' +
    '</body>' +
    '</html>';

   
	var form = nlapiCreateForm('WIP Report');
	
	var myInlineHtml = form.addField('custpage_btn', 'inlinehtml');
	myInlineHtml.setDefaultValue(html);
	
	response.writePage(form);
}

/*-------------------------------------------------------------------------------------------------
Function: getUniq()
Purpose:  Parse search results list and return unique names
-------------------------------------------------------------------------------------------------*/
function getUniq(searchResutls){
	
	var unsort = new Array();
	var sorted = new Array();
	
	for(var x = 0; x < searchResutls.length; x++){
		
		unsort = unsort.concat(searchResults[x].getValue('entityid'));
	}
	
	sorted = trim(unsort);
	sorted.sort();
	
	return sorted;
}

/*-------------------------------------------------------------------------------------------------
	Function: print()
	Purpose:  Execution logs
-------------------------------------------------------------------------------------------------*/
function print(name, value){
	
	var context        = nlapiGetContext();
	var usageRemaining = context.getRemainingUsage();
	nlapiLogExecution ('DEBUG', name + ' | ' + usageRemaining, value);
}

/*-------------------------------------------------------------------------------------------------
Function: trim(arr)
Purpose:  remove duplicates from array
-------------------------------------------------------------------------------------------------*/
function trim(arr){
	
	var i,
	len=arr.length,
	out=[],
	obj={};
	
	for (i=0;i<len;i++) {
		obj[arr[i]]=0;
	}
	
	for (i in obj) {
		out.push(i);
	}

	return out;
}
