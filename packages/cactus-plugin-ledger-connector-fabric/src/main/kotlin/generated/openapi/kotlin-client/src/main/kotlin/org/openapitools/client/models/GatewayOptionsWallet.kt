/**
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 *
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package org.openapitools.client.models

import org.openapitools.client.models.FabricSigningCredential

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

/**
 * 
 *
 * @param keychain 
 * @param json 
 */


data class GatewayOptionsWallet (

    @Json(name = "keychain")
    val keychain: FabricSigningCredential? = null,

    @Json(name = "json")
    val json: kotlin.String? = null

)

