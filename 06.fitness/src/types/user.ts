export interface UserSession {
    provider_token: null;
    provider_refresh_token: null;
    access_token: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    token_type: string;
    user: {
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        phone: string;
        confirmation_sent_at: string;
        confirmed_at: string;
        recovery_sent_at: string;
        last_sign_in_at: string;
        user_metadata: {};
        created_at: string;
        updated_at: string;
    };
};