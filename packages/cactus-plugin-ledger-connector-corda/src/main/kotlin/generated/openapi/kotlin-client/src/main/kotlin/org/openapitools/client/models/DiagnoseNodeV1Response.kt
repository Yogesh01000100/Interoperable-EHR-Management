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

import org.openapitools.client.models.NodeDiagnosticInfo

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

/**
 * 
 *
 * @param nodeDiagnosticInfo 
 */


data class DiagnoseNodeV1Response (

    @Json(name = "nodeDiagnosticInfo")
    val nodeDiagnosticInfo: NodeDiagnosticInfo

)

