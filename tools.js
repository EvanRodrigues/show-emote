const showEmote = () => {
    //TODO: Initialize emotes, and get image from an emotes array.

    $("#emote").attr("src", "./foo.png");
    $("#emote").fadeIn(fade);

    setTimeout(() => {
        $("#emote").fadeOut(fade);
    }, display);
};

/*
 * Displays the emote and plays audio.
 * After sound is played, emote gets removed from display.
 */
function show_emote(emote, code_index) {
    if (emote.art != null) $("#emote").attr("src", emote.art);
    else {
        const target_emote = all_emotes.filter(
            (e) =>
                e.codes == emote.codes[code_index] ||
                emoteRegex(emote.codes[code_index], e.codes)
        );
        $("#emote").attr("src", "https:" + target_emote[0].art);
    }

    $("#emote").fadeIn(500);
    play_audio(pick_audio(emote.audio));
}
