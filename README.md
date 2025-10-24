# Peak Progress - Quit Smoking App

Peak Progress is a motivational web application designed to help users on their journey to quit smoking. By visualizing their progress as climbing a mountain, it provides a positive and encouraging framework to stay smoke-free. The app tracks key metrics, celebrates milestones, and offers personalized insights to keep users motivated.

![Dashboard Screenshot](https://raw.githubusercontent.com/Berk-Unsal/Peak-Progress/main/assets/Peak-Progress-Dashboard.png)

## Features

- **Personalized Dashboard**: Tracks days smoke-free, money saved, and cigarettes avoided.
- **Interactive Mountain Scene**: A dynamic visualization of the user's progress, with a climber ascending a mountain. The scene changes from day to night based on the time.
- **Real-time Timer**: Shows the exact hours, minutes, and seconds since quitting.
- **Health Milestones**: Users unlock badges and see upcoming health benefits at key intervals (e.g., 24 hours, 1 week, 30 days).
- **AI-Powered Recovery Stats**: Provides personalized statistics on lung recovery and health improvements using Google's Gemini model via Genkit.
- **Calendar View**: A pop-up calendar that marks the quit date and visualizes all completed smoke-free days with checkmarks.
- **Daily Motivation**: Displays a new motivational quote each day to provide encouragement.
- **Firebase Authentication**: Secure sign-in with Google and Apple.
- **Progressive Web App (PWA)**: The application can be "installed" on a mobile device's home screen for an app-like experience.

### Recovery Insights
![Recovery Screenshot](https://raw.githubusercontent.com/Berk-Unsal/Peak-Progress/main/assets/Peak-Your-Recovery-Progress.png)

### Progress Calendar
![Calendar Screenshot](https://raw.githubusercontent.com/Berk-Unsal/Peak-Progress/main/assets/Peak-Calendar.png)


## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Authentication**: [Firebase](https://firebase.google.com/) (Auth, Firestore)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

To run the project locally, you will need to have Node.js and npm installed.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Berk-Unsal/Peak-Progress.git
    cd Peak-Progress
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add your Firebase project configuration:
    ```
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.
