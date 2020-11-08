import helpdesk from "../../Images/techSupport.jpeg";
import user from "../../Images/user.jpeg";

export const HomePageData = [
  {
    title: "Customer Portal",
    subTitle: "Product Issue ",
    description:
      "If you are a customer in need technical asistance, please connect here.",
    image: user,
    buttonText: "Connect",
    userType: "Customer",
  },
  {
    title: "HelpDesk Portal",
    subTitle: "Service Now",
    description:
      "If you are a helpdesk agent, please sign-in to view your pending tickets.",
    image: helpdesk,
    userType: "Support",
  },
];
