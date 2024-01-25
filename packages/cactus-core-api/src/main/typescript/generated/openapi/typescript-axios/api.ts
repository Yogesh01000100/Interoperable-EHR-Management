/* tslint:disable */
/* eslint-disable */
/**
 * Hyperledger Core API
 * Contains/describes the core API types for Cactus. Does not describe actual endpoints on its own as this is left to the implementing plugins who can import and re-use commonly needed type definitions from this specification. One example of said commonly used type definitions would be the types related to consortium management, cactus nodes, ledgers, etc..
 *
 * The version of the OpenAPI document: v2.0.0-alpha.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * A Cactus node can be a single server, or a set of servers behind a load balancer acting as one.
 * @export
 * @interface CactusNode
 */
export interface CactusNode {
    /**
     * 
     * @type {string}
     * @memberof CactusNode
     */
    'nodeApiHost': string;
    /**
     * The PEM encoded public key that was used to generate the JWS included in the response (the jws property)
     * @type {string}
     * @memberof CactusNode
     */
    'publicKeyPem': string;
    /**
     * 
     * @type {string}
     * @memberof CactusNode
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof CactusNode
     */
    'consortiumId': string;
    /**
     * 
     * @type {string}
     * @memberof CactusNode
     */
    'memberId': string;
    /**
     * Stores an array of Ledger entity IDs that are reachable (routable) via this Cactus Node. This information is used by the client side SDK API client to figure out at runtime where to send API requests that are specific to a certain ledger such as requests to execute transactions.
     * @type {Array<string>}
     * @memberof CactusNode
     */
    'ledgerIds': Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CactusNode
     */
    'pluginInstanceIds': Array<string>;
}
/**
 * 
 * @export
 * @interface CactusNodeAllOf
 */
export interface CactusNodeAllOf {
    /**
     * 
     * @type {string}
     * @memberof CactusNodeAllOf
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof CactusNodeAllOf
     */
    'consortiumId': string;
    /**
     * 
     * @type {string}
     * @memberof CactusNodeAllOf
     */
    'memberId': string;
    /**
     * Stores an array of Ledger entity IDs that are reachable (routable) via this Cactus Node. This information is used by the client side SDK API client to figure out at runtime where to send API requests that are specific to a certain ledger such as requests to execute transactions.
     * @type {Array<string>}
     * @memberof CactusNodeAllOf
     */
    'ledgerIds': Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CactusNodeAllOf
     */
    'pluginInstanceIds': Array<string>;
}
/**
 * A Cactus node meta information
 * @export
 * @interface CactusNodeMeta
 */
export interface CactusNodeMeta {
    /**
     * 
     * @type {string}
     * @memberof CactusNodeMeta
     */
    'nodeApiHost': string;
    /**
     * The PEM encoded public key that was used to generate the JWS included in the response (the jws property)
     * @type {string}
     * @memberof CactusNodeMeta
     */
    'publicKeyPem': string;
}
/**
 * Enumerates a list of consensus algorithm families that do not provide immediate finality
 * @export
 * @enum {string}
 */

export const ConsensusAlgorithmFamiliesWithOutTxFinality = {
    WORK: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_WORK'
} as const;

export type ConsensusAlgorithmFamiliesWithOutTxFinality = typeof ConsensusAlgorithmFamiliesWithOutTxFinality[keyof typeof ConsensusAlgorithmFamiliesWithOutTxFinality];


/**
 * Enumerates a list of consensus algorithm families that provide immediate finality
 * @export
 * @enum {string}
 */

export const ConsensusAlgorithmFamiliesWithTxFinality = {
    Authority: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_AUTHORITY',
    Stake: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_STAKE'
} as const;

export type ConsensusAlgorithmFamiliesWithTxFinality = typeof ConsensusAlgorithmFamiliesWithTxFinality[keyof typeof ConsensusAlgorithmFamiliesWithTxFinality];


/**
 * Enumerates a list of consensus algorithm families in existence. Does not intend to be an exhaustive list, just a practical one, meaning that we only include items here that are relevant to Hyperledger Cactus in fulfilling its own duties. This can be extended later as more sophisticated features of Cactus get implemented. This enum is meant to be first and foremost a useful abstraction for achieving practical tasks, not an encyclopedia and therefore we ask of everyone that this to be extended only in ways that serve a practical purpose for the runtime behavior of Cactus or Cactus plugins in general. The bottom line is that we can accept this enum being not 100% accurate as long as it 100% satisfies what it was designed to do.
 * @export
 * @enum {string}
 */

export const ConsensusAlgorithmFamily = {
    Authority: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_AUTHORITY',
    Stake: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_STAKE',
    Work: 'org.hyperledger.cactus.consensusalgorithm.PROOF_OF_WORK'
} as const;

export type ConsensusAlgorithmFamily = typeof ConsensusAlgorithmFamily[keyof typeof ConsensusAlgorithmFamily];


/**
 * 
 * @export
 * @interface Consortium
 */
export interface Consortium {
    /**
     * 
     * @type {string}
     * @memberof Consortium
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof Consortium
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof Consortium
     */
    'mainApiHost': string;
    /**
     * The collection (array) of primary keys of consortium member entities that belong to this Consortium.
     * @type {Array<string>}
     * @memberof Consortium
     */
    'memberIds': Array<string>;
}
/**
 * 
 * @export
 * @interface ConsortiumDatabase
 */
export interface ConsortiumDatabase {
    /**
     * A collection of Consortium entities. In practice this should only ever contain a single consortium, but we defined it as an array to keep the convention up with the rest of the collections defined in the Consortium data in general. Also, if we ever decide to somehow have some sort of consortium to consortium integration (which does not make much sense in the current frame of mind of the author in the year 2020) then having this as an array will have proven itself to be an excellent long term compatibility/extensibility decision indeed.
     * @type {Array<Consortium>}
     * @memberof ConsortiumDatabase
     */
    'consortium': Array<Consortium>;
    /**
     * The complete collection of all ledger entities in existence within the consortium.
     * @type {Array<Ledger>}
     * @memberof ConsortiumDatabase
     */
    'ledger': Array<Ledger>;
    /**
     * The complete collection of all consortium member entities in existence within the consortium.
     * @type {Array<ConsortiumMember>}
     * @memberof ConsortiumDatabase
     */
    'consortiumMember': Array<ConsortiumMember>;
    /**
     * The complete collection of all cactus nodes entities in existence within the consortium.
     * @type {Array<CactusNode>}
     * @memberof ConsortiumDatabase
     */
    'cactusNode': Array<CactusNode>;
    /**
     * The complete collection of all plugin instance entities in existence within the consortium.
     * @type {Array<PluginInstance>}
     * @memberof ConsortiumDatabase
     */
    'pluginInstance': Array<PluginInstance>;
}
/**
 * 
 * @export
 * @interface ConsortiumMember
 */
export interface ConsortiumMember {
    /**
     * 
     * @type {string}
     * @memberof ConsortiumMember
     */
    'id': string;
    /**
     * The human readable name a Consortium member can be referred to while making it easy for humans to distinguish this particular consortium member entity from any other ones.
     * @type {string}
     * @memberof ConsortiumMember
     */
    'name': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ConsortiumMember
     */
    'nodeIds': Array<string>;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const Constants = {
    SocketIoConnectionPathV1: '/api/v1/async/socket-io/connect'
} as const;

export type Constants = typeof Constants[keyof typeof Constants];


/**
 * 
 * @export
 * @interface DeleteKeychainEntryRequestV1
 */
export interface DeleteKeychainEntryRequestV1 {
    /**
     * The key for the entry to check the presence of on the keychain.
     * @type {string}
     * @memberof DeleteKeychainEntryRequestV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface DeleteKeychainEntryResponseV1
 */
export interface DeleteKeychainEntryResponseV1 {
    /**
     * The key that was deleted from the keychain.
     * @type {string}
     * @memberof DeleteKeychainEntryResponseV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface GetKeychainEntryRequestV1
 */
export interface GetKeychainEntryRequestV1 {
    /**
     * The key for the entry to get from the keychain.
     * @type {string}
     * @memberof GetKeychainEntryRequestV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface GetKeychainEntryResponseV1
 */
export interface GetKeychainEntryResponseV1 {
    /**
     * The key that was used to retrieve the value from the keychain.
     * @type {string}
     * @memberof GetKeychainEntryResponseV1
     */
    'key': string;
    /**
     * The value associated with the requested key on the keychain.
     * @type {string}
     * @memberof GetKeychainEntryResponseV1
     */
    'value': string;
}
/**
 * 
 * @export
 * @interface GetObjectRequestV1
 */
export interface GetObjectRequestV1 {
    /**
     * The key for the entry to get from the object store.
     * @type {string}
     * @memberof GetObjectRequestV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface GetObjectResponseV1
 */
export interface GetObjectResponseV1 {
    /**
     * The key that was used to retrieve the value from the object store.
     * @type {string}
     * @memberof GetObjectResponseV1
     */
    'key': string;
    /**
     * The value associated with the requested key in the object store as a string.
     * @type {string}
     * @memberof GetObjectResponseV1
     */
    'value': string;
}
/**
 * 
 * @export
 * @interface HasKeychainEntryRequestV1
 */
export interface HasKeychainEntryRequestV1 {
    /**
     * The key to check for presence in the keychain.
     * @type {string}
     * @memberof HasKeychainEntryRequestV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface HasKeychainEntryResponseV1
 */
export interface HasKeychainEntryResponseV1 {
    /**
     * The key that was used to check the presence of the value in the entry store.
     * @type {string}
     * @memberof HasKeychainEntryResponseV1
     */
    'key': string;
    /**
     * Date and time encoded as JSON when the presence check was performed by the plugin backend.
     * @type {string}
     * @memberof HasKeychainEntryResponseV1
     */
    'checkedAt': string;
    /**
     * The boolean true or false indicating the presence or absence of an entry under \'key\'.
     * @type {boolean}
     * @memberof HasKeychainEntryResponseV1
     */
    'isPresent': boolean;
}
/**
 * 
 * @export
 * @interface HasObjectRequestV1
 */
export interface HasObjectRequestV1 {
    /**
     * The key to check for presence in the object store.
     * @type {string}
     * @memberof HasObjectRequestV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface HasObjectResponseV1
 */
export interface HasObjectResponseV1 {
    /**
     * The key that was used to check the presence of the value in the object store.
     * @type {string}
     * @memberof HasObjectResponseV1
     */
    'key': string;
    /**
     * Date and time encoded as JSON when the presence check was performed by the plugin backend.
     * @type {string}
     * @memberof HasObjectResponseV1
     */
    'checkedAt': string;
    /**
     * The boolean true or false indicating the presence or absence of an object under \'key\'.
     * @type {boolean}
     * @memberof HasObjectResponseV1
     */
    'isPresent': boolean;
}
/**
 * 
 * @export
 * @interface JWSGeneral
 */
export interface JWSGeneral {
    /**
     * 
     * @type {string}
     * @memberof JWSGeneral
     */
    'payload': string;
    /**
     * 
     * @type {Array<JWSRecipient>}
     * @memberof JWSGeneral
     */
    'signatures': Array<JWSRecipient>;
}
/**
 * A JSON Web Signature. See: https://tools.ietf.org/html/rfc7515 for info about standard.
 * @export
 * @interface JWSRecipient
 */
export interface JWSRecipient {
    /**
     * 
     * @type {string}
     * @memberof JWSRecipient
     */
    'signature': string;
    /**
     * 
     * @type {string}
     * @memberof JWSRecipient
     */
    'protected'?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof JWSRecipient
     */
    'header'?: { [key: string]: any; };
}
/**
 * 
 * @export
 * @interface Ledger
 */
export interface Ledger {
    /**
     * 
     * @type {string}
     * @memberof Ledger
     */
    'id': string;
    /**
     * 
     * @type {LedgerType}
     * @memberof Ledger
     */
    'ledgerType': LedgerType;
    /**
     * 
     * @type {string}
     * @memberof Ledger
     */
    'consortiumMemberId'?: string;
}


/**
 * Enumerates the different ledger vendors and their major versions encoded within the name of the LedgerType. For example \"BESU_1X\" involves all of the [1.0.0;2.0.0) where 1.0.0 is included and anything up until, but not 2.0.0. See: https://stackoverflow.com/a/4396303/698470 for further explanation.
 * @export
 * @enum {string}
 */

export const LedgerType = {
    Besu1X: 'BESU_1X',
    Besu2X: 'BESU_2X',
    Burrow0X: 'BURROW_0X',
    Corda4X: 'CORDA_4X',
    Fabric14X: 'FABRIC_14X',
    Fabric2: 'FABRIC_2',
    Quorum2X: 'QUORUM_2X',
    Sawtooth1X: 'SAWTOOTH_1X'
} as const;

export type LedgerType = typeof LedgerType[keyof typeof LedgerType];


/**
 * 
 * @export
 * @interface PluginImport
 */
export interface PluginImport {
    /**
     * 
     * @type {string}
     * @memberof PluginImport
     */
    'packageName': string;
    /**
     * 
     * @type {PluginImportType}
     * @memberof PluginImport
     */
    'type': PluginImportType;
    /**
     * 
     * @type {PluginImportAction}
     * @memberof PluginImport
     */
    'action': PluginImportAction;
    /**
     * 
     * @type {any}
     * @memberof PluginImport
     */
    'options'?: any;
}


/**
 * 
 * @export
 * @enum {string}
 */

export const PluginImportAction = {
    Instantiate: 'org.hyperledger.cactus.plugin_import_action.INSTANTIATE',
    Install: 'org.hyperledger.cactus.plugin_import_action.INSTALL'
} as const;

export type PluginImportAction = typeof PluginImportAction[keyof typeof PluginImportAction];


/**
 * 
 * @export
 * @enum {string}
 */

export const PluginImportType = {
    Local: 'org.hyperledger.cactus.plugin_import_type.LOCAL',
    Remote: 'org.hyperledger.cactus.plugin_import_type.REMOTE'
} as const;

export type PluginImportType = typeof PluginImportType[keyof typeof PluginImportType];


/**
 * 
 * @export
 * @interface PluginInstance
 */
export interface PluginInstance {
    /**
     * 
     * @type {string}
     * @memberof PluginInstance
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof PluginInstance
     */
    'packageName': string;
}
/**
 * 
 * @export
 * @interface SetKeychainEntryRequestV1
 */
export interface SetKeychainEntryRequestV1 {
    /**
     * The key for the entry to set on the keychain.
     * @type {string}
     * @memberof SetKeychainEntryRequestV1
     */
    'key': string;
    /**
     * The value that will be associated with the key on the keychain.
     * @type {string}
     * @memberof SetKeychainEntryRequestV1
     */
    'value': string;
}
/**
 * 
 * @export
 * @interface SetKeychainEntryResponseV1
 */
export interface SetKeychainEntryResponseV1 {
    /**
     * The key that was used to set the value on the keychain.
     * @type {string}
     * @memberof SetKeychainEntryResponseV1
     */
    'key': string;
}
/**
 * 
 * @export
 * @interface SetObjectRequestV1
 */
export interface SetObjectRequestV1 {
    /**
     * The key for the entry to set in the object store.
     * @type {string}
     * @memberof SetObjectRequestV1
     */
    'key': string;
    /**
     * The value that will be associated with the key in the object store.
     * @type {string}
     * @memberof SetObjectRequestV1
     */
    'value': string;
}
/**
 * 
 * @export
 * @interface SetObjectResponseV1
 */
export interface SetObjectResponseV1 {
    /**
     * The key that was used to set the value in the object store.
     * @type {string}
     * @memberof SetObjectResponseV1
     */
    'key': string;
}
