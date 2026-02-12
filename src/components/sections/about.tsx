export function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-20">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold pt-1">
        About
      </h2>
      <div className="space-y-6 max-w-2xl text-sm md:text-[15px] text-muted-foreground leading-relaxed">
        <p>
          As a Full-Stack Developer, I specialize in architecting sophisticated
          web solutions with a primary focus on Front-End excellence and Web3
          integration. My expertise lies in building dynamic, data-driven
          platforms designed for high performance and maximum security.
        </p>
        <p>
          I distinguish my work by integrating comprehensive SEO strategies
          directly into the development lifecycle. From optimizing core
          performance metrics to implementing advanced rendering patterns, I
          ensure that decentralized platforms are technically robust and
          discoverable.
        </p>
      </div>
    </div>
  );
}
