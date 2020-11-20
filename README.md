# show-emote

A twitch.tv widget that shows an emote on screen when given a command. I've seen a widget similar to this used on twitch and I wanted to see if I could replicate it.

## Features

-   Users can use the widget by using the !showemote command.
-   Can display the available emotes on your channel from the Twitch global, Better Twitch TTV, and FrankerFaceZ emotes you have added to your channel.
-   Places the emote at a random point on screen.
-   You can customize the duration and cooldown of the emote

## Installation

1. Download the code from this repository.
1. Get a [twitch chat OAuth password](https://twitchapps.com/tmi). Or if you have one already, use that.
1. Create a [settings.js](docs/settings.md) file.
1. Add the index.html file as a browser source for [OBS](https://obsproject.com/).

## Using the Widget

Once the widget is installed on OBS, you can start using the !showemote command in your twitch chat. The command is formatted like this:

!showemote **[CASE SENSITIVE EMOTE CODE GOES HERE]**

## Support

If you are having any issues with the application, feel free to submit an issue here on github and I will take a look at it when I am free.

## Future Plans

I'm not planning on updating this repository in the near feature besides the occasional bug fixes. However, I'd like to add this to the [Stream Tools](https://github.com/EvanRodrigues/stream-tools) platform that I have been developing. Any plans listed here will be done on that repository.

-   Add twitch prime, turbo, and other channel's subscriber emotes depending on the user's access to those.

-   Dynamically set the boundaries of the emote based on the image source's width. Some emotes get cut off because they are too wide.
