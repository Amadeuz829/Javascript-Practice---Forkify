import { TIME_OUT_SEC, URL_API } from "./config.js";
import { setTimeout } from "core-js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const wait = async function (sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000))
};

export async function GetJson(id) {
    try {
        const res = await Promise.race([fetch(`${URL_API}/${id}`), timeout(TIME_OUT_SEC)]);
        const data = await res.json()

        if (!res.ok) throw new Error(data.message)
        return data
    } catch (err) {
        throw err
    }
}
export async function SendJson(url, uploadData) {
    try {
        const promise = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)

        })
        const res = await Promise.race([promise, timeout(TIME_OUT_SEC)]);
        const data = await res.json()

        if (!res.ok) throw new Error(data.message)
        return data
    } catch (err) {
        throw err
    }
}