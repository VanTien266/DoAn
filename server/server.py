from flask import render_template, request, redirect, url_for, flash
import collections
import threading
import json
from Adafruit_IO import Client

from firebase import firebase

FirebaseConn = firebase.FirebaseApplication(
    'https://doandanganh-68058-default-rtdb.firebaseio.com/', None)


ADAFRUIT_IO_USERNAME = "MacoSavitar"
ADAFRUIT_IO_KEY = "aio_xxzv70gBaEp0D9DEhhxRwbOpYhTI"

REFRESH_TIME = 10.0

# ADAFRUIT_IO_KEY = 'aio_ieyO306EGPxQmn7S23iE7p3jIG8O'
# ADAFRUIT_IO_USERNAME = 'CSE_BBC1'

aio = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

#Convert Unicode type to String type
def convert(data):
    if isinstance(data, basestring):
        return str(data)
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data

#Turn volume of the speaker and send to ada server
def handleSpeaker(value):       
    # print("Handle speaker..")
    FEED_NAME = 'bk-iot-speaker'
    speaker_data = {"id": "3", "name": "SPEAKER",
                    "data": "{}".format(value), "unit": ""}
    aio.send(FEED_NAME,
             json.dumps(speaker_data))
    # print("Done!!!")

#Get data from relay feed
def subcribe_relay():
    # print("Subcribing relay..")
    FEED_NAME = 'bk-iot-relay'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = json.loads(data)
    data = convert(data)
    print(data)

    status = data['data']

    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    # print("Push to firebase", input_data)
    FirebaseConn.post('data_relay', input_data)     #Store to firebase
    # print("Done!!!")

#Get data from magnetic feed
def subcribe_magnetic():
    # print("Subcribing magnetic..")
    FEED_NAME = 'bk-iot-magnetic'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = data.replace("'", '"')
    data = json.loads(data)
    data = convert(data)
    print(data)

    status = data['data']
    #If sensor detected people then speaker is turn on with volume 700
    if int(status) == 1:
        handleSpeaker(700)
    else:
        handleSpeaker(0)

    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    FirebaseConn.post('data_magnetic', input_data)      #Store to firebase
    # print("Done!!!")

#Get data from gas feed
def subcribe_gas():
    # print("Subcribing gas..")
    FEED_NAME = 'bk-iot-gas'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = data.replace("'", '"')
    data = json.loads(data)

    data = convert(data)
    print(data)

    status = data['data']
        #If sensor detected people then speaker is turn on with volume 1000
    if int(status) == 1:
        handleSpeaker(1000)
    else:
        handleSpeaker(0)

    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    # print("Push to firebase", input_data)
    FirebaseConn.post('data_gas', input_data)       #Store to firebase
    # print("Done!!!")

#Get data from speaker feed
def subcribe_speaker():
    # print("Subcribing speaker..")
    FEED_NAME = 'bk-iot-speaker'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = json.loads(data)
    data = convert(data)
    print(data)

    value = data['data']

    input_data = {
        'time': timestamp_p,
        'status': value,
    }
    # print("Push to firebase", input_data)
    FirebaseConn.post('data_speaker', input_data)       #Store to firebase
    # print("Done!!!")

#Handle request of the app to turn on or off the relay: if on then system turn on else system turn off
def handle_relay():
    rq_relay = FirebaseConn.get('request/relay', None)
    if rq_relay['status'] == 1:
        print('handle relay..')
        FEED_NAME = 'bk-iot-relay'
        data = 0
        if rq_relay['value'] == 'ON':
            data = 1
        else:
            data = 0
        relay_data = {"id": "11", "name": "RELAY",
                      "data": "{}".format(data), "unit": ""}
        aio.send(FEED_NAME,
                 json.dumps(relay_data))                #Send to ada server
        FirebaseConn.put('request/relay', 'status', 0)  #Store to firebase

#Handle another request
def handle_request():
    pass

    # rq_magnetic = FirebaseConn.get('request/magnetic', None)
    # if rq_magnetic['status'] == 1:
    #     print('Handle magnetic..')
    #     FEED_NAME = 'bk-iot-magnetic'
    #     data = 0
    #     if rq_magnetic['value'] == 'ON':
    #         data = 1
    #     else:
    #         data = 0
    #     magnetic_data = {"id": "8", "name": "MAGNETIC",
    #                      "data": "{}".format(data), "unit": ""}
    #     aio.send(FEED_NAME,
    #              json.dumps(magnetic_data))
    #     FirebaseConn.put('request/magnetic', 'status', 0)
        # print('Set trang thai Cong tac xong')

    # rq_speaker = FirebaseConn.get('request/speaker', None)
    # if rq_speaker['status'] == 1:
    #     print('Handle spaker..')
    #     FEED_NAME = 'bk-iot-spaker'
    #     data = 0
    #     if rq_speaker['value'] == 'ON':
    #         data = 1000
    #     else:
    #         data = 0
    #     speaker_data = {"id": "3", "name": "SPEAKER",
    #                      "data": "{}".format(data), "unit": ""}
    #     aio.send(FEED_NAME,
    #              json.dumps(speaker_data))
    #     FirebaseConn.put('request/speaker', 'status', 0)
        # print('Set trang thai Cong tac xong')
    
    # rq_magnetic = FirebaseConn.get('request/magnetic', None)
    # if rq_magnetic['status'] == 1:
    #     print('Handle magnetic..')
    #     FEED_NAME = 'bk-iot-magnetic'
    #     data = 0
    #     if rq_magnetic['value'] == 'ON':
    #         data = 1
    #     else:
    #         data = 0
    #     magnetic_data = {"id": "8", "name": "MAGNETIC",
    #                      "data": "{}".format(data), "unit": ""}
    #     aio.send(FEED_NAME,
    #              json.dumps(magnetic_data))
    #     FirebaseConn.put('request/magnetic', 'status', 0)
        # print('Set trang thai Cong tac xong')

#Return the present status of the relay
def get_relay_status():
    relay_data = FirebaseConn.get('data_relay', None)
    relay_data = convert(relay_data)
    return relay_data.values()[-1]['status']

#Get data from ada server
def get_data_from_server():

    threading.Timer(REFRESH_TIME, get_data_from_server).start()

    subcribe_relay()
    handle_relay()
    relay_status=get_relay_status()
    if int(relay_status)==1:
        subcribe_magnetic()
        subcribe_speaker()
        subcribe_gas()

        # handle_request()


print('Server is running...')
get_data_from_server()
