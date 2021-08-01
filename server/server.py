from flask import render_template, request, redirect, url_for, flash
import threading
import json
from Adafruit_IO import Client

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file
cred = credentials.Certificate('firebase-sdk.json')
 
# Initialize the app with a service account
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://doandanganh-68058-default-rtdb.firebaseio.com/'
})
 
 
 
ref = db.reference('/')


ADAFRUIT_IO_USERNAME = "MacoSavitar"
ADAFRUIT_IO_KEY = "aio_xxzv70gBaEp0D9DEhhxRwbOpYhTI"


# ADAFRUIT_IO_KEY = 'aio_ieyO306EGPxQmn7S23iE7p3jIG8O'
# ADAFRUIT_IO_USERNAME = 'CSE_BBC1'

aio = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

def get_last_relay_data():
    ref = db.reference('data_relay')
    relay_data=list(ref.get().values())[-1]
    # print(relay_data['status'])
    return relay_data
# get_last_relay_data()

# Turn volume of the speaker and send to ada server

def handleSpeaker(value):
    # print("Handle speaker..")
    FEED_NAME = 'bk-iot-speaker'
    speaker_data = {"id": "3", "name": "SPEAKER",
                    "data": "{}".format(value), "unit": ""}
    aio.send(FEED_NAME,
             json.dumps(speaker_data))
    # print("Done!!!")

# Get data from relay feed


def subcribe_relay():
    # print("Subcribing relay..")
    FEED_NAME = 'bk-iot-relay'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = json.loads(data)
    # data = convert(data)
    print(data)

    status = data['data']
    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    ref = db.reference('data_relay')
    ref.push(input_data)  # Store to firebase


# Get data from magnetic feed


def subcribe_magnetic():
    # print("Subcribing magnetic..")
    FEED_NAME = 'bk-iot-magnetic'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = data.replace("'", '"')
    data = json.loads(data)
    # data = convert(data)
    print(data)

    status = data['data']

    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    db.reference('request/magnetic').update({'status':input_data['status']})
    ref = db.reference('data_magnetic')
    ref.push(input_data)  # Store to firebase
    # print("Done!!!")

# Get data from gas feed


def subcribe_gas():
    # print("Subcribing gas..")
    FEED_NAME = 'bk-iot-gas'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = data.replace("'", '"')
    data = json.loads(data)

    print(data)

    status = data['data']

    input_data = {
        'time': timestamp_p,
        'status': status,
    }
    # print("Push to firebase", input_data)
    db.reference('request/gas_sensor').update({'status':input_data['status']})
    ref = db.reference('data_gas')
    ref.push(input_data)  # Store to firebase
    # print("Done!!!")

# Get data from speaker feed


def subcribe_speaker_gas():
    # print("Subcribing speaker..")
    FEED_NAME = 'bk-iot-speaker-gas'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = json.loads(data)

    print(data)

    value = data['data']

    input_data = {
        'time': timestamp_p,
        'status': value,
    }
    ref = db.reference('data_speaker_gas')
    ref.push(input_data)  # Store to firebase

def subcribe_speaker_magnetic():
    # print("Subcribing speaker..")
    FEED_NAME = 'bk-iot-speaker-magnetic'
    relay_server = aio.receive(FEED_NAME)

    timestamp_p = str(relay_server[1])
    data = relay_server[3]
    data = json.loads(data)

    print(data)

    value = data['data']

    input_data = {
        'time': timestamp_p,
        'status': value,
    }
    # print("Push to firebase", input_data)
    ref = db.reference('data_speaker_magnetic')
    ref.push(input_data)  # Store to firebase
    # print("Done!!!")


# Handle request of the app to turn on or off the relay: if on then system turn on else system turn off
def handle_relay():
    ref=db.reference('request/relay')
    rq_relay=ref.get()
    if rq_relay['status'] == 1:
        print('handle relay..')
        ref.update({'status':0})
        FEED_NAME = 'bk-iot-relay'
        data = 0
        if rq_relay['value'] == 'ON':
            data = 1
        else:
            data = 0
        relay_data = {"id": "11", "name": "RELAY",
                      "data": "{}".format(data), "unit": ""}
        aio.send(FEED_NAME,
                 json.dumps(relay_data))  # Send to ada server
        subcribe_relay()
def handle_magnetic_speaker():
    ref=db.reference('request/speaker_magnetic')
    rq_rmagnetic=ref.get()
    if rq_rmagnetic['status'] == 1:
        print('handle magnetic speaker..')
        ref.update({'status':0})
        FEED_NAME = 'bk-iot-speaker-magnetic'
        data = rq_rmagnetic['value']
        speaker_data = {"id": "11", "name": "SPEAKER",
                      "data": "{}".format(data), "unit": ""}
        aio.send(FEED_NAME,
                 json.dumps(speaker_data))  # Send to ada server
        subcribe_speaker_magnetic()
def handle_gas_speaker():
    ref=db.reference('request/speaker_gas')
    rq_rmagnetic=ref.get()
    if rq_rmagnetic['status'] == 1:
        print('handle gas speaker..')
        ref.update({'status':0})
        FEED_NAME = 'bk-iot-speaker-gas'
        data = rq_rmagnetic['value']
        speaker_data = {"id": "11", "name": "SPEAKER",
                      "data": "{}".format(data), "unit": ""}
        aio.send(FEED_NAME,
                 json.dumps(speaker_data))  # Send to ada server
        subcribe_speaker_gas()


# Get data from ada server


def get_data_from_server():

    REFRESH_TIME = 2.0
    threading.Timer(REFRESH_TIME, get_data_from_server).start()

    subcribe_relay()
    handle_relay()
    ref = db.reference('data_relay')
    magnetic_data=list(ref.get().values())[-1]
    relay_status = magnetic_data['status']
    if int(relay_status) == 1:
        handle_magnetic_speaker()
        handle_gas_speaker()
        subcribe_magnetic()
        subcribe_gas()
        subcribe_speaker_gas()
        subcribe_speaker_magnetic()



print('Server is running...')
get_data_from_server()
