import time
import json
from random import randint
from Adafruit_IO import MQTTClient, Feed, RequestError

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

# ADAFRUIT_IO_USERNAME = "CSE_BBC1"
# ADAFRUIT_IO_KEY = "aio_ieyO306EGPxQmn7S23iE7p3jIG8O"


ADAFRUIT_IO_USERNAME = "MacoSavitar"
ADAFRUIT_IO_KEY = "aio_xxzv70gBaEp0D9DEhhxRwbOpYhTI"

aio = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
aio.connect()


#Emulate gas sensor
def publish_gas():
    FEED_NAME = 'bk-iot-gas'
    data = randint(0, 100)
    if(data > 30):
        data = 1
    else:
        data = 0
    gas_data = {"id": "23", "name": "GAS",
                "data": "{}".format(data), "unit": ""}
    print(gas_data)
    #publish data to ada server
    aio.publish(FEED_NAME,
                json.dumps(gas_data))

#Emulate magnetic sensor
def publish_magnetic():
    FEED_NAME = 'bk-iot-magnetic'
    data = randint(0, 1)
    magnetic_data = {"id": "8", "name": "MAGNETIC",
                     "data": "{}".format(data), "unit": ""}
    print(magnetic_data)
    #publish data to ada server
    aio.publish(FEED_NAME,
                json.dumps(magnetic_data))

#Emulate speaker (to get fisrt data)=> don't enable
def publish_speaker_gas():
    FEED_NAME = 'bk-iot-speaker-gas'
    data = randint(0, 1023)
    speaker_data = {"id": "3", "name": "SPEAKER",
                    "data": "{}".format(data), "unit": ""}
    print(speaker_data)
    #publish data to ada server
    aio.publish(FEED_NAME,
                json.dumps(speaker_data))
def publish_speaker_magnetic():
    FEED_NAME = 'bk-iot-speaker-magnetic'
    data = randint(0, 1023)
    speaker_data = {"id": "3", "name": "SPEAKER",
                    "data": "{}".format(data), "unit": ""}
    print(speaker_data)
    #publish data to ada server
    aio.publish(FEED_NAME,
                json.dumps(speaker_data))

#Emulate relay (to get fisrt data)=> don't enable
def publish_relay():
    FEED_NAME = 'bk-iot-relay'
    data = randint(0, 1)
    relay_data = {"id": "11", "name": "RELAY",
                  "data": "{}".format(data), "unit": ""}
    print(relay_data)
    #publish data to ada server
    aio.publish(FEED_NAME,
                json.dumps(relay_data))


print("Publishing...")
while True:
    publish_relay();
    ref = db.reference('data_relay')
    present_status=list(ref.get().values())[-1]['status']
    if present_status=='1':               #If relay turn on then run sensor
        publish_gas()
        publish_magnetic()
        # publish_speaker_gas()
        # publish_speaker_magnetic()
    else:
        pass

    time.sleep(2.0)
