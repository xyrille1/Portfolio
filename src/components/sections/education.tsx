export function EducationSection() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-20">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold pt-1">
          Education
        </h2>
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
            <h3 className="text-lg font-medium text-foreground">
              BS Information Technology
            </h3>
            <span className="text-[11px] text-muted-foreground/50 mono">
              2022 — Present
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Colegio de San Juan de Letran - Manaoag
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Focused on Software Development, Web Development and Data Structures.
            Engaged in building practical solutions and exploring emerging
            technologies.
          </p>
        </div>
      </div>
    );
  }
  