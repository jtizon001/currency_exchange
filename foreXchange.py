from forex_python.converter import CurrencyRates
from forex_python.bitcoin import BtcConverter

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





if __name__=='__main__':
	main()