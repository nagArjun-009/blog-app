import { type User } from '../../types';
interface AuthState {
    user: User | null;
    token: string | null;
}
export type { AuthState };
export declare const setCredentials: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    user: User;
    token: string;
}, "auth/setCredentials">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
