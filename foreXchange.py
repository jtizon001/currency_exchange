from forex_python.converter import CurrencyRates
from forex_python.bitcoin import BtcConverter
import datetime

c=CurrencyRates()
b=BtcConverter()

def main():
	base = input('base currency: ').upper()
	target = input('target currency: ').upper()

	amount= float(input('amount: '))

	rate4one=converter(base,target)

	rateSpecific= convertAmount(base, target, amount)

	total= rate4one*amount
	print (target+': '+str(total))
	return total



def converter (x,y):
	
	req = c.convert(x,y,1)
	print (req)
	#exrate = req['rates']
	#print (exrate)
	print (y + ': ' + str(req))
	return float(req)


def convertAmount(x,y,z):
	req=c.convert(x,y,z)
	print(req)

	print(y+': --'+str(req))
	return float(req)


def convertBit(x,y,z):
	if (x=='BTC'):
		req=b.get_latest_price(y)
		return (z*req)

	elif(y=='BTC'):
		req=b.convert_to_btc(z,x)
		return req

def getHistoric(x,y,z):
	#parse string
	z=z.split('/')
	z1=int(z[0])
	z2=int(z[1])
	z3=int(z[2])
	histDate=datetime.datetime(z3,z1,z2,3,0,0,0)
	if x=='BTC':
		req=b.convert_btc_to_cur_on(1,y,histDate)
	elif y=='BTC':
		req=b.convert_to_btc_on(1,x,histDate)
	else:
		req= float(c.get_rate(x,y,histDate))
	return req



if __name__=='__main__':
	main()
