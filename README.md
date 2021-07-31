# gojek-api
unofficial nodejs gojek api

# Installing
using yarn
```bash
yarn add gojek-api
```
using npm 
```bash
npm i gojek-api
```

# Usage
using gojek api
```js
const { GojekApi } = require('gojek-api')
const gojekApi = new GojekApi()
```
set the authorization token before make call to mostly all gojek endpoint
```js
const token = "your_token_here" //without Bearer
gojekApi.setAuthHeader(token)
```

using gopay api
```js
const { GopayApi } = require('gojek-api')
const token = "your_token_here" //without Bearer
const gopayApi = new GopayApi(token)
```

