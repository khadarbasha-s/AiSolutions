import { useState } from "react";
import { useOutlet } from "react-router-dom";

/** Keeps the outlet that was current when this element mounted, so exit animations show the old page. */
export function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}
