"use strict";
// // import twilio from 'twilio';
// // import dotenv from 'dotenv';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderWithReplyButton = exports.sendSMS = void 0;
// import { client } from "../config/twilio.config";
// // dotenv.config(); // Load environment variables
// // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// // export const sendSMS = async (to: string, message: string) => {
// //   try {
// //     const sentMessage = await client.messages.create({
// //       body: message,
// //       from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
// //       to: to, // Recipient's phone number
// //     });
// //     console.log('Message sent successfully:', sentMessage.sid);
// //   } catch (error) {
// //     console.error('Error sending SMS:', error);
// //   }
// // };
// import twilio from 'twilio';
// import dotenv from 'dotenv';
// dotenv.config();
// if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
//   throw new Error('Twilio environment variables are not set properly.');
// }
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// export const sendSMS = async (to: string, message: string): Promise<void> => {
//   if (!to || !message) {
//     throw new Error('Phone number and message are required.');
//   }
//   try {
//     const sentMessage = await client.messages.create({
//       body: message,
//       from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
//       to: 'whatsapp:' + to,
//     });
//     console.log('WhatsApp message sent successfully:', sentMessage.sid);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error sending WhatsApp message:', error.message);
//       throw error;
//     } else {
//       console.error('Unknown error sending WhatsApp message:', error);
//       throw new Error('Unknown error occurred while sending WhatsApp message.');
//     }
//   }
// };
// export const sendSMS = async (to: string, message: string): Promise<string> => {
//   if (!to || !message) {
//     throw new Error('Phone number and message are required.');
//   }
//   try {
//     const sentMessage = await client.messages.create({
//       body: message,
//       from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
//       to: 'whatsapp:' + to,
//     });
//     console.log('WhatsApp message sent successfully:', sentMessage.sid);
//     return sentMessage.sid;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error sending WhatsApp message:', error.message);
//       throw error;
//     } else {
//       console.error('Unknown error sending WhatsApp message:', error);
//       throw new Error('Unknown error occurred while sending WhatsApp message.');
//     }
//   }
// };
// sms.util.ts
// import twilio from 'twilio';
// import dotenv from 'dotenv';
// dotenv.config(); // Make sure environment variables are loaded
// const accountSid = process.env.TWILIO_ACCOUNT_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const fromNumber = process.env.TWILIO_PHONE_NUMBER!;
// if (!accountSid || !authToken || !fromNumber) {
//   throw new Error('Twilio credentials or phone number missing in environment variables');
// }
// const client = twilio(accountSid, authToken);
// /**
//  * Send WhatsApp message using Twilio
//  * @param to Recipient phone number (with country code, e.g., +85620xxxxxxx)
//  * @param message Text message to send
//  * @returns Message SID string
//  */
// export const sendSMS = async (to: string, message: string): Promise<string> => {
//   if (!to || !message) {
//     throw new Error('Phone number and message are required.');
//   }
//   try {
//     const sentMessage = await client.messages.create({
//       body: message,
//       from: `whatsapp:${fromNumber}`,  // WhatsApp sender (your Twilio WhatsApp-enabled number)
//       to: `whatsapp:${to}`,            // WhatsApp recipient
//     });
//     console.log('WhatsApp message sent successfully:', sentMessage.sid);
//     return sentMessage.sid;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error sending WhatsApp message:', error.message);
//       throw error;
//     } else {
//       console.error('Unknown error sending WhatsApp message:', error);
//       throw new Error('Unknown error occurred while sending WhatsApp message.');
//     }
//   }
// };
// sms.utils.ts
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Twilio credentials or phone number missing in environment variables');
}
const client = (0, twilio_1.default)(accountSid, authToken);
/**
 * ส่งข้อความ WhatsApp ธรรมดา (text message)
 * @param to หมายเลขปลายทาง (รวมรหัสประเทศ เช่น +85620xxxxxxx)
 * @param message ข้อความที่ต้องการส่ง
 * @returns SID ของข้อความที่ส่ง
 */
const sendSMS = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!to || !message) {
        throw new Error('Phone number and message are required.');
    }
    try {
        const sentMessage = yield client.messages.create({
            body: message,
            from: `whatsapp:${fromNumber}`,
            to: `whatsapp:${to}`,
        });
        console.log('WhatsApp message sent successfully:', sentMessage.sid);
        return sentMessage.sid;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error sending WhatsApp message:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error sending WhatsApp message:', error);
            throw new Error('Unknown error occurred while sending WhatsApp message.');
        }
    }
});
exports.sendSMS = sendSMS;
/**
 * ส่ง WhatsApp Message แบบ Template พร้อมปุ่ม Reply (Quick Reply)
 * @param to หมายเลขปลายทาง (รวมรหัสประเทศ เช่น +85620xxxxxxx)
 * @param serviceData ข้อมูลที่จะแทนที่ตัวแปรใน Template
 * @returns SID ของข้อความที่ส่ง
 */
const sendOrderWithReplyButton = (to, serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!to)
        throw new Error('Phone number is required.');
    const fullTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    try {
        const message = yield client.messages.create({
            from: `whatsapp:${fromNumber}`,
            to: fullTo,
            contentSid: 'HX9c25d6dc1739f6b92c7b37a567e978b8', // ใช้ template SID ของคุณ
            contentVariables: JSON.stringify({
                "1": serviceData.contact,
                "2": serviceData.locationName,
                "3": serviceData.villageName,
                "4": serviceData.details,
                "5": serviceData.mapLink,
            }),
        });
        console.log('WhatsApp Template with reply button sent:', message.sid);
        return message.sid;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error sending WhatsApp template message:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error sending WhatsApp template message:', error);
            throw new Error('Unknown error occurred while sending WhatsApp template message.');
        }
    }
});
exports.sendOrderWithReplyButton = sendOrderWithReplyButton;
