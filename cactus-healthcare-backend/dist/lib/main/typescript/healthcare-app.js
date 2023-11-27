"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCareApp = void 0;
const uuid_1 = require("uuid");
const async_exit_hook_1 = __importDefault(require("async-exit-hook"));
const cactus_core_1 = require("@hyperledger/cactus-core");
const cactus_common_1 = require("@hyperledger/cactus-common");
const cactus_cmd_api_server_1 = require("@hyperledger/cactus-cmd-api-server");
const cactus_plugin_ledger_connector_fabric_1 = require("@hyperledger/cactus-plugin-ledger-connector-fabric");
const cactus_plugin_keychain_memory_1 = require("@hyperledger/cactus-plugin-keychain-memory");
const infrastructure_1 = require("./infrastructure/infrastructure");
const crypto_material_json_1 = __importDefault(require("../../crypto-material/crypto-material.json"));
const cactus_healthcare_business_logic_plugin_1 = require("../../../../cactus-healthcare-business-logic-plugin");
class HealthCareApp {
    constructor(options) {
        this.options = options;
        const fnTag = "HealthCareApp#constructor()";
        if (!options) {
            throw new Error(`${fnTag} options parameter is falsy`);
        }
        const { logLevel } = options;
        const level = logLevel || "INFO";
        const label = "healthcare-app";
        this.log = cactus_common_1.LoggerProvider.getOrCreate({ level, label });
        this.shutdownHooks = [];
        this.infrastructure = new infrastructure_1.HealthCareAppDummyInfrastructure({
            logLevel: level,
        });
    }
    async start() {
        this.log.debug(`Starting HealthCare App...`);
        if (!this.options.disableSignalHandlers) {
            (0, async_exit_hook_1.default)((callback) => {
                this.stop().then(callback);
            });
            this.log.debug(`Registered signal handlers for graceful auto-shutdown`);
        }
        await this.infrastructure.start();
        this.onShutdown(() => this.infrastructure.stop());
        const fabricPlugin1 = await this.infrastructure.createFabric1LedgerConnector(); // find this function: createFabric1LedgerConnector
        const fabricPlugin2 = await this.infrastructure.createFabric2LedgerConnector();
        // Reserve the ports where the API Servers will run
        const httpApiA = await cactus_common_1.Servers.startOnPort(this.options.apiServer1Port, this.options.apiHost);
        const httpApiB = await cactus_common_1.Servers.startOnPort(this.options.apiServer2Port, this.options.apiHost);
        const addressInfoA = httpApiA.address();
        const addressInfoB = httpApiB.address();
        const nodeApiHostA = `http://${this.options.apiHost}:${addressInfoA.port}`;
        const nodeApiHostB = `http://${this.options.apiHost}:${addressInfoB.port}`;
        const fabricApiClient1 = new cactus_plugin_ledger_connector_fabric_1.DefaultApi(new cactus_plugin_ledger_connector_fabric_1.Configuration({ basePath: nodeApiHostA }));
        const fabricApiClient2 = new cactus_plugin_ledger_connector_fabric_1.DefaultApi(new cactus_plugin_ledger_connector_fabric_1.Configuration({ basePath: nodeApiHostB })); // done
        // to be done
        const FabricRegistry1 = new cactus_core_1.PluginRegistry({
            plugins: [
                new cactus_plugin_keychain_memory_1.PluginKeychainMemory({
                    keychainId: crypto_material_json_1.default.keychains.keychain1.id,
                    instanceId: (0, uuid_1.v4)(),
                    logLevel: "INFO",
                }),
                fabricPlugin1,
                new cactus_healthcare_business_logic_plugin_1.HealthCareCactusPlugin({
                    logLevel: "INFO",
                    instanceId: (0, uuid_1.v4)(),
                    fabricApiClient1,
                    fabricApiClient2
                    //fabricEnvironment: org1Env,
                }),
            ],
        });
        const FabricRegistry2 = new cactus_core_1.PluginRegistry({
            plugins: [
                new cactus_plugin_keychain_memory_1.PluginKeychainMemory({
                    keychainId: crypto_material_json_1.default.keychains.keychain2.id,
                    instanceId: (0, uuid_1.v4)(),
                    logLevel: "INFO",
                }),
                fabricPlugin2,
                new cactus_healthcare_business_logic_plugin_1.HealthCareCactusPlugin({
                    logLevel: "INFO",
                    instanceId: (0, uuid_1.v4)(),
                    fabricApiClient1,
                    fabricApiClient2
                    //fabricEnvironment: org2Env,
                }),
            ],
        });
        const apiServer1 = await this.startNode(httpApiA, FabricRegistry1);
        const apiServer2 = await this.startNode(httpApiB, FabricRegistry2);
        this.log.info("Deploying chaincode...");
        await this.infrastructure.deployFabricContract1(fabricApiClient1);
        await this.infrastructure.deployFabricContract2(fabricApiClient2);
        this.log.info(`Chaincode deployed.`);
        return {
            apiServer1,
            apiServer2,
            fabricApiClient1,
            fabricApiClient2,
        };
    }
    async stop() {
        for (const hook of this.shutdownHooks) {
            await hook();
        }
    }
    onShutdown(hook) {
        this.shutdownHooks.push(hook);
    }
    async startNode(httpServerApi, pluginRegistry) {
        this.log.info(`Starting API Server node...`);
        const addressInfoApi = httpServerApi.address();
        const configService = new cactus_cmd_api_server_1.ConfigService();
        const convictConfig = await configService.getOrCreate();
        const config = convictConfig.getProperties();
        config.configFile = "";
        config.apiCorsDomainCsv = `http://${process.env.API_HOST_FRONTEND}:${process.env.API_PORT_FRONTEND}`;
        config.cockpitCorsDomainCsv = `http://${process.env.API_HOST_FRONTEND}:${process.env.API_PORT_FRONTEND}`;
        config.apiPort = addressInfoApi.port;
        config.apiHost = addressInfoApi.address;
        config.grpcPort = 0;
        config.logLevel = this.options.logLevel || "INFO";
        config.authorizationProtocol = cactus_cmd_api_server_1.AuthorizationProtocol.NONE;
        const apiServer = new cactus_cmd_api_server_1.ApiServer({
            config,
            httpServerApi,
            pluginRegistry,
        });
        this.onShutdown(() => apiServer.shutdown());
        await apiServer.start();
        return apiServer;
    }
}
exports.HealthCareApp = HealthCareApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoY2FyZS1hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWFpbi90eXBlc2NyaXB0L2hlYWx0aGNhcmUtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLCtCQUFvQztBQUVwQyxzRUFBdUU7QUFDdkUsMERBQTBEO0FBQzFELDhEQUEyRjtBQUMzRiw4RUFBOEg7QUFDOUgsOEdBQTRHO0FBQzVHLDhGQUFrRjtBQUNsRixvRUFBcUc7QUFDckcsc0dBQXdFO0FBQ3hFLGlIQUE2RjtBQWE3RixNQUFhLGFBQWE7SUFLeEIsWUFBbUMsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDeEQsTUFBTSxLQUFLLEdBQUcsNkJBQTZCLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLDZCQUE2QixDQUFDLENBQUM7U0FDeEQ7UUFDRCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTdCLE1BQU0sS0FBSyxHQUFHLFFBQVEsSUFBSSxNQUFNLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyw4QkFBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpREFBZ0MsQ0FBQztZQUN6RCxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRTtZ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