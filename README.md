---

# 🌱 Sprout – AI-Powered Gardening Assistant

Sprout is a modern web application built for gardening enthusiasts. Powered by the **Google Gemini API**, it helps users identify plants from photos, chat with a gardening expert AI, and build a personal **digital garden** to track and manage plants.

---

## 🚀 Features

### 🔍 Plant Identifier

Upload a photo, and AI identifies the plant with:

* Common & scientific names
* Description & care instructions
* Light, soil, water, and toxicity information

### 💬 Gardening Chatbot

Ask any gardening question—watering, pests, propagation, seasonal care—and get AI-powered responses using Gemini chat.

### 🌿 My Garden

Save identified plants to your personal collection for easy access to care info and tracking.

---

## 🛠️ Tech Stack

| Category     | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| Frontend     | React, TypeScript                                           |
| Styling      | Tailwind CSS, Playfair Display & Inter fonts                |
| AI           | Google Gemini API (`gemini-2.5-flash`), `@google/genai` SDK |
| Architecture | Modern ES modules with `importmap` (no build step)          |

---

## 📁 Project Structure

```
.
├── index.html          # Main HTML entry point, import maps, video background
├── index.tsx           # React entry, renders App
├── App.tsx             # Main component, manages tabs and global state
├── components/
│   ├── PlantIdentifier.tsx   # Image upload & plant analysis
│   ├── ChatBot.tsx           # Conversational AI chat interface
│   ├── MyGarden.tsx          # User's saved plants collection
│   └── icons.tsx             # SVG icons as React components
├── services/
│   └── geminiService.ts      # Gemini API wrapper
├── types.ts                  # Shared TypeScript interfaces
└── metadata.json             # Application metadata
```

---

## 🔎 Core Logic Overview

### 🌼 1. Plant Identification

1. User uploads an image.
2. Image is converted to Base64.
3. Structured prompt sent to Gemini API.
4. Response parsed using regex into a `Plant` object.
5. Results displayed and can be saved.

Prompt engineering ensures formatted, consistent, and parseable responses.

---

### 💭 2. Conversational AI Chat

* Chat session initialized using `ai.chats.create()` with custom gardening persona.
* Session retains message history.
* `react-markdown` renders AI responses.
* Auto-scroll and loading states enhance UX.

---

### 🔄 3. State Management

* Global state handled in `App.tsx` using React hooks:

  * `activeTab`: UI navigation
  * `myGarden`: saved plants list
* State passed via props—no external state libraries needed.

---

## ▶️ How to Run

No build tools required — runs directly in your browser.

### 1️⃣ Set your API Key

Export your **Google Gemini API key** in your environment as `API_KEY`.

### 2️⃣ Serve the Project

Use any local web server. Example:

```bash
npm install -g serve
serve .
```

### 3️⃣ Access

Open the local URL (e.g. `http://localhost:3000`) in your browser.

---

## 📜 License

This project is licensed under the **MIT License**.

---
