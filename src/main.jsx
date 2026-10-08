import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Top-level / General pages
import SplashPage from './pages/SplashPage.jsx';
import Community from './pages/Community.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Auth flow
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';

// Onboarding flow
import Onboarding from './pages/onboarding/Onboarding.jsx';
import Onboarding2 from './pages/onboarding/Onboarding2.jsx';
import Onboarding3 from './pages/onboarding/Onboarding3.jsx';
import VibeSetup from './pages/onboarding/VibeSetup.jsx';

// Places & Discovery flow
import AreaPicker from './pages/onboarding/AreaPicker.jsx';
import Businesses from './pages/locations/Businesses.jsx';
import DiscoverPage from './pages/locations/DiscoverPage.jsx';
import FilterPage from './pages/locations/FilterPage.jsx';
import Map from './pages/locations/Map.jsx';
import PlaceDetailPage from './pages/locations/PlaceDetailPage.jsx';
import ResultPage from './pages/locations/ResultPage.jsx';
import WriteReview from './pages/WriteReview.jsx';

// Profile & User flow
import Profile from './pages/profile/Profile.jsx';
import Saved from './pages/profile/Saved.jsx';
import SavedList from './pages/profile/SavedList.jsx';
import CreateList from './pages/profile/CreateList.jsx';
import GroupPlanning from './pages/profile/GroupPlanning.jsx';
import Notifications from './pages/profile/Notifications.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/onboarding2",
    element: <Onboarding2 />,
  },
  {
    path: "/onboarding3",
    element: <Onboarding3 />,
  },
  {
    path: "/vibe",
    element: <VibeSetup />,
  },
  {
    path: "/area-picker",
    element: <AreaPicker />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/businesses",
    element: <Businesses />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/saved-list",
    element: <SavedList />,
  },
  {
    path: "/create-list",
    element: <CreateList />,
  },
  {
    path: "/group-planning",
    element: <GroupPlanning />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/results",
    element: <ResultPage />,
  },
  {
    path: "/detail",
    element: <PlaceDetailPage />,
  },
  {
    path: "/writereview",
    element: <WriteReview />,
  },
  {
    path: "/filter",
    element: <FilterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);