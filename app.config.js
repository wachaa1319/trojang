module.exports = {
  expo: {
    name: "trojung",
    slug: "trojang",
    owner: "bunyasit",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/trolljang.png",
    splash: {
      image: "./assets/spladd.png",
      resizeMode: "contain",
      backgroundColor: "#220035",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/c90b8cf8-bce9-4072-98f5-b891bdd2072c",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bunyasit.trojang",
      buildNumber: "2",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptroll.png",
        backgroundColor: "#220035",
      },
      package: "com.bunyasit.trojang",
      versionCode: 3,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "c90b8cf8-bce9-4072-98f5-b891bdd2072c",
      },
    },
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};
