import OpenAI from 'openai';
import Constants from 'expo-constants';
import { AIResponse, Message } from '../types';

// HyperChat AI Service with OpenAI Integration
export class AIService {
  private static instance: AIService;
  private client: OpenAI | null = null;
  private apiKey: string | undefined;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  constructor() {
    // Load API key from Expo constants (env vars) or .env
    this.apiKey = Constants.expoConfig?.extra?.openaiApiKey || 
                 process.env.OPENAI_API_KEY ||
                 undefined;
    
    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
        baseURL: 'https://openrouter.ai/api/v1', // Using OpenRouter for API compatibility
      });
      console.log('✅ Hyper AI: API configured');
    } else {
      console.log('⚠️ Hyper AI: Running in demo mode (no API key)');
    }
  }

  // Process text input and generate response
  async processText(text: string, context?: Message[]): Promise<AIResponse> {
    if (!this.client) {
      return this.getMockResponse(text);
    }

    try {
      const lowerText = text.toLowerCase();

      // Handle image generation
      if (lowerText.startsWith('generate ') || lowerText.startsWith('create image') || lowerText.startsWith('make image')) {
        return await this.handleImageGeneration(text);
      }

      // Handle app building
      if (lowerText.startsWith('build ') || lowerText.startsWith('create ') || lowerText.startsWith('make ')) {
        return await this.handleAppBuild(text);
      }

      // Handle image analysis
      if (lowerText.includes('analyze') || lowerText.includes('what\'s in') || lowerText.includes('explain')) {
        return await this.handleImageAnalysis(text);
      }

      // Default: General AI chat
      return await this.handleGeneralChat(text, context);

    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        content: "I encountered an error processing your request. Please try again.",
        type: 'text',
      };
    }
  }

  private async handleGeneralChat(text: string, context?: Message[]): Promise<AIResponse> {
    if (!this.client) {
      return this.getMockResponse(text);
    }

    // Build conversation context
    let systemPrompt = `You are Hyper AI, an intelligent assistant in HyperChat messenger. You can help with:
- Answering questions
- Analyzing images
- Building apps
- Generating images
- Writing code
- Summarizing content
- Translating languages

Be helpful, concise, and friendly. Use markdown formatting when appropriate.`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ];

    const completion = await this.client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages,
      max_tokens: 1000,
      stream: false,
    });

    return {
      content: completion.choices[0]?.message?.content || "I'm not sure how to respond to that.",
      type: 'text',
    };
  }

  private async handleImageGeneration(request: string): Promise<AIResponse> {
    if (!this.client) {
      return this.getMockResponse(request);
    }

    const prompt = request
      .replace(/^(generate|create|image|make)\s+/gi, '')
      .replace(/^(a|an)\s+/gi, '')
      .replace(/\?$/, '')
      .trim();

    try {
      const image = await this.client.images.generate({
        model: 'openai/dall-e-3',
        prompt: prompt,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      });

      return {
        content: `🎨 **Image Generated!**\n\nPrompt: "${prompt}"\n\nYour image has been created!`,
        type: 'image',
        metadata: {
          imageUrl: image.data?.[0]?.url || '',
          progress: 'Complete',
        },
      };
    } catch (error) {
      return {
        content: "I couldn't generate the image. Please try a different description.",
        type: 'text',
      };
    }
  }

  private async handleAppBuild(request: string): Promise<AIResponse> {
    if (!this.client) {
      return this.getMockResponse(request);
    }

    const appType = request
      .replace(/^(build|create|make)\s+/i, '')
      .replace(/\?$/, '')
      .trim();

    try {
      const completion = await this.client.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an app building assistant. When asked to build an app, generate:
1. A brief description of the app
2. The main features
3. Basic React Native/Expo code structure

Keep responses concise and actionable.`
          },
          {
            role: 'user',
            content: `Build a ${appType} app. Provide a concise plan and basic code structure.`
          }
        ],
        max_tokens: 1500,
      });

      return {
        content: `🛠️ **Building ${this.capitalize(appType)} App**\n\n${completion.choices[0]?.message?.content}`,
        type: 'app',
        metadata: {
          progress: 'Complete',
          generatedCode: completion.choices[0]?.message?.content || '',
        },
      };
    } catch (error) {
      return {
        content: "I couldn't build the app right now. Please try again.",
        type: 'text',
      };
    }
  }

  private async handleImageAnalysis(text: string): Promise<AIResponse> {
    if (!this.client) {
      return this.getMockResponse(text);
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert image analyst. Analyze the uploaded image and provide:
1. What you see
2. Key elements detected
3. Any text found (OCR)
4. Suggestions or recommendations

Be thorough but concise.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 800,
      });

      return {
        content: `📷 **Image Analysis Complete**\n\n${completion.choices[0]?.message?.content}`,
        type: 'text',
      };
    } catch (error) {
      return {
        content: "I couldn't analyze the image. Please try uploading again.",
        type: 'text',
      };
    }
  }

  private getMockResponse(text: string): AIResponse {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('help')) {
      return {
        content: `🧠 **Hyper AI Assistant**\n\nI'm your AI assistant! Here's what I can do:\n\n**📷 Image Analysis**\n• Upload/capture images for analysis\n• Explain UI issues\n• Extract text (OCR)\n\n\n**🛠️ App Building**\n• "Build a calculator"\n• Apps are generated automatically\n\n**🎨 Image Generation**\n• "Generate a futuristic logo"\n• Create wallpapers, icons\n\n**📝 Other Tasks**\n• Summarize & translate\n• Write documents\n• Debug code\n\nWhat would you like to try?`,
        type: 'text',
      };
    }

    if (lowerText.startsWith('build') || lowerText.startsWith('create') || lowerText.startsWith('make')) {
      const appType = text.replace(/^(build|create|make)\s+/i, '').trim();
      return {
        content: `🔨 **Building ${this.capitalize(appType)}**\n\nI'm creating your ${appType} app!\n\n**Status:** Ready to build\n**Features planned:**\n• User interface\n• Core functionality\n• Ready for download`,
        type: 'app',
        metadata: { progress: 'Ready' },
      };
    }

    if (lowerText.startsWith('generate') || lowerText.startsWith('create image')) {
      return {
        content: `🎨 **Generating Image**\n\nProcessing your request...\n\n**Style:** High quality\n**Size:** 1024x1024`,
        type: 'image',
        metadata: { progress: 'Generating...' },
      };
    }

    return {
      content: `I understand you're saying: "${text}"\n\n🧠 Powered by Hyper AI!\n\nTry saying "help" to see all capabilities.`,
      type: 'text',
    };
  }

  // Stream response for typing effect (when streaming is needed)
  async *streamResponse(text: string, context?: Message[]): AsyncGenerator<string, void, unknown> {
    if (!this.client) {
      const response = this.getMockResponse(text);
      const words = response.content.split(' ');
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 30));
        yield word;
      }
      return;
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: text }],
        max_tokens: 1000,
        stream: true,
      });

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
    } catch (error) {
      yield "I encountered an error. Please try again.";
    }
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isConfigured(): boolean {
    return !!this.client;
  }
}

export default AIService;