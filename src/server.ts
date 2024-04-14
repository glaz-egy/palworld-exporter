import fastify from "fastify";
import { getMetrics } from "./exporter";
import { log } from "console";

const EXPORTER_PORT = process.env.EXPORTER_PORT ? process.env.EXPORTER_PORT : "9500";
const server = fastify();

server.get("/metrics", async function handler() {
    return getMetrics();
});


try {
    await server.listen({ host: "0.0.0.0", port: parseInt(EXPORTER_PORT) });
    log(`[${new Date().toISOString()}] Palworld Exporter Started: ` + "%s", server.addresses()[0]);
} catch (error) {
    server.log.error(error);
    process.exit(1);
}