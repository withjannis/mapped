# mapped
This tool, mainly src/main.js is a client to to analyse instagram profile.

## usage
Insert it into the developer console in your browser opened at instagram.com.

before running the script, make sure you have changed the username to your instagram username.
```javascript
//insert username here
const username = "withjannis";
```

after running the script, copy your json results into your favorite editor.
```javascript
//copy your information
copy(fullData)
```

the result contains the following data
```json
//data removed
{
    "username": "",
    "userId": "",
    "related": {
        "followers": [
            {

			}
        ],
        "following": [
            {
			
			}
        ]
    },
    "relations": {
        "iDontFollowThemBack": [
        ],
        "theyDontFollowMeBack": [

        ],
        "mutuals": [

        ]
    }
}
```