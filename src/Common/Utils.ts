import * as path from 'path';
import * as fs from 'fs';
import * as pify from 'pify';
import { EXTENSION_FOLDER } from './Consts';

let existsAsync = pify(fs.access);
let mkdirAsync = pify(fs.mkdir);

export function resolveFileName(siteUrl: string): string {
    let url = removeSlashes(siteUrl);
    return `${url.replace(/[\:/\s]/g, '_')}.json`;
}

export function removeSlashes(url: string): string {
    if (!url) {
        return url;
    }

    return url.replace(/^\/+|\/+$/g, '');
}

export async function getUserDataFolder(): Promise<string> {
    let platform = process.platform;
    let homepath: string;

    if (platform.lastIndexOf('win') === 0) {
        homepath = process.env.APPDATA || process.env.LOCALAPPDATA;
    }

    if (platform === 'darwin') {
        homepath = process.env.HOME;
        homepath = path.join(homepath, 'Library', 'Preferences');
    }

    if (platform === 'linux') {
        homepath = process.env.HOME;
    }

    if (!homepath) {
        throw new Error('Couldn\'t find the base application data folder');
    }

    let dataPath = path.join(homepath, EXTENSION_FOLDER);

    let exists = await pathExists(dataPath);
    if (!exists) {
        await mkdirAsync(dataPath);
    }

    return dataPath;
}

export async function pathExists(path: string): Promise<boolean> {
    try {
        await existsAsync(path, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}
