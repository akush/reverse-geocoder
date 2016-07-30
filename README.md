# reverse-geocoder

To use it,

```sh
$ npm start
```

It will return address, area, city, state. For example,
```sh
$ curl -H 'Authorization: authKey' 'http://localhost:8080/?lat=28.3877077&lng=77.0515903'
```
will return
```json
{
 "address": "Sohna - Gurgaon Rd, Sector 68, Gurgaon, Haryana 122103, India",
 "area": "Sector 68",
 "city": "Gurgaon",
 "state": "Haryana"
}
```

To get the authKey, register at google developer console and enable Maps API and finally note the auth key.
