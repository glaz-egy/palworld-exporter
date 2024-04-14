import { context } from "esbuild";

export const ctx = await context({
    entryPoints: ["./src/**/*.ts"],
    outdir: "build",
    platform: "node",
    format: "esm",
    bundle: true,
    banner: {
        js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
    },
});

ctx.rebuild();
ctx.dispose();
