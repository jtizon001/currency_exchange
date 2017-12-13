import sqlite3
import datetime
import foreXchange

#script to create table of Dates to find exchange rate for any 2 currencies at some date
#USED FOR GRAPH

#in memory database, make a file
#conn = sqlite3.connect(":memory:")
conn = sqlite3.connect("currencies.db")
cursor = conn.cursor()




#______________________________________THESE defs NOT USED__________________________________________

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

#insert desired base and target currencies and xchange rate
def update12MonthsTable(base, target, rate):
	query = """UPDATE Past12Months
				SET base = (?), target = (?), rate = (?)"""
	cursor.execute(query, [base, target, rate])
	return;

def update30DaysTable(base, target, rate):
	#query = """UPDATE Past30Days
	#			SET base = (?), target = (?), rate = (?)"""
	#cursor.execute(query, [base, target, rate])
	query = "INSERT INTO Past30Days(base, target, rate) VALUES(?, ?, ?)"
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




#__________________________________ONLY USED FROM HERE DOWN_________________________________



def create12MonthsTable():
	cursor.execute("""CREATE TABLE IF NOT EXISTS Past12Months
					(
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					day DATE,
					baseID INTEGER,
					targetID INTEGER,
					rate REAL,
					FOREIGN KEY(baseID) REFERENCES Currencies(id),
					FOREIGN KEY(targetID) REFERENCES Currencies(id)
					);""")


	currMonthDay1 = datetime.datetime.today().replace(day=1)
	#cursor.execute("INSERT INTO Past12Months VALUES(?, NULL, NULL, NULL)", (currMonthDay1.strftime("%m/%d/%Y"),))

	for i in range(0,12):
		currMonthDay1 = (currMonthDay1-datetime.timedelta(1)).replace(day=1)
		cursor.execute("INSERT INTO Past12Months(day) VALUES(?)", (currMonthDay1.strftime("%m/%d/%Y"),))

def create30DaysTable():
	cursor.execute("""CREATE TABLE IF NOT EXISTS Past30Days
					(
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					day DATE,
					baseID INTEGER,
					targetID INTEGER,
					rate REAL,
					FOREIGN KEY(baseID) REFERENCES Currencies(id),
					FOREIGN KEY(targetID) REFERENCES Currencies(id)
					);""")

	day = datetime.datetime.today()
	#cursor.execute("INSERT INTO Past30Days VALUES(?, NULL, NULL, NULL)", (day.strftime("%m/%d/%Y"), ))

	for i in range(0, 30):
		day = day-datetime.timedelta(1)
		cursor.execute("INSERT INTO Past30Days(day) VALUES(?)", (day.strftime("%m/%d/%Y"), ))


def createCTable():

	currencies = ['USD','EUR','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR', 'BTC']

	q = """CREATE TABLE IF NOT EXISTS Currencies
			(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT
			)"""

	cursor.execute(q)

	for c in currencies:
		cursor.execute("INSERT INTO Currencies('name') VALUES(?)", (c,))



def main():

	cursor.execute("""DROP TABLE IF EXISTS Past30Days""")
	cursor.execute("""DROP TABLE IF EXISTS Past12Months""")
	cursor.execute("""DROP TABLE IF EXISTS Curencies""")


	currencies = ['USD','EUR','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR', 'BTC']

	createCTable()
	create30DaysTable()
	create12MonthsTable()


	for c in currencies:

		base = cursor.execute("SELECT id FROM Currencies WHERE name LIKE (?)", ['%'+c+'%']).fetchall()[0][0]

		for c2 in currencies:
			if (c != c2):
				currMonthDay1 = datetime.datetime.today().replace(day=1)
				target = cursor.execute("SELECT id FROM Currencies WHERE name LIKE (?)", ['%'+c2+'%']).fetchall()[0][0]
				day = datetime.datetime.today()

				for i in range(0, 30):
					day = day-datetime.timedelta(1)
					cursor.execute("INSERT INTO Past30Days(day, baseID, targetID) VALUES(?,?,?)", (day.strftime("%m/%d/%Y"), base, target, ))
				for i in range(0,12):
					currMonthDay1 = (currMonthDay1-datetime.timedelta(1)).replace(day=1)
					cursor.execute("INSERT INTO Past12Months(day, baseID, targetID) VALUES(?, ?, ?)", (currMonthDay1.strftime("%m/%d/%Y"), base, target, ))




#	for c in currencies:
#
#		for c2 in currencies:
#			if (c == c2):
#				continue
#			else:
#				rate = foreXchange.convertAmount(c, c2, 1)
#				update30DaysTable(c, c2, rate)


#	q = """SELECT target, rate FROM Past30Days
#			WHERE base = 'USD'
#			GROUP BY target"""

#	print(cursor.execute(q).fetchall())




if __name__ == '__main__':
	main()
