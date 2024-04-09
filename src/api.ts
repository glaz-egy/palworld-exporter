import { log } from "console";
import { generateHeader } from "./header";

const BASE_URL = `http://${process.env.SERVER_RESTAPI_ADDRESS}:${process.env.SERVER_RESTAPI_PORT}/v1/api`;

async function fetchAPI(endpoint: string) {
    log(`[${new Date().toISOString()}] Connecting to ${endpoint}`);

    const headers = generateHeader();
    const response = await fetch(endpoint, { headers: headers })
    const json = await response.json();

    return json;
}

export interface Info {
    version: string;
    servername: string;
    description: string;
}

export interface Player {
    name: string;
    playerId: string;
    userId: string;
    ip: string;
    ping: number;
    location_x: number;
    location_y: number;
    level: number;
}

export interface Metrics {
    serverfps: number;
    currentplayernum: number;
    serverframetime: number;
    maxplayernum: number;
    uptime: number;
}

export interface Hub {
    temperature: number;
    humidity: number;
    lightLevel: number;
}

export interface Plug {
    power: "on" | "off";
    voltage: number;
    weight: number;
    electricityOfDay: number;
    electricCurrent: number;
}

export async function getServerInfo() {
    const endpoint = `${BASE_URL}/info`;
    const json = await fetchAPI(endpoint);

    return json;
}

export async function getServerMetrics() {
    const endpoint = `${BASE_URL}/metrics`;
    const json = await fetchAPI(endpoint);

    return json;
}

export async function getPlayer(): Promise<Player[]> {
    const endpoint = `${BASE_URL}/players`;
    const players = (await fetchAPI(endpoint)).players;

    return players;
}

