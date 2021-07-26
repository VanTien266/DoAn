import time
import collections
import json
from random import randint
from Adafruit_IO import MQTTClient, Feed, RequestError

from firebase import firebase

FirebaseConn = firebase.FirebaseApplication(
    'https://doandanganh-68058-default-rtdb.firebaseio.com/', None)

# ADAFRUIT_IO_USERNAME = "CSE_BBC1"
# ADAFRUIT_IO_KEY = "aio_ieyO306EGPxQmn7S23iE7p3jIG8O"


ADAFRUIT_IO_USERNAME = "MacoSavitar"
ADAFRUIT_IO_KEY = "aio_xxzv70gBaEp0D9DEhhxRwbOpYhTI"

aio = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
aio.connect()

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
def publish_speaker():
    FEED_NAME = 'bk-iot-speaker'
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
    relay_data = FirebaseConn.get('data_relay', None)   #get data from relay
    relay_data = convert(relay_data)
    if relay_data.values()[-1]['status']:               #If relay turn on then run sensor
        publish_gas()
        publish_magnetic()
        # publish_speaker()
    else:
        pass

    time.sleep(2.0)
