import avgList from "./data/avg";
import Config from "../core/config";

import { createToast } from "mosha-vue-toastify";

/**
 * Check if name in the list of avg
 * @param {String} name 
 * @returns {Boolean}
 */
export function isAnAVG(name: string) {
    return avgList.find(avg => avg.toLowerCase() === name.toLowerCase()) !== undefined;
}

/**
 * Generate avatar url using username
 * 
 * @param {String} username 
 * @returns 
 */
export const generateAvatar = function (username: string): string {
    let avatarCdn = Config.value('avatarURL');
    return `${avatarCdn}${username}`
}

/**
 * Map tags objects to array 
 * 
 * @param {Object} tags 
 * @returns 
 */
export const mapTags = (tags: any): { name: string, avg: string }[] => {
    let tagkeys = Object.keys(tags || {});

    return tagkeys.reduce((final_tags: any, tagKey: string) => {
        let list = tags[tagKey] || [];

        if (!Array.isArray(list)) {
            list = [list];
        }

        return list.reduce((_list: any[], tag: string) => {
            _list.push({
                name: tag,
                avg: isAnAVG(tagKey),
            });
            return _list;
        }, final_tags);
    }, []);
}

/**
 * Catch auth throw and rethrow
 * 
 * @param {Error} e 
 */
export const catchAuthThrow = (message: string) => (e: any): void => {
    createToast(
        e.response.status == 401
            ? message
            : e.response.message,
        {
            type: "warning",
            position: "bottom-right",
        }
    );

    throw e;
}