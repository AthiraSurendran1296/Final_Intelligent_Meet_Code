var express    = require('express');       
var app        = express(); 
var fs         = require('fs');      
const jsonfile = require('jsonfile');       
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        
var router = express.Router();
    

/*function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}*/

/*let entry = {
			"start": {
				"dateTime": ""
			},

			"end": {
				"dateTime": ""
			},

			"description": "",

			"organiser": {
				"name": "",
				"psnumber": ""
			},
			
			"status": "1"
		};*/

router.get('/hello', function(req, res) {
	res.json({"message":"hello"});
});		

/* router.get('/currentDateTime', function(req, res) {
	var dateTime = new Date(Date.now()).toLocaleString();
	var dateTimeArr = dateTime.split(",");
	res.json({"date": dateTimeArr[0] ,"time": dateTimeArr[1].trim()});
	//res.json({"formatted date":formatDate(dateTime)});
});   


router.get('/status', function(req, res) {
	
	//var contents = fs.readFileSync("status.json");
	//var jsonContent = JSON.parse(contents);
	//res.json(jsonContent);
	
	var jsonContent = JSON.parse(contents);
	res.json(jsonContent);
	
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	
	if(minutes>=30) {min='30';} else {min='00';}
	
	var compStr = hours+":"+min;
	
	var contents = fs.readFileSync("meeting_details.json");
	var meetings = JSON.parse(contents).meetings;
	
	if(JSON.stringify(meetings).includes(compStr))
	{
		
		for(var i=0;i<meetings.length;i++)
		{
			if(meetings[i].start.dateTime.includes(compStr))
			{
				res.json(meetings[i]);
			}
		}
	}
	else
	{
		res.json({"status":"0"});
	}
});

router.get('/meetingDetails', function(req, res) {
	var content = fs.readFileSync("meeting_details.json");
	var jsonContent = JSON.parse(content);
	res.json(jsonContent);
});


app.post('/instantBook', function(req, res) {
	var dateTime = new Date(Date.now()).toLocaleString();
	var formattedDate = formatDate(dateTime);
	
	entry.start.dateTime = formattedDate+"T"+req.param('start')+":00.0000000";
	entry.end.dateTime = formattedDate+"T"+req.param('end')+":00.0000000";
	entry.description = req.param('description');
	entry.organiser.name = req.param('organiser');
	entry.organiser.psnumber = req.param('ps');
		
	var content = fs.readFileSync("meeting_details.json");
	var jsonContent = JSON.parse(content);
	jsonContent.meetings.push(entry);

	var jsonString = JSON.stringify(jsonContent);

	fs.writeFile('meeting_details.json', jsonString, function (err) {
	if (err) throw err;
	console.log('Meeting Saved To File');
	});

	res.json({"message":"Booking successfull"});

});

app.post('/cancelMeeting', function(req, res) {
	
	var content = fs.readFileSync("meeting_details.json");
	var jsonContent = JSON.parse(content);
	var postedStart = req.param('start');

	for( var i = 0; i < jsonContent.meetings.length; i++)
	{ 
		if ( jsonContent.meetings[i].start.dateTime.includes(postedStart)) 
		{
			jsonContent.meetings.splice(i, 1); 
		}
	}
	
	fs.writeFile('meeting_details.json', JSON.stringify(jsonContent), function (err) {
	if (err) throw err;
	console.log('Meeting Cancelled From File');
	});

	res.json({"message":"Cancel successfull"});
});
*/


app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
