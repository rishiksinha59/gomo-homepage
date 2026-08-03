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
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  if (!data) return null;

  const baseProjects = data.projects || [];
  if (baseProjects.length === 0) return null;

  // Quadruple project items for continuous infinite loop effect
  const projects =
    baseProjects.length < 8
      ? [...baseProjects, ...baseProjects, ...baseProjects]
      : baseProjects;

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
        <div className="text-center max-w-[880px] mx-auto mb-10 sm:mb-12 flex flex-col items-center">
          {data.tagline && (
            <p className="font-larken font-thin text-dark text-sm sm:text-base mb-3.5 tracking-wide">
              {data.tagline}
            </p>
          )}

          {data.heading && (
            <h2 className="font-sans text-2xl sm:text-3xl md:text-[40px] text-center font-normal leading-[1.25] text-brand-dark tracking-tight mb-4">
              {data.heading}
            </h2>
          )}

          {data.cta_label && (
            <Link
              href={data.cta_url || "/cases"}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-brand-dark underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span>{data.cta_label}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </Link>
          )}
        </div>
      </Container>

      {/* 2. Full-bleed Edge-to-Edge Carousel Track with Drag / Swipe */}
      <div
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden pt-2 pb-4 cursor-grab active:cursor-grabbing"
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
            className="flex items-center gap-5 sm:gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeIndex * (360 + 24)}px)`,
            }}
          >
            {projects.map((project, idx) => {
              const imageUrl = getStrapiMedia(project.image?.url);

              return (
                <div
                  key={`${project.id || idx}-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className="w-[340px] sm:w-[400px] md:w-[430px] h-[500px] md:h-[560px] rounded-[16px] overflow-hidden relative shrink-0 shadow-lg text-white bg-zinc-900 group cursor-pointer transition-all duration-300"
                >
                  {/* Background Image */}
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title || "Project Image"}
                      fill
                      priority={idx < 4}
                      sizes="(max-width: 768px) 340px, 430px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : null}

                  {/* Frosted Glass Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-black/35 backdrop-blur-xl border-t border-white/15 flex flex-col justify-between pointer-events-auto">
                    {/* Title */}
                    <div className="p-6 pb-4">
                      {project.title && (
                        <h3 className="font-sans text-xl md:text-2xl font-normal tracking-tight text-white mb-1">
                          {project.title}
                        </h3>
                      )}
                    </div>

                    {/* Bottom Info & CTA Bar */}
                    <div className="border-t border-white/15 flex items-center justify-between h-[52px] px-6 text-xs sm:text-sm font-sans text-white/90">
                      <span className="truncate text-white/80 font-sans text-xs sm:text-sm pr-2">
                        {project.subtitle}
                      </span>

                      <Link
                        href={project.cta_url || "#"}
                        className="inline-flex items-center gap-1 text-white hover:underline font-medium shrink-0 group/link"
                      >
                        <span>{project.cta_label || "Read case"}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[1.75]" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Interactive Pagination Dots */}
      {baseProjects.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {baseProjects.map((_, idx) => {
            const isDotActive = idx === activeIndex % baseProjects.length;

            return (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full outline-none ${
                  isDotActive
                    ? "w-3.5 h-3.5 bg-brand-dark scale-110"
                    : "w-2.5 h-2.5 bg-brand-dark/30 hover:bg-brand-dark/60 cursor-pointer"
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
