"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GeometricShapes() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 60]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] -right-[100px] w-[300px] h-[300px] rounded-full border-2 border-ebo-green/[0.04] dark:border-ebo-lime/[0.03] animate-float"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] -left-[50px] w-[150px] h-[150px] border-2 border-ebo-lime/[0.04] dark:border-ebo-lime/[0.03] rotate-45 animate-spin-slow"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[20%] right-[10%] w-[80px] h-[80px] rounded-full bg-ebo-green/[0.03] dark:bg-ebo-lime/[0.02] animate-pulse-slow"
      />
      <div className="absolute top-[60%] left-[5%] w-[200px] h-px bg-ebo-green/[0.04] dark:bg-ebo-lime/[0.03] -rotate-[15deg]" />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[10%] left-[15%] w-[60px] h-[60px] border border-ebo-lime/[0.04] dark:border-ebo-lime/[0.03] rounded-lg rotate-[20deg] animate-float"
      />
    </div>
  );
}
