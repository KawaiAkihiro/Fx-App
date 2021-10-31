export interface SignUpParams {
    name: String
    email: String
    password: String
    passwordConfirmation: String
}

export interface SignInParams {
    email: String
    password: String
}

export interface User {
    id: number
    uid: String
    provider: String
    email: String
    name: String
    nickname?: String
    image?: String
    allowpasswordChange: boolean
    created_at: Date
    updated_at: Date
}
