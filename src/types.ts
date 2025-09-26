export type DeliveryStatus =
  | "sent"
  | "delivered"
  | "read"
  | "expired"
  | "revoked";
export type VerificationStatus =
  | "code_valid"
  | "code_invalid"
  | "code_max_attempts_exceeded"
  | "expired";

export interface SendOptions {
  phone_number?: string;
  request_id?: string;
  sender_username?: string;
  code?: string;
  code_length?: number;
  callback_url?: string;
  payload?: string;
  ttl?: number;
}

export interface CheckResult {
  success: boolean;
  request_id?: string;
  error?: string;
  number: string;
}

export interface SendResult {
  success: boolean;
  error?: string;
  request_cost?: number;
  remaining_balance?: number;
  request_id?: string;
  number?: string;
}

export interface StatusResult {
  request_id: string;
  phone_number: string;
  request_cost: number;
  delivery_status: {
    status: DeliveryStatus;
    updated_at: number;
  };
  verification_status: {
    status: VerificationStatus;
    updated_at: number;
    code_entered?: string;
  };
}

export interface RevokeResult {
  success: boolean;
  error?: string;
}
