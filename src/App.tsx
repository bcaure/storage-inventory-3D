import { DataContextProvider } from "./shared/DataContextProvider";
import { Dashboard } from "./components/Dashboard.tsx";

export const App = () => {
  return (
    <DataContextProvider>
      <Dashboard />
    </DataContextProvider>
  );
};
