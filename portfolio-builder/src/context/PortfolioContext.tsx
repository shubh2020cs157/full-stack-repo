import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Types
interface PortfolioState {
  name: string;
  profilePicture: string | null;
  backgroundColor: string;
  isLoading: boolean;
}

interface PortfolioContextType {
  state: PortfolioState;
  updateName: (name: string) => void;
  updateProfilePicture: (picture: string | null) => void;
  updateBackgroundColor: (color: string) => void;
  setLoading: (loading: boolean) => void;
}

// Initial state
const initialState: PortfolioState = {
  name: "",
  profilePicture: null,
  backgroundColor: "#f8fafc",
  isLoading: false,
};

// Action types
type PortfolioAction =
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_PROFILE_PICTURE"; payload: string | null }
  | { type: "UPDATE_BACKGROUND_COLOR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

// Reducer
const portfolioReducer = (
  state: PortfolioState,
  action: PortfolioAction
): PortfolioState => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_PROFILE_PICTURE":
      return { ...state, profilePicture: action.payload };
    case "UPDATE_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Context
const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

// Provider component
interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const updateName = (name: string) => {
    dispatch({ type: "UPDATE_NAME", payload: name });
  };

  const updateProfilePicture = (picture: string | null) => {
    dispatch({ type: "UPDATE_PROFILE_PICTURE", payload: picture });
  };

  const updateBackgroundColor = (color: string) => {
    dispatch({ type: "UPDATE_BACKGROUND_COLOR", payload: color });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const value: PortfolioContextType = {
    state,
    updateName,
    updateProfilePicture,
    updateBackgroundColor,
    setLoading,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook
export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
