#About the project

We are creating an http server that controls cowsay from a client and a json file. When the query string is filled out in the client console, the text is added to the cow's speech bubble. In the json file, the value of the text is parsed into a string and added to the speech bubble.

The server responds with a header containing `Content-Type: text/plain`, a status code `200` and a response with the string `hello world`.

The GET request includes:
A key value `text=<message>`, a response header containing `Content-Type: text/plain`, status code `200`, and a body including value obtained from the querystring.

The POST request includes:
A key value `text=<message>`, a response header containing `Content-Type: text/plain`, status code `200`, and a body including value obtained from the querystring.

If the `json{text: messsage}` isn't set, server responds with an error code and body with value from bad pathname and status code = `400`;
