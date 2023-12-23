import { BaseState } from "types/base-state.type";
import { AuthDto } from "./auth-dto.type";

export interface AuthState extends BaseState {
  tokens: AuthDto | null;
  pending: {
    tokens: boolean;
  };
  errors: {
    tokens: string | null;
  }
}