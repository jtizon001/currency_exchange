import sqlite3
import datetime

#script to create table of Dates to find exchange rate for any 2 currencies at some date
#USED FOR GRAPH

#in memory database, make a file
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

#create table of only dates, null values for rest
def createPast5YearsTable():
	cursor.execute("""CREATE TABLE IF NOT EXISTS Past5Years
					(
					day DATE PRIMARY KEY,
					base TEXT,
					target TEXT,
					rate REAL,
					);""")

	today = (datetime.datetime.today().replace(day=1)).strftime("%Y-%m-%d")
	dates = [("2012-01-01"), ("2012-05-01"), ("2012-09-01"), ("2013-01-01"), ("2013-05-01"), ("2013-09-01"),
		("2014-01-01"), ("2014-05-01"), ("2014-09-01"), ("2015-01-01"), ("2015-05-01"), ("2015-09-01"),
		("2016-01-01"), ("2016-05-01"), ("2016-09-01"), ("2017-01-01"), ("2017-05-01"), ("2017-09-01"), (today)]

	for i in dates:
		cursor.execute("INSERT INTO Past5Years VALUES(?, NULL, NULL, NULL)", (i,))
	return;

def create12MonthsTable():
	cursor.execute("""CREATE TABLE IF NOT EXISTS Past12Months
					(
					day DATE PRIMARY KEY,
					base TEXT,
					target TEXT,
					rate REAL
					);""")


	currMonthDay1 = datetime.datetime.today().replace(day=1)
	cursor.execute("INSERT INTO Past12Months VALUES(?, NULL, NULL, NULL)", (currMonthDay1.strftime("%Y-%m-%d"),))

	for i in range(0,12):
		currMonthDay1 = (currMonthDay1-datetime.timedelta(1)).replace(day=1)
		cursor.execute("INSERT INTO Past12Months VALUES(?, NULL, NULL, NULL)", (currMonthDay1.strftime("%Y-%m-%d"),))

def create30DaysTable():
	cursor.execute("""CREATE TABLE IF NOT EXISTS Past30Days
					(
					day DATE PRIMARY KEY,
					base TEXT,
					target TEXT,
					rate REAL
					);""")

	day = datetime.datetime.today()
	cursor.execute("INSERT INTO Past30Days VALUES(?, NULL, NULL, NULL)", (day.strftime("%Y-%m-%d"), ))

	for i in range(0, 30):
		day = day-datetime.timedelta(1)
		cursor.execute("INSERT INTO Past30Days(day) VALUES(?)", (day.strftime("%Y-%m-%d"), ))


#insert desired base and target currencies and xchange rate
def update12MonthsTable(base, target, rate):
	query = """UPDATE Past12Months
				SET base = (?), target = (?), rate = (?)"""
	cursor.execute(query, [base, target, rate])
	return;

def update30DaysTable(base, target, rate):
	query = """UPDATE Past30Days
				SET base = (?), target = (?), rate = (?)"""
	cursor.execute(query, [base, target, rate])
	return;

def update5YearsTable(base, target, rate):
	query = """UPDATE Past5Years
				SET base = (?), target = (?), rate = (?)"""
	cursor.execute(query, [base, target, rate])
	return;

def updateTablev2(base, target, rate):
	query = """UPDATE Dates
				SET base = (?), target = (?)"""
	cursor.execute(query, [base, target])
	return;


#returns array of dates for x-axis, and array of xchange rates to be plotted
def tableToGraph():
	query = """SELECT day, rate FROM Past12Months
				WHERE base = (?), target = (?)
				GROUP BY day
				ORDER BY day ASC"""
	values = cursor.execute(query).fetchall()
	dates = []
	rates = []
	for i in values:
		dates.append(i[0])
		rates.append(i[1])
	return dates, rates

def main():
	#base = "USD"
	#target = "CAN"
	#rate = 1
	create12MonthsTable();
	update12MonthsTable(base, target, rate)
	print(tableToGraph(base, target));

if __name__ == '__main__':
	main()


