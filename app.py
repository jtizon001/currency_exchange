from flask import Flask, request, url_for, jsonify, json
from flask_restful import reqparse, abort, Api, Resource

import foreXchange

app = Flask(__name__)

jsonExample = {"base":"USD","target":"CNY","amount":"100"}

@app.route('/') #methods=['POST'])
def index():
	#return "hello work"
	x=str(foreXchange.convertAmount('USD','CNY',100))
	return jsonify({'exchange':x})
	#return  "Hello Worlbuilbd!"
	#if request.headers['Content-Type']=='applications/json':
	#	currArgs=request.get_json()
	#	argues=currArgs['currencies']
		# exchangCurr= foreXchange.convertAmount('USD','CNY',100) #run the other thing
		# dicto = {"Rates":exchangCurr}
		# print(dicto)
		# return dicto

		# response=jsonify(dicto)
		# return response


if __name__ == '__main__':
	app.run(debug=True)