import { Express, Request, Response } from "express";

import {
  Logger,
  Checks,
  LogLevelDesc,
  LoggerProvider,
  IAsyncProvider,
  safeStringifyException,
} from "@hyperledger/cactus-common";
import {
  IEndpointAuthzOptions,
  IExpressRequestHandler,
  IWebServiceEndpoint,
} from "@hyperledger/cactus-core-api";
import { registerWebServiceEndpoint } from "@hyperledger/cactus-core";
import { InsertDataRequest } from "../../generated/openapi/typescript-axios/index"; // to be modified
import {
  DefaultApi as FabricApi,
  FabricContractInvocationType,
  RunTransactionRequest,
} from "@hyperledger/cactus-plugin-ledger-connector-fabric";

import OAS from "../../../json/openapi.json";

export interface IInsertDataHspAOptions {
  logLevel?: LogLevelDesc;
  fabricApi: FabricApi;
  keychainId: string;
}

export class InsertDataHspA implements IWebServiceEndpoint {
  public static readonly CLASS_NAME = "InsertDataHspA";
  private readonly log: Logger;
  private readonly keychainId: string;

  public get className(): string {
    return InsertDataHspA.CLASS_NAME;
  }

  constructor(public readonly opts: IInsertDataHspAOptions) {
    const fnTag = `${this.className}#constructor()`;
    Checks.truthy(opts, `${fnTag} arg options`);
    Checks.truthy(opts.fabricApi, `${fnTag} options.fabricApi`);
    Checks.truthy(opts.keychainId, `${fnTag} options.keychain`);
    const level = this.opts.logLevel || "INFO";
    const label = this.className;
    this.log = LoggerProvider.getOrCreate({ level, label });

    this.keychainId = opts.keychainId;
  }

  getAuthorizationOptionsProvider(): IAsyncProvider<IEndpointAuthzOptions> {
    // TODO: make this an injectable dependency in the constructor
    return {
      get: async () => ({
        isProtected: true,
        requiredRoles: [],
      }),
    };
  }

  public async registerExpress(
    expressApp: Express,
  ): Promise<IWebServiceEndpoint> {
    await registerWebServiceEndpoint(expressApp, this);
    return this;
  }

  public getOasPath(): (typeof OAS.paths)["/api/v1/plugins/@hyperledger/cactus-healthcare-backend/insert-patient-hspa"] {
    return OAS.paths[
      "/api/v1/plugins/@hyperledger/cactus-healthcare-backend/insert-patient-hspa"
    ];
  }

  getPath(): string {
    const apiPath = this.getOasPath();
    return apiPath.post["x-hyperledger-cactus"].http.path;
  }

  getVerbLowerCase(): string {
    const apiPath = this.getOasPath();
    return apiPath.post["x-hyperledger-cactus"].http.verbLowerCase;
  }

  public getOperationId(): string {
    return this.getOasPath().post.operationId;
  }

  public getExpressRequestHandler(): IExpressRequestHandler {
    return this.handleRequest.bind(this);
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    // main handling of the req for creating patient data
    const tag = `${this.getVerbLowerCase().toUpperCase()} ${this.getPath()}`;
    try {
      const { data } = req.body as InsertDataRequest;
      this.log.debug(`${tag} %o`, data);
      const request: RunTransactionRequest = {
        signingCredential: {
          keychainId: this.keychainId,
          keychainRef: "userA",
        },
        channelName: "mychannel",
        contractName: "EHRContract",
        invocationType: FabricContractInvocationType.Send,
        methodName: "CreatePatientRecord",
        params: [data.id, data.HIdB], // here the chaincode has to be updated in order to match the param structure
      };
      const {
        data: { functionOutput },
      } = await this.opts.fabricApi.runTransactionV1(request);

      const body = { functionOutput };

      res.json(body);
      res.status(200);
    } catch (ex: unknown) {
      const exStr = safeStringifyException(ex);
      this.log.debug(`${tag} Failed to serve request:`, ex);
      res.status(500);
      res.json({ error: exStr });
    }
  }
}
