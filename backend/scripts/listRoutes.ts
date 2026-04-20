import listEndpoints from "express-list-endpoints";
import server from "../index";

if (!server || typeof server !== "function") {
    console.error(
        "Error: Failed to import the Express server instance. Make sure it is exported correctly from your main serverlication file (e.g., src/index.ts).",
    );
    process.exit(1);
}

try {
    const endpoints = listEndpoints(server);

    if (endpoints.length === 0) {
        console.log("Rute masih kosongan.");
    } else {
        console.log("Rute yang terdaftar:");
        console.log("------------------");
        endpoints.forEach((endpoint) => {
            const methods = endpoint.methods.join(", ");
            console.log(`${methods.padEnd(18)} ${endpoint.path}`);
        });
        console.log("------------------");
    }

    process.exit(1);
} catch (error: unknown) {
    console.error("Error listing endpoints:", error);
    process.exit(1);
}
