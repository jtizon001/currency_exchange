$(document).ready(function() {

	// 2 arrays with currency rate info of certain time frame
	var currency1 = [10, 20, 30, 40, 50]
	var currency2 = [5, 20, 40, 55, 60]

	var x = ['2016-01-01', '2016-01-02', '2016-01-03', '2016-01-04', '2016-01-05']

	// Adds currency name to head of array
	currency1.unshift('currency1');
	currency2.unshift('currency2');

	x.unshift('x');

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

});