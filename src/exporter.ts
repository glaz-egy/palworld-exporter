import { Gauge, collectDefaultMetrics, register } from "prom-client";
import { Info, Metrics, Player, getServerInfo, getServerMetrics, getPlayer } from "./api";

const currentplayernum = new Gauge({
    name: "palworld_server_current_player_num",
    help: "The number of current players",
    labelNames: ["version", "servername", "description"],
});

const serverfps = new Gauge({
    name: "palworld_server_fps",
    help: "The server FPS",
    labelNames: ["version", "servername", "description"],
});

const serverframetime = new Gauge({
    name: "palworld_server_frame_time",
    help: "Server frame time (ms)",
    labelNames: ["version", "servername", "description"],
});

const maxplayernum = new Gauge({
    name: "palworld_server_maxplayer",
    help: "The maximum number of players",
    labelNames: ["version", "servername", "description"],
});

const uptime = new Gauge({
    name: "palworld_server_uptime",
    help: "The server uptime of seconds",
    labelNames: ["version", "servername", "description"],
});

const player_ping = new Gauge({
    name: "palworld_player_ping",
    help: "The player ping",
    labelNames: ["name", "playerId", "userId", "ip"],
});

const player_location_x = new Gauge({
    name: "palworld_player_location_x",
    help: "The player location X",
    labelNames: ["name", "playerId", "userId", "ip"],
});

const player_location_y = new Gauge({
    name: "palworld_player_location_y",
    help: "The player location Y",
    labelNames: ["name", "playerId", "userId", "ip"],
});

const player_level = new Gauge({
    name: "palworld_player_level",
    help: "Current player game level",
    labelNames: ["name", "playerId", "userId", "ip"],
});


export async function getMetrics() {
    const serverInfo: Info = await getServerInfo()
    const serverMetrics: Metrics = await getServerMetrics();

    await register.resetMetrics();
    
    // Server Status
    currentplayernum.set({
        "version": serverInfo.version,
        "servername": serverInfo.servername,
        "description": serverInfo.description
    }, serverMetrics.currentplayernum);

    serverfps.set({
        "version": serverInfo.version,
        "servername": serverInfo.servername,
        "description": serverInfo.description
    }, serverMetrics.serverfps);

    serverframetime.set({
        "version": serverInfo.version,
        "servername": serverInfo.servername,
        "description": serverInfo.description
    }, serverMetrics.serverframetime);

    maxplayernum.set({
        "version": serverInfo.version,
        "servername": serverInfo.servername,
        "description": serverInfo.description
    }, serverMetrics.maxplayernum);

    uptime.set({
        "version": serverInfo.version,
        "servername": serverInfo.servername,
        "description": serverInfo.description
    }, serverMetrics.uptime);

    //Player Status
    if(serverMetrics.currentplayernum > 0){
        const players = await getPlayer();
        players.forEach((player: Player) => {
            if(player.playerId != "None"){
                player_ping.set({
                    "name": player.name,
                    "playerId": player.playerId,
                    "userId": player.userId,
                    "ip": player.ip,
                }
                , player.ping);
        
                player_location_x.set({
                    "name": player.name,
                    "playerId": player.playerId,
                    "userId": player.userId,
                    "ip": player.ip,
                }
                , player.location_x);
        
                player_location_y.set({
                    "name": player.name,
                    "playerId": player.playerId,
                    "userId": player.userId,
                    "ip": player.ip,
                }
                , player.location_y);
        
                player_level.set({
                    "name": player.name,
                    "playerId": player.playerId,
                    "userId": player.userId,
                    "ip": player.ip,
                }
                , player.level);
            }
        });
    }

    return await register.metrics();
}