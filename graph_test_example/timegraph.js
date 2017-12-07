$(document).ready(function() {

	// 2 arrays with dummy currency rate info of certain time frame
	// these 2 arrays should be returned by some database access call
	var currency1 = [10, 20, 30, 40, 50]
	var currency2 = [5, 20, 40, 55, 60]

	//array of dates corresponding to above currency rates
	var x = ['2016-01-01', '2016-01-02', '2016-01-03', '2016-01-04', '2016-01-05']

	// Needed for proper format of graph creation
	// Adds currency name to head of array
	currency1.unshift('currency1');  //currency1 = ['currency1', 10, 20, 30,...]
	currency2.unshift('currency2');  //currency2 = ['currency2', 5, 20, 40,...]

	x.unshift('x');  //x = ['x', '2016-01-01',....]

	var chart = c3.generate({

		// 'bindto' to specify which html element to add graph to
		bindto: '#chart',
		data: {
			x: 'x',
			columns: [x, currency1, currency2]
		},
		axis: {
			x: {
				type: 'timeseries'
			}
		}
	});
	
	// Not sure if necessary, just something extra
	$("#chart").append($("<button id='show'>Show (currency2)</button>"));
	$("#chart").append($("<button id='hide'>Hide (currency2)</button>"));
	document.getElementById('show').addEventListener('click', function() {
		chart.show(['currency2'])
	});
	document.getElementById('hide').addEventListener('click', function() {
		chart.hide(['currency2'])
	});

});
