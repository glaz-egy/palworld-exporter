import { Plugin } from "esbuild";

export const notifyPlugin: Plugin = {
    name: "notify-plugin",
    setup(build) {
        build.onEnd(() => {
        const timestamp = Intl.DateTimeFormat("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(new Date());

        console.log(`[${timestamp}] updated`);
        });
    },
};