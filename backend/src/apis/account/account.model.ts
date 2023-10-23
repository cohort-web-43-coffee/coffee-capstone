import {PrivateAccountSchema, PublicAccountSchema} from "./account.validator";
import {any, z} from "zod";
import {sql} from "../../utils/database.utils";
import session from "express-session";


export type PrivateAccount = z.infer<typeof PrivateAccountSchema>
export type PublicAccount = z.infer<typeof PublicAccountSchema>


export async function insertAccount(account: PrivateAccount): Promise<string> {
    const {accountEmail, accountHash, accountActivationToken, accountName} = account
    await sql`insert into account(account_id, account_email, account_hash, account_activation_token, account_name)
              values (gen_random_uuid(), ${accountEmail}, ${accountHash}, ${accountActivationToken}, ${accountName})`
    return 'account successfully created'
}


export async function updateAccount(account: PublicAccount): Promise<string> {
    const {accountName, accountId,} = account
    await sql`update account set account_name = ${accountName} where account_id = ${accountId}`
    return 'account successfully updated'
}

export async function selectPublicAccountByAccountId (accountId:string | null): Promise<PublicAccount | null> {
    const rowList = await sql `select  account_id, account_email, account_name from account where account_id = ${accountId}`
    console.log(rowList)

    const result = PublicAccountSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}


export async function selectPrivateAccountByAccountEmail (accountEmail: string | null): Promise<PrivateAccount| null>{
    const rowList = await sql `select account_id, account_email, account_hash, account_activation_token, account_name from account where account_email = ${accountEmail}`

    const result = PrivateAccountSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0]: null
}

export async function selectPrivateAccountByAccountActivationToken (accountActivationToken: string): Promise<PrivateAccount|null> {
    const rowList = await sql`SELECT account_id, account_activation_token, account_email, account_hash, account_name FROM account WHERE account_activation_token = ${accountActivationToken}`
    const result = PrivateAccountSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}

export async function deleteAccount(account: PublicAccount): Promise<string> {
    const {accountId} = account
    await sql`delete
             from account
             where  account_id= ${accountId}`
    return 'Account successfully deleted '
}

