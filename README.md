
# 🎯 GoalApp

A beautifully designed goal-tracking mobile application built with **React Native**, featuring a pink theme, custom **Poppins** font, smooth animations, dark mode support, and persistent storage.

## 🚀 Features

- 📌 Add, view, and remove personal goals
- 🌙 Light & Dark mode with persistent theme preference
- ✨ Smooth UI animations and transitions
- 🎨 Custom `Poppins` font across all UI components
- 🧠 Uses `uuid` for unique goal IDs
- 💾 Local storage to save goals between app launches (via `AsyncStorage`)
- 💅 Polished, responsive, and minimalist UI

## 📸 Screenshots

> ![Add Goal Screen]
(![WhatsApp Image 2025-05-18 at 3 13 42 PM (2)](https://github.com/user-attachments/assets/43eedcab-16ac-44f2-bcfb-96bda187359c))
(![WhatsApp Image 2025-05-18 at 3 13 42 PM](https://github.com/user-attachments/assets/ac7513be-ead9-43d8-9dc4-586799463898)!)

> ![Dark Mode]

(![WhatsApp Image 2025-05-18 at 3 13 42 PM (1)](https://github.com/user-attachments/assets/c04b778e-2ec2-4ee9-9980-327b4eb3cba7))

(![WhatsApp Image 2025-05-18 at 3 13 41 PM](https://github.com/user-attachments/assets/0f6bf58d-b4a9-416a-9a6b-664a36a564a2))




## 🛠️ Tech Stack

- **React Native**
- **Expo**
- **React Native Reanimated** – for animations
- **react-native-get-random-values** – UUID support in Hermes engine
- **AsyncStorage** – for saving goals
- **React Native Vector Icons** – for icons

## 📦 Installation

```bash
git clone https://github.com/Esdeath4l/GoalApp.git
cd GoalApp
npm install
````

### 🔃 Run the App

Using **Expo CLI**:

```bash
npx expo start
```

Make sure to have the Expo Go app installed on your device or an Android/iOS emulator running.

## ⚙️ Custom Font Setup

This app uses the `Poppins` font. Ensure it's linked and loaded correctly inside your app entry point:

```js
import * as Font from 'expo-font';

await Font.loadAsync({
  'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
  'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
});
```

## 📁 Folder Structure (Simplified)

```
GoalApp/
├── assets/
│   └── images and sounds/
├── components/
│   └── GoalItem.js
├── screens/
│   └── HomeScreen.js
├── App.js
└── fonts
```

## 📌 Todo / Improvements

* [done] Add persistent dark mode toggle
* [done] Include polished animations
* [done] Use UUID for goal IDs
* [ ] Add swipe-to-delete
* [ ] Add calendar or deadline feature
* [ ] Enable goal editing

## 👩‍💻 Author

**Ritika S.**
[GitHub](https://github.com/Esdeath4l) • [LinkedIn] (https://www.linkedin.com/in/ritika-s-a004b527b/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
