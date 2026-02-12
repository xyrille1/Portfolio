import { SKILLS } from '@/lib/data';

export function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-20">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold pt-1">
        Stack
      </h2>
      <div className="space-y-12">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div key={category}>
            <h4 className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mb-5">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
