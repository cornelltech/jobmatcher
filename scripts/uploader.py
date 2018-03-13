import os
import csv
import uuid

import pyrebase

from os.path import join, dirname
from dotenv import load_dotenv


try:
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
except Exception as e:
    print("\nMissing .env file\n")


base_dir_path = os.path.dirname(os.path.realpath(__file__))
credential_dir_path = os.path.join(base_dir_path, 'serviceAccountKey.json')

FIREBASE_API_KEY = os.environ.get('FIREBASE_API_KEY', None)
config = {
    # https://console.developers.google.com/apis/credentials?project=foundry-dev-192623
    "apiKey": FIREBASE_API_KEY,
    "authDomain": "foundry-dev-192623.firebaseapp.com",
    "databaseURL": "https://foundry-dev-192623.firebaseio.com/",
    "storageBucket": "foundry-dev-192623.appspot.com",
    # https://console.firebase.google.com/project/foundry-dev-192623/settings/serviceaccounts/adminsdk
    "serviceAccount": credential_dir_path
}
app = pyrebase.initialize_app(config)
auth = app.auth()
db = app.database()


def generate_invitation_email():
    pass


def generate_invitation_code():
    return str(uuid.uuid4())


def generate_netid_email(netid):
    return '{0}@cornell.edu'.format(netid)


def read_csv_file(filename):
    """Given a csv file with a header row,
    returns a list of dicts whose keys are the
    header rows maped onto their col value
    """
    with open(filename, 'r') as csvfile:
        objs = []
        reader = csv.reader(csvfile, delimiter=',')
        for i, row in enumerate(reader):
            if i == 0:
                header = row
                continue
            obj = {}
            for j, val in enumerate(row):
                obj[header[j]] = val
            objs.append(obj)
    return objs


def create_invitation():
    pass


def update_or_create_user(obj):
    # create an auth user object or login
    email = generate_netid_email(obj['netId'])

    try:
        auth_user = auth.create_user_with_email_and_password(
            email, obj['password']
        )
    except Exception as e:
        auth_user = auth.sign_in_with_email_and_password(
            email, obj['password']
        )

    # create a user obj or update the existing one
    user = None
    _key = None

    _users = db.child("users").get()
    for _user in _users.each():
        _user_dict = _user.val()
        if _user_dict.get('uid', None) == auth_user['localId']:
            user = _user_dict
            _key = _user.key()
            break

    # Clean up the values
    obj.pop('password', None)
    obj['email'] = email
    obj['uid'] = auth_user['localId']

    obj['permissions'] = {
        'userType': 'student'
    }

    if _key is None:
        # we are creating
        _ref = db.child('users')
        _ref.push(obj)
    else:
        # we are updating
        base_user = user
        for key in obj:
            base_user[key] = obj[key]

        _ref = db.child('users').child(_key)
        _ref.update(base_user)


def create_company():
    pass


def create_job():
    pass


def process_student_csv():
    _file = os.path.join(base_dir_path, 'student.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        update_or_create_user(obj)




def process_recruiter_csv():
    pass


def process_jobs_csv():
    pass


if __name__ == '__main__':
    print('--------------------')
    print('JobMatcher Uploader')
    print('\tEnsure there is a student.csv and '
          'recruiter.csv file in the same dir')

    process_student_csv()

    process_recruiter_csv()

    process_jobs_csv()
