package org.hyperledger.cactus.plugin.ledger.connector.corda.server.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import org.hyperledger.cactus.plugin.ledger.connector.corda.server.model.SHA256
import javax.validation.constraints.DecimalMax
import javax.validation.constraints.DecimalMin
import javax.validation.constraints.Email
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size
import javax.validation.Valid

/**
 * A CordappInfo describes a single CorDapp currently installed on the node
 * @param jarHash 
 * @param licence The name of the licence this CorDapp is released under
 * @param minimumPlatformVersion The minimum platform version the node must be at for the CorDapp to run
 * @param name The name of the JAR file that defines the CorDapp
 * @param shortName The name of the CorDapp
 * @param targetPlatformVersion The target platform version this CorDapp has been tested against
 * @param type A description of what sort of CorDapp this is - either a contract, workflow, or a combination.
 * @param vendor The vendor of this CorDapp
 * @param version The version of this CorDapp
 */
data class CordappInfo(

    @field:Valid
    @get:JsonProperty("jarHash", required = true) val jarHash: SHA256,

    @get:JsonProperty("licence", required = true) val licence: kotlin.String,

    @get:JsonProperty("minimumPlatformVersion", required = true) val minimumPlatformVersion: kotlin.Int,

    @get:JsonProperty("name", required = true) val name: kotlin.String,

    @get:JsonProperty("shortName", required = true) val shortName: kotlin.String,

    @get:JsonProperty("targetPlatformVersion", required = true) val targetPlatformVersion: kotlin.Int,

    @get:JsonProperty("type", required = true) val type: kotlin.String,

    @get:JsonProperty("vendor", required = true) val vendor: kotlin.String,

    @get:JsonProperty("version", required = true) val version: kotlin.String
) {

}
