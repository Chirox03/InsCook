import firebase_admin
from firebase_admin import credentials, firestore

# Initialize the app with a service account, granting admin privileges
cred = credentials.Certificate('nt208-eb27f-firebase-adminsdk-hiizy-aa33594b5b.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'nt208-eb27f.appspot.com'
})

db = firestore.client()