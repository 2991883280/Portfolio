import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

const Hero = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const rightTextRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const triangleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        rootRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 }
      );

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".hero-word");
        const viewportH = window.innerHeight;
        const groundY = viewportH - 140; // 贴近页面底部，留一点空间

        // Phase 1: physics-based fall from顶部到接近底部，力度更大
        tl.fromTo(
          words,
          {
            y: -viewportH,
            opacity: 1,
          },
          {
            duration: 1.1,
            physics2D: {
              velocity: 1400,
              angle: 90,
              gravity: 2600,
            },
            stagger: 0.04,
            onComplete: () => {
              // 统一落在靠近底部的一条“地面线”
              gsap.set(words, { y: groundY });
            },
          },
          "-=0.3"
        );

        // Phase 2: 从底部“地面线”快速吸回标题位置
        tl.to(words, {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.03,
        });
      }

      if (circleRef.current) {
        gsap.to(circleRef.current, {
          y: -18,
          x: 10,
          rotation: 360,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (squareRef.current) {
        gsap.to(squareRef.current, {
          y: 24,
          x: -14,
          rotation: -360,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (triangleRef.current) {
        gsap.to(triangleRef.current, {
          y: -22,
          x: -6,
          rotation: 180,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (leftTextRef.current) {
        gsap.to(leftTextRef.current, {
          y: 30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (rightTextRef.current) {
        gsap.to(rightTextRef.current, {
          y: -30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          ">-0.1"
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="hero-root" ref={rootRef}>
      <div className="hero-decor-layer">
        <div className="hero-decor hero-decor-circle" ref={circleRef} />
        <div className="hero-decor hero-decor-square" ref={squareRef} />
        <div className="hero-decor hero-decor-triangle" ref={triangleRef} />
      </div>

      <div className="side-text side-text-left" ref={leftTextRef}>
        <span>DEV · AI · DESIGN</span>
      </div>
      <div className="side-text side-text-right" ref={rightTextRef}>
        <span>PORTFOLIO · 2025</span>
      </div>

      <section className="hero-content">
        <div className="hero-title-block">
          <h1 className="hero-title-main pacifico-regular" ref={titleRef}>
            <span className="hero-word">Dev</span>
            <span className="hero-word">Toolkit</span>
            <span className="hero-word">for</span>
            <br />
            <span className="hero-word">AI</span>
            <span className="hero-word">×</span>
            <span className="hero-word">Design</span>
            <span className="hero-word">Products</span>
          </h1>
        </div>
      </section>
    </main>
  );
};

export default Hero;
