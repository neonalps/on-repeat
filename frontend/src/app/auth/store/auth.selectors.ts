import { createSelector } from "@ngrx/store";
import { AppState } from "@src/app/store.index";

export interface AuthState {
    // TODO define user model interfaces
    user: {
        id: string;
        username: string;
    },
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
};

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
    selectAuth,
    (state: AuthState) => state.user,
);