# Settings.js

This is the file you will be customizing to set up your widget.

## Instructions

In the next section I have a template of a settings.js file that you would use to set up the application.

1. Create a settings.js file in the root directory of the application.
1. Copy in the template below.
1. Customize the time settings.
    - The cooldown_seconds variable is how long you would wait before another emote can be shown.
    - The display_seconds variable is how long the emote will be shown on screen
    - The fade_seconds variable is how long it will take for the emote to fade in and fade out.
1. Fill out the remaining blank settings.
    - The channel variable is the twitch channel you want the widget to connect to.
    - The bot_name variable is the account you will be using to connect to the chatroom. This can be a separate account or the account you are streaming with.
    - The password is your OAuth password that you generated or had previously. Make sure that the password is for the bot_name account and not a different account.

## Template

Here is a template you can use to get started with your settings.js file

```
const cooldown_seconds = 10;
const display_seconds = 7;
const fade_seconds = 0.5;

const channel = "YOUR CHANNEL HERE";
const bot_name = "YOUR BOT'S TWITCH ACCOUNT HERE";
const password = "YOUR OAUTH PASSWORD HERE";

const cooldown = cooldown_seconds * 1000;
const display = display_seconds * 1000;
const fade = fade_seconds * 1000;
```
