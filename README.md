===================================================================================================  Backend  ======================================================================================================
### Project Folder Structure

```
server/
│
├── index.js                # Main entry point for the server
│
├── controller/              # Folder containing the controller logic
│   └── user.js              # User controller
│
├── router/                  # Folder containing route definitions
│   └── user.js              # User routes
│
└── Database/                # Folder containing database connection and related logic
    └── mySql.js             # MySQL database connection setup
```

### Server Setup

1. **To run the server**, use the following command:

   ```bash
   npm start
   ```

   This will start the server on the configured port (usually `4040` by default).

### API Example

The API will be available locally and can be accessed using your system's IP address. Here's an example of how to construct the API URL:

For example, if your system IP is `192.168.93.140`, you can access the `register` endpoint like this:

```
http://192.168.93.140:4040/register
```

You can replace `register` with other endpoints as required.

---

### Explanation

- **index.js**: This is the entry point of your server, where the app is initialized and listens for requests.
- **controller/user.js**: Contains the logic for handling requests related to user operations.
- **router/user.js**: Defines the routes related to user functionalities and maps them to the appropriate controller functions.
- **db/db.js**: Manages the connection to your MySQL database.

Make sure to replace `localhost` with your actual system IP address when testing or sharing the API with others on the same network. This allows the API to be accessible from devices other than the one running the server.

--- 


======================================================================================================== Frontend =================================================================================================


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
