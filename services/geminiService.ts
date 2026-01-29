
import { GoogleGenAI, Modality } from "@google/genai";

// Use process.env.API_KEY directly and initialize inside functions to ensure the latest key is used.
export const getGeminiChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [...history, { role: "user", parts: [{ text: message }] }],
    config: {
      systemInstruction: "Eres 'Pipo', un robot amigo de niños con Síndrome de Down. Habla de forma MUY sencilla, cariñosa, paciente y alentadora. Usa frases cortas. Tu objetivo es divertirlos y enseñarles cosas básicas del mundo.",
    }
  });
  return response;
};

export const generateSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Dilo con voz muy dulce y clara para un niño: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};

// Manual implementation of decode (base64 to bytes) as required by guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Manual implementation of decodeAudioData (raw PCM to AudioBuffer) as required by guidelines
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Helper to decode PCM audio data from Gemini using guideline-compliant logic
export const decodePCM = async (base64: string, audioCtx: AudioContext): Promise<AudioBuffer> => {
  const bytes = decode(base64);
  // Gemini TTS returns raw PCM data at 24kHz, 1 channel
  return decodeAudioData(bytes, audioCtx, 24000, 1);
};
