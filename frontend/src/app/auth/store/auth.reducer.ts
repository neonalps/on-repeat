import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.actions";
import { AuthState } from "./auth.selectors";

export const initialState: AuthState | null = null;

export const authReducer = createReducer(
    initialState,
    on(login, (state) => state),
    on(logout, () => null),
);