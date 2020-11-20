/*
 * Initialize emotes
 */
let all_emotes = new Array();
let userId,
    twitch_global,
    twitch_subscriber,
    ffz_emotes,
    ffz_global,
    bttv_emotes,
    bttv_global;
getUserId();
getTwitchEmotes(0); //Global emotes id = 0
GetFfzEmotes(channel);

/*
 * Get the user id from twitch
 * v3 of the bttv api requires a channel id instead of the channel name.
 */
function getUserId() {
    const url = `https://id.twitch.tv/oauth2/validate`;
    const oauthPassword = password.split(":")[1]; //gets oauth pw from global password

    fetch(url, {
        headers: {
            Authorization: `OAuth ${oauthPassword}`,
        },
    })
        .then((response) => response.json())
        .then((json) => {
            userId = json["user_id"];
            GetBttvEmotes(userId);
            getTwitchEmotes(userId);
        });
}

/*
 * Gets the twitch emote img from twitch api.
 * Input: id of twitch emote.
 */
function TwitchEmoteUrl(id) {
    return "//static-cdn.jtvnw.net/emoticons/v1/" + id + "/3.0";
}

function emoteRegex(code, expression) {
    const regex = RegExp(expression);
    return regex.test(code);
}

const removeEscape = (code) => {
    if (code.indexOf("\\&gt\\;") != -1) {
        code = code.replace("\\&gt\\;", ">");
    } else if (code.indexOf("\\&lt\\;") != -1) {
        code = code.replace("\\&lt\\;", "<");
    }

    return code;
};

function getTwitchEmotes(channelId) {
    const url = `https://api.twitchemotes.com/api/v4/channels/${channelId}`; //Credit to twitchemotes.com

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            const emotes = json["emotes"];

            if (channelId == 0) {
                twitch_global = emotes.map(
                    (e) =>
                        new Emote(
                            removeEscape(e["code"]),
                            TwitchEmoteUrl(e["id"])
                        )
                );
            } else {
                twitch_subscriber = emotes.map(
                    (e) => new Emote(e["code"], TwitchEmoteUrl(e["id"]))
                );
            }
        });
}

/*
 * BTTV format for image and gif urls
 */
function BttvEmoteURL(id) {
    return "cdn.betterttv.net/emote/" + id + "/3x";
}

/*
 * Get id then get emote
 */
async function GetBttvEmotes(userId) {
    const url = `https://api.betterttv.net/3/cached/users/twitch/${userId}`;
    const global_url = "https://api.betterttv.net/3/cached/emotes/global";

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            const channelEmotes = json["channelEmotes"];
            const sharedEmotes = json["sharedEmotes"];
            const emotes = channelEmotes.concat(sharedEmotes);

            bttv_emotes = emotes.map(
                (emote) => new Emote(emote["code"], BttvEmoteURL(emote["id"]))
            );
        });

    fetch(global_url)
        .then((response) => response.json())
        .then((json) => {
            bttv_global = json.map(
                (emote) => new Emote(emote["code"], BttvEmoteURL(emote["id"]))
            );
        });
}

/*
 * Gets highest resolution available url for each ffz emote.
 */
function GetResolution(emote) {
    if (emote["urls"][4] != null) return emote["urls"][4];
    else if (emote["urls"][2] != null) return emote["urls"][2];
    else return emote["urls"][1];
}

function GetFfzEmotes(channel) {
    const url = "https://api.frankerfacez.com/v1/room/" + channel;
    const global_url = "https://api.frankerfacez.com/v1/set/global";

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            const id = json["room"]["set"];
            const emotes = json["sets"][id]["emoticons"];
            ffz_emotes = emotes.map(
                (emote) => new Emote(emote["name"], GetResolution(emote))
            );
        });

    fetch(global_url)
        .then((response) => response.json())
        .then((json) => {
            const set_id = json["default_sets"][0];
            const emotes = json["sets"][set_id]["emoticons"];
            ffz_global = emotes.map(
                (emote) => new Emote(emote["name"], GetResolution(emote))
            );
        });
}

const combineEmotes = () => {
    if (all_emotes.length == 0) {
        //combine every emote list
        all_emotes = twitch_global.concat(
            twitch_subscriber,
            ffz_emotes,
            ffz_global,
            bttv_emotes,
            bttv_global
        );
    }
};

/*
 * Places emote on a random spot on the screen.
 */
const placeEmote = () => {
    const left = Math.random() * (1850 - 75) + 75;
    const top = Math.random() * (1030 - 50) + 50;

    $("#emote").css("top", `${top}px`);
    $("#emote").css("left", `${left}px`);
};

/*
 * Shows the emote on the page
 */
const showEmote = (emote) => {
    if (!emote) return false;

    $("#emote").attr("src", `https:${emote}`);
    placeEmote();
    $("#emote").fadeIn(fade);

    setTimeout(() => {
        $("#emote").fadeOut(fade);
    }, display);

    return true;
};

const matchEmote = (emoteCode) => {
    if (!emoteCode) return null;

    for (let i = 0; i < all_emotes.length; i++) {
        if (emoteCode === all_emotes[i].code) return all_emotes[i].art;
    }

    for (let i = 0; i < all_emotes.length; i++) {
        const regex = RegExp(all_emotes[i].code);
        if (regex.test(emoteCode)) return all_emotes[i].art;
    }

    return null;
};

const getEmote = (message) => {
    const messageParts = message.split(" ");
    return messageParts.length >= 2 ? messageParts[1] : null;
};
