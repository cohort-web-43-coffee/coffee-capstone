import {PrivateAccountSchema, PublicAccountSchema} from "./account.validator";
import {any, z} from "zod";
import {sql} from "../../utils/database.utils";
import session from "express-session";


/**
 * The shape of the private account that is only used by express. It must never be returned to the controller.
 * @property accountId {string} the primary key
 * @property accountActivationToken {string} the account's activation token
 * @property accountEmail {string} account's email
 * @property accountHash {string} the account hash
 * @property accountName {string} the account name
 */
export type PrivateAccount = z.infer<typeof PrivateAccountSchema>


/**
 * The shape of the public account that can be shared with Next.js
 * @property accountId {string} primary key
 * @property accountEmail {string} account email
 * @property accountName {string} account name
 */
export type PublicAccount = z.infer<typeof PublicAccountSchema>
/**
 * Inserts a new account into the account table
 * @param account the profile to insert
 * @returns "account successfully created"
 */

export async function insertAccount(account: PrivateAccount): Promise<string> {
    const {accountEmail, accountHash, accountActivationToken, accountName} = account
    await sql`insert into account(account_id, account_email, account_hash, account_activation_token, account_name)
              values (gen_random_uuid(), ${accountEmail}, ${accountHash}, ${accountActivationToken}, ${accountName})`
    return 'account successfully created'
}


/**
 * updating the account
 * @param account
 * @returns {Promise<string>} 'Account succesfully updated'
 */

export async function updateAccount(account: PublicAccount): Promise<string> {
    const {accountName, accountId,} = account
    await sql`update account set account_name = ${accountName} where account_id = ${accountId}`
    return 'account successfully updated'
}

/**
 * selects the publicAccount from the account table by accountId
 * @param accountId
 * @returns Account or null if no account was found
 */

export async function selectPublicAccountByAccountId (accountId:string | null): Promise<PublicAccount | null> {

    //create a prepared statement that selects the account by accountName and execute (not like the French) the statement
    const rowList = await sql `select  account_id, account_email, account_name from account where account_id = ${accountId}`
    console.log(rowList)


    //its enforcing that the result is an array of one account, or null
    const result = PublicAccountSchema.array().max(1).parse(rowList)

    // return the account or a null if no account was found
    return result?.length === 1 ? result[0] : null
}

/**
 * selects the privateAccount from the account table by accountEmail
 * @param accountEmail the account's email to search for in the account table
 * @returns Account or null if no account was found
 */


export async function selectPrivateAccountByAccountEmail (accountEmail: string | null): Promise<PrivateAccount| null>{
    const rowList = await sql `select account_id, account_email, account_hash, account_activation_token, account_name from account where account_email = ${accountEmail}`

    const result = PrivateAccountSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0]: null
}

/**
 * selects a account from the account table by accountActivationToken
 * @param accountActivationToken the accounts activation token to search for in the account table
 * @returns Account or null if no account is found
 */

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

