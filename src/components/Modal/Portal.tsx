import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

function Portal({ isOpen, children }: PropsWithChildren<{ isOpen: boolean }>) {
  if (!isOpen) return null;
  console.timeLog(!isOpen);
  return createPortal(<div>{children}</div>, document.querySelector("#portal") as Element);
}

export default Portal;
