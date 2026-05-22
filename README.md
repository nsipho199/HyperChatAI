# HyperChat AI 🤖

<div align="center">

![Platform](https://img.shields.io/badge/Platform-React%20Native-61DAFB?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-Expo-000020?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Stars](https://img.shields.io/github/stars/nsipho199/HyperChatAI?style=social)

**Intelligent Messenger Platform** — AI-powered messaging where communication meets artificial intelligence.

</div>

---

## ✨ Features

### 🧠 Hyper AI Assistant
- **AI as a Real Contact** — Chat naturally with the AI assistant like messaging a person
- **Smart Plus Button** — Camera, gallery, file upload, voice, location, video, audio, and AI tools
- **Real-Time Streaming** — Live typing effect with instant generation feedback
- **Image Analysis** — Upload or capture images for intelligent recognition
- **App Building** — Type "Build a calculator" to generate complete apps
- **Image Generation** — Create logos, wallpapers, icons, and more

### 💬 Messenger Core
- **Chats** — Real-time messaging with contacts
- **Contacts** — Manage your contact list
- **Groups** — Group conversations
- **Channels** — Public broadcasts

### 🔐 Privacy First
```
❌ No ads              ❌ No subscriptions
❌ No in-app purchases ❌ No premium restrictions
❌ No forced monetization
```
**Fully free forever** — Unlimited, open, and privacy-focused.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go (for mobile testing)
- Android Studio / Xcode (for native builds)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd HyperChatAI

# Install dependencies
npm install

# Start development server
npx expo start
```

### Running on Devices

```bash
# iOS (requires macOS)
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

### Environment Variables

Create a `.env` file for API configurations:

```env
# AI Service (optional)
OPENAI_API_KEY=your_api_key
ANTHROPIC_API_KEY=your_api_key
```


---

## 📖 Quick Start

```bash
# Clone and install
git clone https://github.com/nsipho199/HyperChatAI.git
cd HyperChatAI
npm install

# Configure AI (optional)
cp .env.example .env
# Edit .env with your OpenRouter API key

# Run
npx expo start
```

## 🧠 AI Commands

| Command | Action |
|---------|--------|
| `"`Help`"` | See all capabilities |
| `"`Build a [app name]`"` | Generate complete app |
| `"`Generate [image]`"` | Create images |
| `"`Analyze this image`"` | With uploaded photo |

---
## 📁 Project Structure

```
HyperChatAI/
├── App.tsx                 # Main app entry
├── app.json              # Expo configuration
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Icons.tsx     # Emoji-based icon system
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/           # App screens
│   │   ├── ChatsScreen.tsx
│   │   ├── ContactsScreen.tsx
│   │   ├── GroupsScreen.tsx
│   │   ├── ChannelsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ChatScreen.tsx
│   ├── services/          # Business logic
│   │   └── AIService.ts  # AI processing service
│   ├── types/            # TypeScript definitions
│   │   └── index.ts
│   └── utils/             # Utilities
│       └── theme.ts      # Color & styling constants
└── assets/               # Images & fonts
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (`#6366F1`)
- **AI Accent**: Purple (`#8B5CF6`)
- **Background**: Dark Slate (`#0F172A`)
- **Surface**: Elevated surfaces (`#1E293B`)

### Typography
- Clean, modern sans-serif design
- Consistent sizing scale
- High contrast for accessibility

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native | Cross-platform UI |
| Expo SDK 56 | Development platform |
| TypeScript | Type safety |
| React Navigation 7 | Navigation system |
| Expo Camera | Camera integration |
| Expo Image Picker | Media selection |
| Expo Speech | Voice capabilities |

## 🛠️ AI Capabilities

### Image Recognition
- Real-time image understanding
- Smart object detection
- OCR text extraction
- Face and scene analysis
- QR/barcode scanning
- Document summarization

### App Building
```
"Build a calculator"
"Build a messenger app"  
"Build a weather app"
"Build a video editor"
```
→ Generates complete UI, logic, and downloadable APK

### Media Generation
- Images & wallpapers
- Logos & icons
- Stickers & memes
- Avatars & UI designs

## 📱 Screenshots

| Chats | AI Chat | Upload Menu |
|-------|--------|-------------|
| ![Chats](https://via.placeholder.com/300x600/1E293B/6366F1?text=Chats) | ![AI](https://via.placeholder.com/300x600/1E293B/8B5CF6?text=Hyper+AI) | ![Menu](https://via.placeholder.com/300x400/1E293B/334155?text=Upload+Menu) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built with ❤️ using React Native & Expo

---

**HyperChat AI** — Where messaging meets artificial intelligence.