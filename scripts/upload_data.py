import pyrebase

config = {
    # https://console.developers.google.com/apis/credentials?project=foundry-dev-192623
    "apiKey": "AIzaSyCDLDGEw6FFj2lJCc7jHA4tal7HIFr1220",
    "authDomain": "foundry-dev-192623.firebaseapp.com",
    "databaseURL": "https://foundry-dev-192623.firebaseio.com/",
    "storageBucket": "foundry-dev-192623.appspot.com",
    # https://console.firebase.google.com/project/foundry-dev-192623/settings/serviceaccounts/adminsdk
    "serviceAccount": "service-account-credentials.json"
}

firebase = pyrebase.initialize_app(config)

auth = firebase.auth()

# Get a reference to the database service
db = firebase.database()
users = db.child("users").get()
print(users.val())
