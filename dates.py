import sqlite3
import datetime

#script to create table of Dates to find exchange rate for any 2 currencies at some date
#USED FOR GRAPH

#in memory database, maybe make a file
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

#create table of only dates, null values for rest
def createTable():
	cursor.execute('''DROP TABLE IF EXISTS "Dates";''')
	cursor.execute("""CREATE TABLE Dates
					(
					day date primary key,
					base text,
					target text,
					rate real
					);""")

	today = datetime.datetime.today().strftime("%Y-%m-%d")
	dates = [("2012-01-01"), ("2012-06-01"), ("2012-12-01"), ("2013-01-01"), ("2013-06-01"), ("2013-12-01"),
		("2014-01-01"), ("2014-06-01"), ("2014-12-01"), ("2015-01-01"), ("2015-06-01"), ("2015-12-01"),
		("2016-01-01"), ("2016-06-01"), ("2016-12-01"), ("2017-01-01"), ("2017-06-01"), (today)]

	for i in dates:
		cursor.execute("INSERT INTO Dates VALUES(?, NULL, NULL, NULL)", (i,))
	return;

def createYearTable():
	cursor.execute('''DROP TABLE IF EXISTS "Past12Months"''')
	cursor.execute("""CREATE TABLE Past12Months
					(
					day date primary key,
					base text,
					target text,
					rate real
					);""")

	today = datetime.datetime.today().replace(day=1)
	dates = [(today.strftime("%Y-%m-%d")),
			((today-datetime.timedelta(30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(2*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(3*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(4*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(5*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(6*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(7*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(8*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(9*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(10*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(11*30)).replace(day=1)).strftime("%Y-%m-%d"),
			((today-datetime.timedelta(12*30)).replace(day=1)).strftime("%Y-%m-%d")]

	for i in dates:
		cursor.execute("INSERT INTO Past12Months VALUES(?, NULL, NULL, NULL)", (i,))


#insert desired base and target currencies and xchange rate
def updateTable(base, target, rate):
	query = """UPDATE Past12Months
				SET base = (?), target = (?), rate = (?)"""
	cursor.execute(query, [base, target, rate])
	return;

def updateTable2(base, target, rate):
	query = """UPDATE Dates
				SET base = (?), target = (?)"""
	cursor.execute(query, [base, target])


#returns array of dates for x-axis, and array of xchange rates to be plotted
def tableToGraph():
	query = """SELECT day, rate FROM Past12Months
				GROUP BY day
				ORDER BY day asc"""
	values = cursor.execute(query).fetchall()
	dates = []
	rates = []
	for i in values:
		dates.append(i[0])
		rates.append(i[1])
	return dates, rates

def main():
	base = "USD"
	target = "CAN"
	rate = 1
	createYearTable();
	updateTable(base, target, rate)
	print(tableToGraph());


if __name__ == '__main__':
	main()


