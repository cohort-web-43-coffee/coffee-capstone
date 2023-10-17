import {PrivateAccountSchema, PublicAccountSchema} from "./account.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";
import express from "express";


export type PrivateAccount = z.infer<typeof PrivateAccountSchema>
export type PublicAccount = z.infer<typeof PublicAccountSchema>


export async function insertAccount(account: PrivateAccount): Promise<string> {
    const {accountEmail, accountHash, accountName} = account
    await sql`insert into account(account_id, account_email, account_hash, account_name)
              values (gen_random_uuid(), ${accountEmail}, ${accountHash}, ${accountName})`
    return 'account successfully created'
}


export async function updateAccount(account: PublicAccount): Promise<string> {
    const {accountName, accountId,} = account
    await sql`update account set account_name = ${accountName} where account_id = ${accountId}`
    return 'account successfully updated'
}

export async function selectPublicAccountByAccountId (accountId:string): Promise<PublicAccount | null> {
    const rowList = await sql `select account_id, account_name from account where account_id = ${accountId}`

    const result = PublicAccountSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}


export async function selectPrivateAccountByAccountEmail (accountEmail: string): Promise<PrivateAccount| null>{
    const rowList = await sql `select account_id, account_email, account_hash, account_name from account where account_email = ${accountEmail}`

    const result = PrivateAccountSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0]: null
}