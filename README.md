### Task:
The task is to create a readux-react app that allows a user to search a list of test events with the following options:
 - gameId
 - provider
 - tpdid (device id) 
 
The app should consist of user input components for each of the searchable options and a list view.

The list view is to display a list of events sorted by their `createdAt` field. Each item in the list has a title and a body, the tile should be `event_name` or `state_name` and the body should be the `record`.

### Requirements:
1. The app has to be created with redux and react in javascript. Besides that, you are free to use any other libraries or tools you.
2. **Highlight the events** that are not verified
3. **Highlight each field** in json payload that is marked as invalid
4. Display the invalid field `reason` in the body.

### API Usage:

To get the data, you will need to hit the endpoint `react-test-backend.us-east-1.elasticbeanstalk.com/analytics-events`

All analytics events have some of the following properties

Field | Description
------|------------
**id** | The event's unique id.
gameId | The `gameId` of the event payload, is either `warhammer` or `photofinish` 
provider | The source of the event, is either `tpevents` or `adjust-callback`
tpdid | The device id. **This is the unique id that used to idenfiy the device.**
record | **the actually json payload of the event that you will display on the list.**
ts | The time server receive the events, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time).
verified | `true` if this record has been verified.
invalidFields | An array of json of the fields that are not verified.
createdAt | Creation date of the item, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time).
updatedAt | Recent update date of the item, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time).


For **example**, to get event by id: 

**Request** 

`/analytics-events/1340`

**Response**
```javascript
{
	"id": 1340,
	"gameId": "warhammer",
	"provider": "tpevents",
	"tpdid": "c8912260-75c6-4466-9256-29a0a21ebd14",
	"record": {
	  "batch_time_receipt": 1549305297938,
	  "device_tpdid": "c8912260-75c6-4466-9256-29a0a21ebd14",
	  "leaderboard_place": 5,
	  "lte_end_time": 1549321140,
	  "lte_name": "challenge_gain_power",
	  "lte_start_time": 1549234740,
	  "lte_type": "personal",
	  "points": 850,
	  "session_duration": "30196",
	  "session_id": "a8b3fb33feca40f6872372062b8670af",
	  "session_start_time_local": 1549305266834,
	  "session_start_time_server": 1549305263628,
	  "state_id": "523fca6edb28434ca939f40a20ea861d",
	  "state_name": "lte",
	  "state_time_local": 1549305297030,
	  "state_time_server": 1549305293824,
	  "state_variant": "10",
	  "state_version": 4,
	  "tier": -1,
	  "tpdb_key_primary": "523fca6edb28434ca939f40a20ea861d",
	  "tpdb_key_secondary": "10",
	  "tpdb_target": "lte_state",
	  "user_id": "101"
	},
	"ts": "2019-02-04T18:34:57.000Z",
	"verified": null,
	"invalidFields": [
		{
			"fieldName": "session_duration",
			"value": "30196",
			"reason": "Type mismatch, the value should be integer"
		},
		{
			"fieldName": "session_duration_focused",
			"value": null,
			"reason": "Missing fields"
		}
	],
	"createdAt": "2019-02-06T17:23:47.580Z",
	"updatedAt": "2019-02-06T17:23:47.580Z"
},
```

To get events by gameId, provider and tpdid:

**Request** 

`/analytics-events?gameId=warhammer&provider=tpevents&tpdid=c8912260-75c6-4466-9256-29a0a21ebd14&limit=5&skip=0`

**Response** 
```javascript
{
    "total": 100,
    "count": 5,
    "data": [
        {
            "id": 1361,
            "gameId": "warhammer",
            "provider": "tpevents",
            "tpdid": "c8912260-75c6-4466-9256-29a0a21ebd14",
            "record": {
                ...
            },
            "ts": "2019-02-04T18:35:04.000Z",
            "verified": null,
            "invalidFields": null,
            "createdAt": "2019-02-06T17:23:47.580Z",
            "updatedAt": "2019-02-06T17:23:47.580Z"
        },
        {
            "id": 1362,
            "gameId": "warhammer",
            "provider": "tpevents",
            "tpdid": "c8912260-75c6-4466-9256-29a0a21ebd14",
            "record": {
                ...
            },
            "ts": "2019-02-04T18:35:04.000Z",
            "verified": null,
            "invalidFields": null,
            "createdAt": "2019-02-06T17:23:47.580Z",
            "updatedAt": "2019-02-06T17:23:47.580Z"
        }
        ...
    ],
    "skip": 0
}
```

### Test:
Here are some sample ids you can use for the test.

GameId | Provider | Tpdid
------|-----------| ------
warhammer | tpevents | c8912260-75c6-4466-9256-29a0a21ebd14
warhammer | adjust-callback | e871c67a-e702-4d6b-be4c-4a2d5a0ae422
photofinish | tpevents | 004b0290-74f1-4ed9-ae10-8ebb21f8b387
photofinish | adjust-callback | 0ebb208d-77b7-4e0a-884f-67e628e46570
