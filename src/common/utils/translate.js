export const KEYS_MAPS = [
    {
        regex: /Size/g,
        maps: [
            (bytes) => {
                return !isNaN(bytes) && formatSizeUnits(bytes) || bytes;
            }
        ]
    },
    {
        regex: /Version/g,
        maps: [
            (val) => {
                return `${val}`.match(/[0-9]{0,3}.[0-9]{0,3}/g) && `<pre>${val}</pre>` || val;
            }
        ]
    },
    {
        regex: /Mask|Entry|Point|CRC32/g,
        maps: [
            (val) => {
                return `${val}`.match(/0[xX][0-9a-fA-F]+/g) && `<pre>${val}</pre>` || val;
            }
        ]
    }
];

export function translateKey(key) {
    return (`${key}`.match(/[A-Z][a-z]+/g) || [key]).join(' ');
}

export function isoToCountry(iso) {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(iso);
}

export function translateValue(key, value) {
    let funcs = KEYS_MAPS.filter(m => {
        return (`${key}`.match(m.regex));
    }).reduce((_funcs, _cfuncs) => {
        let maps = _cfuncs.maps;
        return [..._funcs, ...(maps instanceof Array ? maps : [maps])];
    }, []);

    if (!funcs.length) return value;
    return funcs.reduce((val, _func) => _func(val), value);
}

export function formatSizeUnits(bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
}
