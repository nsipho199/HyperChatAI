# HyperChat AI 🤖

> **Intelligent Messenger Platform** — AI-powered messaging where communication meets artificial intelligence.

![Platform](https://img.shields.io/badge/Platform-React%20Native-61DAFB?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-Expo-000020?style=flat-square)
![Android](https://img.shields.io/badge/Android-12+-3DDC84?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 📱 Download APK

**[⬇️ Download HyperChat AI v1.0.0](https://github.com/nsipho199/HyperChatAI/releases/download/v1.0.0/HyperChatAI.apk)**

**Size:** 30 MB  
**Requires:** Android 12 (API 31) or higher, arm64-v8a architecture

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
- **Settings** — App configuration

### 🔐 Privacy First

```
❌ No ads              ❌ No subscriptions
❌ No in-app purchases ❌ No premium restrictions
❌ No forced monetization
```

**Fully free forever** — Unlimited, open, and privacy-focused.

## 📋 Requirements

| Requirement | Specification |
|-------------|---------------|
| **Android Version** | 12.0 (API 31) or higher |
| **Architecture** | arm64-v8a |
| **RAM** | 3GB minimum |
| **Storage** | 100MB free space |

## 🚀 Installation

1. **Download APK:** [Click here to download](https://github.com/nsipho199/HyperChatAI/releases/download/v1.0.0/HyperChatAI.apk)
2. **Enable Unknown Sources:** 
   - Go to Settings → Apps → HyperChat AI
   - Tap "Install unknown apps" or "Special access"
   - Enable "Install unknown apps"
3. **Install:** Open the downloaded APK and tap Install
4. **Launch:** Open HyperChat AI and start chatting!

## 🔧 Build from Source

```bash
# Clone the repository
git clone https://github.com/nsipho199/HyperChatAI.git
cd HyperChatAI

# Install dependencies
npm install

# Prebuild Expo
npx expo prebuild --platform android

# Build APK
cd android && ./gradlew assembleRelease

# APK Location: android/app/build/outputs/apk/release/app-release.apk
```

## 📁 Project Structure

```
HyperChatAI/
├── App.tsx                 # Main app entry
├── app.json              # Expo configuration
├── src/
│   ├── components/        # Reusable UI components
│   ├── navigation/        # Navigation setup
│   ├── screens/           # App screens
│   │   ├── ChatsScreen.tsx
│   │   ├── ContactsScreen.tsx
│   │   ├── GroupsScreen.tsx
│   │   ├── ChannelsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ChatScreen.tsx
│   ├── services/          # Business logic
│   ├── types/            # TypeScript definitions
│   └── utils/             # Utilities
└── assets/               # Images & fonts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📄 License

MIT License — See LICENSE for details.

---

**HyperChat AI** — Where messaging meets artificial intelligence.
