import Config from "./config";

export const generateAvatar = function (username) {
    let avatarCdn = Config.value('avatarURL');
    return `${avatarCdn}${username}`
}

