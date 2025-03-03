"use client";

import {
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import Twitter from "./Icons/Twitter";
import type { MediaMultiple, MediaSimple } from "@/interfaces/Strapi";

interface SharedModalProps {
  imageId?: string;
  images: any;
  onChange?: (newVal: string) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export default function SharedModal({
  imageId,
  images,
  closeModal,
  navigation,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(direction ?? 0);
  const [currentIndex, setCurrentIndex] = useState(
    imageId ? images.data.findIndex((image:{id:string} ) => image.id === imageId) : 0
  );

  const currentImage = useMemo(() => {
    return images[currentIndex];
  }, [currentIndex, images]);

  const moveLeft = useCallback(() => {
    setAnimationDirection(-1);
    currentIndex && setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const moveRight = useCallback(() => {
    setAnimationDirection(1);
    const size = images.length - 1;
    return size > currentIndex && setCurrentIndex(currentIndex + 1);
  }, [currentIndex, images?.length]);

  const handlers = useSwipeable({
    onSwipedLeft: moveLeft,
    onSwipedRight: moveRight,
    trackMouse: true,
  });

  const handleNavigationClick = (index: number) => {
    setAnimationDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                custom={animationDirection}
                variants={variants()}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                {currentImage && (
                  <Image
                    src={currentImage || ""}
                    width={navigation ? 1280 : 1920}
                    height={navigation ? 853 : 1280}
                    priority
                    alt="Chisfis listing gallery"
                    onLoadingComplete={() => setLoaded(true)}
                    sizes="(max-width: 1025px) 100vw, 1280px"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={moveLeft}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={moveRight}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  {navigation ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {/* {images?.map(({ attributes, id }, index) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((currentIndex - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: currentIndex === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(currentIndex * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => handleNavigationClick(index)}
                      key={id}
                      className={`${
                        currentIndex === index
                          ? "z-20 rounded-md shadow shadow-black/50"
                          : "z-10"
                      } ${currentIndex === 0 ? "rounded-l-md" : ""} ${
                        currentIndex === images.data.length - 1
                          ? "rounded-r-md"
                          : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <Image
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={`${
                          currentIndex === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={attributes.url || ""}
                      />
                    </motion.button>
                  ))} */}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
