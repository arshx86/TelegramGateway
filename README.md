# TelegramGateway-JS

A fully-typed TypeScript SDK for the [Telegram Gateway API](https://core.telegram.org/gateway/api) - send verification codes via Telegram.

## Installation

```bash
bun add telegramgateway-js
# or
npm install telegramgateway-js
# or
yarn add telegramgateway-js
```

## Quick Start

First, grab your API token from [Telegram Gateway API Documentation](https://gateway.telegram.org/account/api).

- Messages to your own number are free of charge.

```typescript
import { TelegramGateway } from "telegramgateway-js";

// Initialize with your API token
const client = new TelegramGateway("your-api-token");

// Check if you can send to a number
const checkResult = await client.checkSend("+1234567890");
/*
{
  "success": true,
  "request_id": "req_123",
  "number": "+1234567890"
}
*/

if (checkResult.success) {
  // Send verification code
  const sendResult = await client.send({
    request_id: checkResult.request_id, // for free of charge
    phone_number: "+1234567890",
    code_length: 6,
  });
  /*
  {
    "success": true,
    "request_id": "req_123",
    "number": "+1234567890",
    "request_cost": 0.05,
    "remaining_balance": 9.95
  }
  */

  // Verify the code
  const verifyResult = await client.checkStatus(
    sendResult.request_id!,
    "123456"
  );
  /*
  {
    "request_id": "req_123",
    "phone_number": "+1234567890",
    "request_cost": 0.05,
    "delivery_status": {
      "status": "read",
      "updated_at": 1758926737
    },
    "verification_status": {
      "status": "code_valid",
      "updated_at": 1758927030,
      "code_entered": "123456"
    }
  }
  */
}
```

## API Methods

### `checkSend(phoneNumber: string)`

Check if you can send a verification message to the specified phone number.

### `send(options: SendOptions)`

Send a verification message. Use `request_id` from `checkSend()` for free sending.

**Options:**

- `phone_number` - Phone number in E.164 format
- `request_id` - Use from `checkSend()` for free sending
- `code_length` - Code length (4-8 digits)
- `code` - Custom verification code
- `ttl` - Time-to-live in seconds (30-3600)
- `callback_url` - URL for delivery reports
- `payload` - Custom payload (0-128 bytes)

### `checkStatus(requestId: string, code?: string)`

Check verification status and optionally verify a code.

### `revoke(requestId: string)`

Revoke a verification message.

## License

MIT

## Links

- [Telegram Gateway API Documentation](https://core.telegram.org/gateway/api)
