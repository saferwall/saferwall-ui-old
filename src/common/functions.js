import { avgList } from '@/common/data/avg'

/**
 * Check if name in the list of avg
 * @param {String} name 
 * @returns {Boolean}
 */
export function isAnAVG(name) {
    return avgList.find(avg => avg.toLowerCase() === name.toLowerCase()) !== undefined;
}