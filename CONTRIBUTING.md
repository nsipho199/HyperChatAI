# Contributing to HyperChat AI 🤖

Thank you for your interest in contributing to HyperChat AI!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## 📜 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you agree to uphold this code.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/HyperChatAI.git
   cd HyperChatAI
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/nsipho199/HyperChatAI.git
   ```

## 💻 Development Setup

```bash
# Install dependencies
npm install

# Start development
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run on Web
npx expo start --web
```

## 🔧 Making Changes

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following the [Style Guide](#style-guide)

3. **Test your changes**:
   ```bash
   npx tsc --noEmit  # Type check
   ```

4. **Commit your changes** with clear messages:
   ```bash
   git commit -m "feat: add amazing new feature"
   git commit -m "fix: resolve issue with chat loading"
   ```

## 📤 Pull Request Process

1. **Update & sync** your fork with upstream:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

3. **Open a Pull Request** on GitHub

4. **Fill out the PR template**:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots for UI changes
   - Testing notes

5. Your PR will be reviewed and merged!

## 📐 Style Guide

### Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### TypeScript

- Use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use meaningful variable names

### React Native / Expo

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use `StyleSheet.create()` for styles

## 🐛 Reporting Issues

- Use the [Bug Report template](./.github/ISSUE_TEMPLATE/bug_report.yml)
- Include platform, app version, and steps to reproduce
- Add screenshots if applicable

## 💡 Suggesting Features

- Use the [Feature Request template](./.github/ISSUE_TEMPLATE/feature_request.yml)
- Explain the problem your feature solves
- Describe the proposed solution

## 📖 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Thank you for contributing to HyperChat AI!** 🎉