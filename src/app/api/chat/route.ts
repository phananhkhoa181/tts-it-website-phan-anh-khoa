import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini SDK with API Key
// Do not initialize genAI globally if we want to pick a random key per request
// We will parse the keys inside the POST handler


const SYSTEM_PROMPT = `
Bạn là AI chuyên gia tư vấn sản phẩm độc quyền cho Apple Watch Series 5.
Nhiệm vụ của bạn: CHỈ trả lời các câu hỏi liên quan đến tính năng, thông số kỹ thuật, giá trị và thông tin về Apple Watch Series 5.
Các thông số cơ bản:
- Màn hình: LTPO OLED Retina, Always-On (Luôn sáng), độ sáng 1000 nits.
- Pin: Lên đến 18 giờ.
- Chất liệu: Nhôm tái chế, Thép không gỉ, Titanium và Gốm.
- Chip: S5 SiP 64-bit dual-core, chip không dây W3.
- Tính năng sức khỏe: Đo Điện Tâm Đồ (ECG), Cảnh báo nhịp tim bất thường, Theo dõi Tiếng Ồn (Noise app), Theo dõi Chu kỳ (Cycle Tracking), Ứng dụng Hít thở (Breathe). KHÔNG có tính năng đo SpO2 (Oxy trong máu) trên bản này.
- Thể thao & Kết nối: Chống nước 50m, La bàn tích hợp, GPS, LTE, Apple Pay.

Quy tắc bắt buộc:
1. Nếu người dùng hỏi về bất kỳ thiết bị nào khác (Apple Watch Series 6, 7, iPhone, Samsung, v.v.), hoặc bất kỳ chủ đề nào khác ngoài phạm vi, hãy lịch sự từ chối và nói rằng bạn chỉ là trợ lý tư vấn cho Apple Watch Series 5.
2. Trả lời ngắn gọn, súc tích, thân thiện và chuyên nghiệp. KHÔNG trả lời quá dài dòng (dưới 150 chữ).
3. QUAN TRỌNG: Phải tự động nhận diện ngôn ngữ của người dùng. Nếu người dùng nhập "hi", "hello" hoặc hỏi bằng Tiếng Anh, bạn BẮT BUỘC phải trả lời bằng Tiếng Anh (English). Nếu người dùng nhập tiếng Việt, trả lời bằng tiếng Việt.
`;

export async function POST(req: Request) {
  try {
    const apiKeysString = process.env.GEMINI_API_KEY || "";
    // Split by comma to support multiple keys, filter out empty spaces
    const apiKeys = apiKeysString.split(",").map(k => k.trim()).filter(k => k);
    
    if (apiKeys.length === 0) {
      return NextResponse.json(
        { error: "API Key chưa được cấu hình. Vui lòng kiểm tra file .env.local" },
        { status: 500 }
      );
    }

    // Pick a random key from the array (Load Balancing / Rate Limit avoidance)
    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
    const genAI = new GoogleGenerativeAI(randomKey);

    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // Use Gemini 2.5 Flash for fast chatbot interactions
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });

    const chat = model.startChat({
      history: [],
    });

    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();

    return NextResponse.json({ message: responseText });
  } catch (error) {
    const err = error as Error;
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: "Lỗi kết nối AI: " + (err.message || "Vui lòng thử lại sau.") },
      { status: 500 }
    );
  }
}
