from flask import Flask, request, url_for, jsonify, json
from flask_restful import reqparse, abort, Api, Resource

import foreXchange

app = Flask(__name__)

jsonExample = {"base":"USD","target":"CNY","amount":"100"}

@app.route('/getData', methods=['POST'])
def getData():
	if request.headers['Content-Type'] == 'application/json':
		forXargs=request.get_json()
		base=forXargs['base'].upper()
		print(base)
		target=forXargs['target'].upper()
		amount=int(forXargs['amount'])
		x=0
		if (base=="BTC" or target=="BTC"):
			x=foreXchange.convertBit(base,target,amount)
		else:
			x=foreXchange.convertAmount(base,target,amount)
		dicto={"rate":x}
		response=jsonify(dicto)
		return response

@app.route('/index',methods['GET','POST']) 
	def index():
		x= open('index.html')
		return x.read()


if __name__ == '__main__':
	app.run(debug=True)


# when testing use 
# curl -H "Content-Type: application/json" -X POST -d '{"base":"btc","target":"usd","amount":"100"}' http://localhost:5000/getData


# when testing use 
# curl -H "Content-Type: application/json" -X POST -d '{"base":"btc","target":"usd","amount":"100"}' http://localhost:5000/index
