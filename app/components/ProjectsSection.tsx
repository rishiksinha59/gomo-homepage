"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectsSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface ProjectsSectionProps {
  data: ProjectsSectionData;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [stepWidth, setStepWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  if (!data) return null;

  const baseProjects = data.projects || [];
  if (baseProjects.length === 0) return null;

  // Multiply base projects 8 times for an endless continuous carousel illusion
  const projects = Array.from({ length: 100 }, () => baseProjects).flat();

  // Dynamically calculate exact step width (card width + gap) on mount and resize
  useEffect(() => {
    const updateStepWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const card1 = trackRef.current.children[0] as HTMLElement;
        const card2 = trackRef.current.children[1] as HTMLElement;
        if (card1 && card2) {
          const rect1 = card1.getBoundingClientRect();
          const rect2 = card2.getBoundingClientRect();
          const calculatedStep = rect2.left - rect1.left;
          if (calculatedStep > 0) {
            setStepWidth(calculatedStep);
          }
        }
      }
    };

    updateStepWidth();
    const timeout = setTimeout(updateStepWidth, 200);
    window.addEventListener("resize", updateStepWidth);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateStepWidth);
    };
  }, [projects.length]);

  // Infinite Auto-play carousel timer
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, projects.length]);

  // Touch & Mouse Swipe/Drag Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    dragDistanceRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    dragDistanceRef.current = clientX - startXRef.current;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragDistanceRef.current < -40) {
      // Swiped Left -> Advance Next
      setActiveIndex((prev) => (prev + 1) % projects.length);
    } else if (dragDistanceRef.current > 40) {
      // Swiped Right -> Go Prev
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  return (
    <section className="w-full overflow-hidden select-none">
      {/* 1. Centered Header Section */}
      <Container>
        <div className="text-center max-w-[880px] mx-auto mb-10 sm:mb-16 flex flex-col items-center">
          {data.tagline && (
            <p className="font-larken font-thin text-dark text-sm sm:text-base mb-4 tracking-wide">
              {data.tagline}
            </p>
          )}

          {data.heading && (
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-center font-normal leading-[1.25] text-brand-dark tracking-tight mb-6">
              {data.heading}
            </h2>
          )}

          {data.cta_label && (
            <Link
              href={data.cta_url || "/cases"}
              className="inline-flex items-center gap-1.5 text-xs  font-normal text-brand-dark underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span>{data.cta_label}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </Link>
          )}
        </div>
      </Container>

      {/* 2. Full-bleed Edge-to-Edge Carousel Track with Drag / Swipe */}
      <div
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div
            ref={trackRef}
            className="flex items-center gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeIndex * stepWidth}px)`,
            }}
          >
            {projects.map((project, idx) => {
              const imageUrl = getStrapiMedia(project.image?.url);

              return (
                <div
                  key={`${project.id || idx}-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className="w-[280px] sm:w-[360px] md:w-[442px] h-[380px] sm:h-[450px] md:h-[520px] rounded-[16px] overflow-hidden relative shrink-0 shadow-lg text-white group cursor-pointer transition-all duration-300"
                >
                  {/* Background Image */}
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title || "Project Image"}
                      fill
                      priority={idx < 4}
                      sizes="(max-width: 768px) 340px, 442px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : null}

                  {/* Frosted Glass Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-black/40 backdrop-blur-sm border-t border-white/15 flex flex-col justify-between pointer-events-auto">
                    {/* Title */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4">
                      {project.title && (
                        <h3 className="font-sans text-base sm:text-xl md:text-2xl font-normal tracking-tight text-white line-clamp-1">
                          {project.title}
                        </h3>
                      )}
                    </div>

                    {/* Bottom Info & CTA Bar with vertical divider line */}
                    <div className="border-t border-white/15 flex items-stretch h-[48px] sm:h-[52px] font-sans text-white/90">
                      <div className="flex-1 px-3 sm:px-6 flex items-center border-r border-white/15 min-w-0">
                        <span className="truncate text-white font-sans text-xs sm:text-sm">
                          {project.subtitle}
                        </span>
                      </div>

                      <div className="px-3 sm:px-6 flex items-center shrink-0">
                        <Link
                          href={project.cta_url || "#"}
                          className="inline-flex items-center gap-1 font-normal text-white hover:underline font-medium text-xs sm:text-base shrink-0 group/link"
                        >
                          <span>{project.cta_label || "Read case"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Interactive Pagination Dots (4 Dots matching Figma) */}
      <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10 h-5">
        {Array.from({ length: 4 }).map((_, idx) => {
          const isDotActive = idx === activeIndex % 4;

          return (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full outline-none ${isDotActive
                  ? "w-4 h-4 bg-brand-dark scale-110"
                  : "w-2 h-2 bg-brand-dark/30 hover:bg-brand-dark/60 cursor-pointer"
                }`}
            />
          );
        })}
      </div>
    </section>
  );
}
