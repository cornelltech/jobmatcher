import os
import csv
import uuid

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

base_dir_path = os.path.dirname(os.path.realpath(__file__))
credential_dir_path = os.path.join(base_dir_path, 'serviceAccountKey.json')

cred = credentials.Certificate(credential_dir_path)
app = firebase_admin.initialize_app(cred)


def generate_invitation_email():
    pass


def generate_invitation_code():
    return uuid.uuid4()


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


def process_student_csv():
    _file = os.path.join(base_dir_path, 'student.csv')
    objs = read_csv_file(_file)

    for obj in objs:
        _ref = db.reference(path='/invitations', app=app)
        # obj['uuid'] = generate_invitation_code()

        # _ref.push(obj)


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
