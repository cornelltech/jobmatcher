import os
import pyrebase

from dotenv import load_dotenv
from os.path import join, dirname

try:
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
except Exception as e:
    print("\nMissing .env file\n")

FIREBASE_API_KEY = os.environ.get('FIREBASE_API_KEY', None)

config = {
    # https://console.developers.google.com/apis/credentials?project=foundry-dev-192623
    "apiKey": FIREBASE_API_KEY,
    "authDomain": "foundry-dev-192623.firebaseapp.com",
    "databaseURL": "https://foundry-dev-192623.firebaseio.com/",
    "storageBucket": "foundry-dev-192623.appspot.com",
    # https://console.firebase.google.com/project/foundry-dev-192623/settings/serviceaccounts/adminsdk
    "serviceAccount": "service-account-credentials.json"
}

def create_job(title, company_id, description, location, requirements):
    data = {}
    data['title'] = title
    data['company'] = company_id
    data['description'] = description
    data['location'] = location
    data['requirements'] = requirements
    return data

def add_job(db, job):
    db.child('jobs').push(job)

if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    db = firebase.database()
    job = create_job('el prez', '-L5l3TP1ycq9ZMKZd-A8', 'presiding', 'washington, dc', 'visa3')
    add_job(db, job)

    users = db.child("jobs").get()
    print(users.val())
