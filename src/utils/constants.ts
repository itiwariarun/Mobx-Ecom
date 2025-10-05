import { Transition } from "framer-motion";

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export const pageTransition: Transition<any> = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};
 export const navigation = [{ name: "Home", href: "/", current: true }];
 export const skeletons = Array.from({ length: 6 });
