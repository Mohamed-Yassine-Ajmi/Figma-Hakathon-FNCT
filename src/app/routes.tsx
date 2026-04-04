import { createBrowserRouter } from "react-router";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { RequestsDashboard } from "./screens/RequestsDashboard";
import { FormFillingScreen } from "./screens/FormFillingScreen";
import { StatusTrackingScreen } from "./screens/StatusTrackingScreen";
import { ServicesScreen } from "./screens/ServicesScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingScreen />,
  },
  {
    path: "/chat",
    element: <ChatScreen />,
  },
  {
    path: "/chat/:serviceId",
    element: <ChatScreen />,
  },
  {
    path: "/requests",
    element: <RequestsDashboard />,
  },
  {
    path: "/form/:requestId",
    element: <FormFillingScreen />,
  },
  {
    path: "/status/:requestId",
    element: <StatusTrackingScreen />,
  },
  {
    path: "/services",
    element: <ServicesScreen />,
  },
]);
