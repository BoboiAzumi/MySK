import { AccountTypes } from "./account"
import { Metadata } from "./meta"

export type AuthResponseType = {
    meta: Metadata,
    data: {
        token: string,
        information: AccountTypes
    }
}