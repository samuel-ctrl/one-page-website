import { featureOptionEnum } from "../../common/constant.tsx";

export const HeaderContext = {
  [featureOptionEnum.LUCKY_WHEEL]: {
    requiresAuth: false,
    title: featureOptionEnum.LUCKY_WHEEL,
    subtitle: "Spin to Win Exciting Rewards",
    description:
      "Experience the thrill of chance with our dynamic spinning wheel. Perfect for games, promotions, and interactive events!",
    features: [
      "🎯 Randomized outcomes",
      "🎨 Customizable themes",
      "📱 Cross-device compatibility",
      "🎉 Risk-free entertainment",
    ],
    icon: "🎡",
    Instruction: {
      title: "How to Play",
      points: [
        "Click the SPIN button to start the wheel",
        "Wait for the wheel to stop rotating",
        "View your result in the popup message",
        "Add custom segments using the input field",
      ],
    },
  },
  [featureOptionEnum.DIRECT_CHAT]: {
    requiresAuth: false,
    title: featureOptionEnum.DIRECT_CHAT,
    subtitle: "Secure Direct Messaging",
    description:
      "Instant encrypted communication platform with real-time message synchronization and file sharing capabilities.",
    features: [
      "🔒 Military-grade encryption",
      "💬 Message history",
      "📁 Media sharing",
      "👤 Personalized profiles",
    ],
    icon: "💬",
  },
};
