// @types/redux-persist.d.ts
declare module "redux-persist/integration/react" {
  import { Persistor } from "redux-persist";
  import { ComponentType, ReactNode } from "react";

  export interface PersistGateProps {
    loading?: ReactNode;
    persistor: Persistor;
  }

  export const PersistGate: ComponentType<PersistGateProps>;
  export default PersistGate;
}
