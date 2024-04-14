# Palworld to Prometheus exporter

## Overview
An implementation of a Prometheus exporter for Palworld.

## Requirement
- Docker 24.0.5

## Usage
Environmental variables.
```
SERVER_RESTAPI_ADDRESS: Your palworld server address(Required)
SERVER_RESTAPI_PORT:    Your palworld server REST API port number(Required)
PASSWORD:               Your palworld server admin password(Required)
EXPORTER_PORT:          This exporter port(Default is 9500)
```
```
# docker run -e SERVER_RESTAPI_ADDRESS=<your palworld server address> -e SERVER_RESTAPI_PORT=<your palworld server rest-api port> -e USERNAME=admin -e PASSWORD=<server admin password> -e EXPORTER_PORT=<exporter port> -d --name palworld_exporter -p <exporter port>:<exporter port> --network=bridge glazegy/palworld_exporter
```
Then get the value in Prometheus.

## Description
Examples of values that can be obtained are
```
# HELP palworld_server_current_player_num The number of current players
# TYPE palworld_server_current_player_num gauge
palworld_server_current_player_num{version="v0.2.1.0",servername="Test Server",description=""} 1

# HELP palworld_server_fps The server FPS
# TYPE palworld_server_fps gauge
palworld_server_fps{version="v0.2.1.0",servername="Test Server",description=""} 59

# HELP palworld_server_frame_time Server frame time (ms)
# TYPE palworld_server_frame_time gauge
palworld_server_frame_time{version="v0.2.1.0",servername="Test Server",description=""} 16.82892608642578

# HELP palworld_server_maxplayer The maximum number of players
# TYPE palworld_server_maxplayer gauge
palworld_server_maxplayer{version="v0.2.1.0",servername="Test Server",description=""} 32

# HELP palworld_server_uptime The server uptime of seconds
# TYPE palworld_server_uptime gauge
palworld_server_uptime{version="v0.2.1.0",servername="Test Server",description=""} 160308

# HELP palworld_player_ping The player ping
# TYPE palworld_player_ping gauge
palworld_player_ping{name="Test User",playerId="xxxxxxxxxx",userId="steam_xxxxxxxxxxxxxxxxx",ip="xxx.yyy.aaa.bbb"} 21.785715103149414

# HELP palworld_player_location_x The player location X
# TYPE palworld_player_location_x gauge
palworld_player_location_x{name="Test User",playerId="xxxxxxxxxx",userId="steam_xxxxxxxxxxxxxxxxx",ip="xxx.yyy.aaa.bbb"} -282875.125

# HELP palworld_player_location_y The player location Y
# TYPE palworld_player_location_y gauge
palworld_player_location_y{name="Test User",playerId="xxxxxxxxxx",userId="steam_xxxxxxxxxxxxxxxxx",ip="xxx.yyy.aaa.bbb"} 196350.984375

# HELP palworld_player_level Current player game level
# TYPE palworld_player_level gauge
palworld_player_level{name="Test User",playerId="xxxxxxxxxx",userId="steam_xxxxxxxxxxxxxxxxx",ip="xxx.yyy.aaa.bbb"} 50
```

## Reference
- [prom-client](https://github.com/siimon/prom-client)

- [PalWorld REST API](https://tech.palworldgame.com/ja/category/rest-api)

## Licence

[MIT](https://github.com/glaz-egy/palworld-exporter/blob/main/LICENSE)
