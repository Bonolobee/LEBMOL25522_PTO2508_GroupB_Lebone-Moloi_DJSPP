# 🎧 DJS Portfolio Piece – Podcast App (React)

## 📋 Overview

In this final phase, you will enhance the podcast app you've been building throughout the DJS course. The app already includes a landing page with searchable, sortable, and filterable podcast previews, as well as a show detail page with season toggling.

This project introduces key new features including global audio playback, favouriting episodes, deployment best practices, UI enhancements, and optional listening progress tracking.

Your goal is to build a polished, production-ready React application that offers an engaging and seamless user experience.

> **Tip:** You are encouraged to explore the React ecosystem to help implement features efficiently.

## 🎯 Objectives

- Implement a global audio player with full playback control
- Add support for favouriting episodes with persistent storage
- Introduce a recommended shows carousel on the landing page
- Support theme toggling (light/dark mode)
- Ensure robust routing and deploy the app with professional polish
- Optionally track listening progress across episodes and sessions

## 🚀 Core Features & User Stories

### 🛠️ Setup and Deployment

- Deploy your app to **Vercel** using a **custom domain or URL**
- Add a **custom favicon** for easy identification in browser tabs
- Use tools like [metatags.io](https://metatags.io) to set **rich social media preview metadata**
- Ensure that direct access to dynamic routes (e.g. `/show/1`) works correctly (SPA routing fallback)

### 🔊 Global Audio Player

- Play audio using the provided **placeholder API**
- Keep the player **fixed at the bottom** of the screen across all pages
- Ensure **uninterrupted playback** when navigating between pages
- Provide **play, pause, seek, and progress tracking**
- Add a **confirmation prompt** on page reloads during playback

### ❤️ Favourites

- Allow users to **favourite or unfavourite episodes** via a button/icon
- Use **localStorage** to persist favourites across sessions
- Provide **visual feedback** for favourited items (e.g., filled heart)
- Create a **favourites page** displaying all saved episodes
- Display **associated show and season** for each favourite
- Show the **date/time added** to favourites
- **Group favourites by show title**
- Add **sorting options**:
  - A–Z / Z–A by title
  - Newest / Oldest by date added

### 🎠 Recommended Shows Carousel

- Add a **horizontally scrollable carousel** to the landing page
- Show each show’s **image, title, and genre tags**
- Support **looping** and navigation via **swipe or arrows**
- Clicking a carousel item should navigate to the **show’s detail page**

### 🌗 Theme Toggle

- Include a **toggle** for switching between light and dark mode
- **Persist theme selection** using `localStorage`
- Ensure the **entire app UI updates smoothly**
- Use **appropriate icons** (e.g., sun/moon) to indicate current theme
- Reflect selected theme across all views and components

## 🌟 Stretch Goal – Listening Progress (Optional)

- Save playback position per episode and **resume playback**
- Mark episodes as **"finished"** once fully played
- Display **progress indicators** for episodes in progress
- Allow users to **reset listening history**
- Save listening history in local storage

## ✅ Deliverables

- A fully functional and deployed podcast app
- Source code in **GitHub** with clear commit history
- Live demo link (**Vercel**)
- (Optional) Short demo video

## 💡 Tips

- Prioritise **user experience** and **clean component structure**
- Use **React best practices** (components, hooks, state management)
- Ensure the app is **responsive** and **mobile-friendly**
- Test localStorage and audio persistence thoroughly
- Make use of the **React ecosystem** to accelerate development!

---

## 🧑‍⚖️ Panel Review

After submitting your project, you will be required to present your work to a coach or panel of coaches.

During this session, you must:

- **Demonstrate** all the features you have implemented in your application.
- **Explain** how each feature was built, referring directly to your code (e.g., components, state, hooks, storage).
- Discuss the **decisions** you made during development (e.g., choice of libraries, structure, naming conventions).
- Break down the **logic** behind key functionalities (e.g., how audio persistence or favouriting works).
- Be prepared to answer **questions** from the coaches about your project, code structure, and implementation choices.

This is your opportunity to showcase both your technical and problem-solving skills—treat it like a real-world project revsiew.
