import fastify from "fastify";
import { getMetrics } from "./exporter";

const server = fastify();

server.get("/metrics", async function handler() {
    return getMetrics();
});

try {
    await server.listen({ host: "0.0.0.0", port: 9500 });
} catch (error) {
    server.log.error(error);
    process.exit(1);
}