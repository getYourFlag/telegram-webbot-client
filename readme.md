# Telegram Webbot Client

A client for using Telegram Bots without coding, don't know how to use Telegram Bots? This web client is for you!

[toc]

## Introduction

Telegram Bots are a great way to interact with normal Telegram user through automatic means. Traditionally, the API was created so that users with their own programs can parse the incoming messages and provide the responses without human intervention. However, telegram bots were also increasingly used as a alternative mean and a more private way to communicate with users and exchange information between the bot administrators and users. This web client facilitates the communication between bot administrators and users, and allow the operators to use the Telegram Bots as close as a dedicated Telegram account.

### Useful Situations

If you have the following demand, this client is for you:

* Communicate with other Telegram users, but wanted to keep your own Telegram account private.
* Need multiple accounts for outside communication.

### Limitations

Due to the nature of Telegram Bot API, this web client could not do the followings:

* Initiating a chat with Telegram users or entering a group. You could only send messages to a user after they had started conversation with a bot.
* Subscribing to a channel. Channel messages are only available if the bot is the channel's admin.
* Storing media in Telegram Cloud servers, bots only have a limited time of storage on the server (according to the official docs).

## Installation

You need to have node, npm and a web server of you choice (nginx is recommended) installed on the server before deploying the web client.

*1.* Clone the git repository and install dependencies

```javascript
git clone https://github.com/getYourFlag/telegram-webbot-client
cd telegram-webbot-client
npm install
```

*2.* Use CLI Tools to execute the backend server (e.g. forever)
*3.* Configure your web server to point to src/client/index.html
*4.* Enjoy!

## Todos

1. GUI Administrator Panel for adding / removing bots, users and webhooks.
2. Modify and delete messages.
3. A more customizable permission system.
