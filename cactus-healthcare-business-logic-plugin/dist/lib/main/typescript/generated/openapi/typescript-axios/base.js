"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * Hyperledger Cactus Example - Supply Chain App
 * Demonstrates how a business use case can be satisfied with Cactus when multiple distinct ledgers are involved.
 *
 * The version of the OpenAPI document: v2.0.0-alpha.2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
const axios_1 = __importDefault(require("axios"));
exports.BASE_PATH = "http://localhost".replace(/\/+$/, "");
/**
 *
 * @export
 */
exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
/**
 *
 * @export
 * @class BaseAPI
 */
class BaseAPI {
    constructor(configuration, basePath = exports.BASE_PATH, axios = axios_1.default) {
        this.basePath = basePath;
        this.axios = axios;
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}
exports.BaseAPI = BaseAPI;
;
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
class RequiredError extends Error {
    constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
    }
}
exports.RequiredError = RequiredError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvZ2VuZXJhdGVkL29wZW5hcGkvdHlwZXNjcmlwdC1heGlvcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7O0dBVUc7Ozs7OztBQU9ILGtEQUFnQztBQUVuQixRQUFBLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRWhFOzs7R0FHRztBQUNVLFFBQUEsa0JBQWtCLEdBQUc7SUFDOUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxJQUFJO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDYixDQUFDO0FBWUY7Ozs7R0FJRztBQUNILE1BQWEsT0FBTztJQUdoQixZQUFZLGFBQTZCLEVBQVksV0FBbUIsaUJBQVMsRUFBWSxRQUF1QixlQUFXO1FBQTFFLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBNkI7UUFDM0gsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMzRDtJQUNMLENBQUM7Q0FDSjtBQVRELDBCQVNDO0FBQUEsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBYSxhQUFjLFNBQVEsS0FBSztJQUNwQyxZQUFtQixLQUFhLEVBQUUsR0FBWTtRQUMxQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFESSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBRTVCLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFBO0lBQy9CLENBQUM7Q0FDSjtBQUxELHNDQUtDIn0=