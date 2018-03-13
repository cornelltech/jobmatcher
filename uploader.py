import os
import csv

import firebase_admin
from firebase_admin import credentials

base_dir_path = os.path.dirname(os.path.realpath(__file__))
credential_dir_path = os.path.join(base_dir_path, 'serviceAccountKey.json')

cred = credentials.Certificate(credential_dir_path)
app = firebase_admin.initialize_app(cred)


student_list = []
recruiter_list = []
invitation_list = []


def generate_invitation_email():
    pass


def generate_invitation_code():
    pass


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
    return obj


def create_invitation():
    pass


def process_student_csv():
    pass


def process_recruiter_csv():
    pass


if __name__ == '__main__':
    print('JobMatcher Uploader')
    print('\tEnsure there is a student.csv and '
          'recruiter.csv file in the same dir')

    student_file = os.path.join(base_dir_path, 'student.csv')
    read_csv_file(student_file)
