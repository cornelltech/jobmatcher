import os
import csv

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


"""
Helper interface to handle the auth_user object
that we use in firebase for authentication
"""


def get_or_create_auth_user(email, password):
    try:
        user = auth.create_user_with_email_and_password(
            email, password
        )
    except Exception:
        user = auth.sign_in_with_email_and_password(
            email, password
        )
    return user


"""
In a perfect world, all four update_create
helper functions can be combined into one general one.
"""


def update_or_create_user(obj):
    # create an auth user object or login
    email = generate_netid_email(obj['netId'])

    auth_user = get_or_create_auth_user(email, obj['password'])

    # create a user obj or update the existing one
    user = None
    _key = None

    _users = db.child("users").get()

    for _user in _users.each() or []:
        _user_dict = _user.val()
        if _user_dict.get('uid', None) == auth_user['localId']:
            user = _user_dict
            _key = _user.key()
            break

    # Clean up the values
    obj.pop('password', None)
    obj['email'] = email
    obj['name'] = ' '.join([obj['firstName'], obj['lastName']])
    obj['uid'] = auth_user['localId']

    obj['permission'] = {
        'userType': 'student'
    }

    if _key is None:
        # we are creating
        _ref = db.child('users')
        res = _ref.push(obj)
        _key = res['name']
    else:
        # we are updating
        base_obj = user
        for key in obj:
            base_obj[key] = obj[key]

        _ref = db.child('users').child(_key)
        _ref.update(base_obj)

    return user, _key


def update_or_create_company(obj):

    company = None
    _key = None

    _companies = db.child('companies').get()
    for _company in _companies.each() or []:
        _company_dict = _company.val()
        if _company_dict.get('name', None) == obj['name']:
            company = _company_dict
            _key = _company.key()
            break

    if _key is None:
        _ref = db.child('companies')
        res = _ref.push(obj)
        _key = res['name']
    else:
        base_obj = company
        for key in obj:
            base_obj[key] = obj[key]

        _ref = db.child('companies').child(_key)
        _ref.update(base_obj)

    return company, _key


def update_or_create_recruiter(obj):
    auth_user = get_or_create_auth_user(obj['email'], obj['password'])

    # create a user obj or update the existing one
    user = None
    _key = None

    _users = db.child("users").get()
    for _user in _users.each() or []:
        _user_dict = _user.val()
        if _user_dict.get('uid', None) == auth_user['localId']:
            user = _user_dict
            _key = _user.key()
            break

    # we need a ref to the company
    company, company_ref = update_or_create_company({'name': obj['company']})

    # Clean up the values
    obj.pop('password', None)
    obj['name'] = ' '.join([obj['firstName'], obj['lastName']])
    obj['uid'] = auth_user['localId']

    obj['permission'] = {
        'userType': 'recruiter',
        'affiliation': company_ref
    }

    if _key is None:
        # we are creating
        _ref = db.child('users')
        res = _ref.push(obj)
        _key = res['name']
    else:
        # we are updating
        base_obj = user
        for key in obj:
            base_obj[key] = obj[key]

        _ref = db.child('users').child(_key)
        _ref.update(base_obj)

    return user, _key


def update_or_create_job(obj):
    # create a user obj or update the existing one
    job = None
    _key = None

    _jobs = db.child("jobs").get()
    for _job in _jobs.each() or []:
        _job_dict = _job.val()
        if _job_dict.get('title', None) == obj['title']:
            job = _job_dict
            _key = _job.key()
            break

    # we need a ref to the company
    company, company_ref = update_or_create_company({'name': obj['company']})

    # Clean up the values
    obj['company'] = company_ref

    if _key is None:
        # we are creating
        _ref = db.child('jobs')
        res = _ref.push(obj)
        _key = res['name']
    else:
        # we are updating
        base_obj = job
        for key in obj:
            base_obj[key] = obj[key]

        _ref = db.child('jobs').child(_key)
        _ref.update(base_obj)

    return job, _key

"""
In a perfect world, all three process csv file functions can be
combined into one general one since they do the same thing.
"""


def process_student_csv():
    _file = os.path.join(base_dir_path, 'student.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        update_or_create_user(obj)


def process_company_csv():
    _file = os.path.join(base_dir_path, 'company.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        update_or_create_company(obj)


def process_recruiter_csv():
    _file = os.path.join(base_dir_path, 'recruiter.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        update_or_create_recruiter(obj)


def process_jobs_csv():
    _file = os.path.join(base_dir_path, 'jobs.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        update_or_create_job(obj)


if __name__ == '__main__':
    print('--------------------')
    print('JobMatcher Uploader')
    print('\tEnsure there is a student.csv and '
          'recruiter.csv file in the same dir')

    process_student_csv()

    process_company_csv()

    process_recruiter_csv()

    process_jobs_csv()
