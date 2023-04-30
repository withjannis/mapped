# mapped
This tool, mainly src/main.js is a client to to analyse instagram profiles followers and followings.

## usage
Insert it into the developer console in your browser opened at instagram.com.

before running the script, make sure you have changed the username to your instagram username
```javascript
//insert username here
const username = "withjannis";
```

after running the script, copy your json results into your favorite editor
```javascript
//copy your information
copy(fullData)
```

the result contains the following json structure
```json
{
    "username": "",
    "userId": "",
    "related": {
        "followers": [
            {
                "id": "",
                "username": "",
                "fullName": "",
                "profilePicUrl": ""
			}
        ],
        "following": [
            {
                "id": "",
                "username": "",
                "fullName": "",
                "profilePicUrl": ""
			}
        ]
    },
    "relations": {
        "iDontFollowThemBack": [
            ""
        ],
        "theyDontFollowMeBack": [
            ""
        ],
        "mutuals": [
            ""
        ]
    }
}
```