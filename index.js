require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const queryStrings = require('query-string');

const { createEventAdapter } = require('@slack/events-api');

const constants = require('./src/constants');

const { authRedirectHandler } = require('./src/auth');
const { errorEvent, messageEvent } = require('./src/events');
const { actionsHandler, optionsHandler, commandsHandler } = require('./src/handlers');
const { verifySignatureMiddleware } = require('./src/middleware');

const { PORT, SIGNING_SECRET } = process.env

const slackEvents = createEventAdapter(SIGNING_SECRET, { includeBody: true });

const app = express();

app.use(['/actions', '/commands', '/options'], bodyParser.raw({ type: '*/*' }), verifySignatureMiddleware);

app.use('/events', slackEvents.expressMiddleware());

app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT);
});

app.get('/test', (req, res) => {
    console.log('Server Test');
    res.send(`OK - Server up and  Running '${req.url}'`);
});

app.get('/', (req, res) => {
    const { APP_SCOPE: scope, CLIENT_ID: client_id } = process.env;
    const query = queryStrings.stringify({ client_id, scope });
    res.redirect(`${constants.server.OAUTH_AUTHORIZE}?${query}`);
});

app.get('/auth/redirect', authRedirectHandler);

app.post('/actions', actionsHandler)

app.post('/commands', commandsHandler);

app.post('/options', optionsHandler);

// Slack Incoming Events

slackEvents.on('message', messageEvent);

slackEvents.on('error', errorEvent);
