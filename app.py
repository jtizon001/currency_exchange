from flask import Flask, request, url_for, jsonify, json
from flask_restful import reqparse, abort, Api, Resource

import datetime
import foreXchange

app = Flask(__name__)

jsonExample = {"base":"USD","target":"CNY","amount":"100"}



@app.route('/getData', methods=['GET','POST'])
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
  
  
@app.route('/getHistory', methods=['GET','POST'])
def getHistory():
  if request.headers['Content-Type']=='application/json':
    historicArg=request.get_json()
    historyCurrBaseStr=historicArg['historyCurrBase'].upper()
    historyCurrTargetStr=historicArg['historyCurrTarget'].upper()
    historyDate=historicArg['date']

    x=foreXchange.getHistoric(historyCurrBaseStr,historyCurrTargetStr,historyDate)
    dicto={'rate':x}
    response=jsonify(dicto)
    return response
  
  
@app.route('/getGraphData', methods=['GET', 'POST'])
def getGraphData():
  if request.headers['Content-Type']=='application/json':
    graphArgs=request.get_json()
    graphBase=graphArgs['baseCurr']
    graphTarget=graphArgs['targetCurr']
    graphRange=graphArgs['range']
    rangeDict={}

    if(graphRange=='past12Months'):
      currMonthDay1=datetime.datetime.today().replace(day=1)
      for i in range(0,12):
        currMonthDay1=(currMonthDay1-datetime.timedelta(1)).replace(day=1)
        datestr=currMonthDay1.strftime("%m/%d/%Y")
        currentDict={currMonthDay1:[graphBase,graphTarget,datestr]}
        rangeDict.update(currentDict)


    dicto={'rate':rangeDict}
    response=jsonify(dicto)
    return response

# @app.route('/',methods=['GET','POST']) 
# def index():
#   x= open('static/index.html')
#   return x.read()

@app.route('/') 
def index():
  return app.send_static_file("index.html");


if __name__ == '__main__':
  app.run(debug=True)


# when testing use 
# curl -H "Content-Type: application/json" -X POST -d '{"base":"btc","target":"usd","amount":"100"}' http://localhost:5000/getData



