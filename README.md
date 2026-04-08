# Ground Ops

Role-based airport ground operations app for shift visibility and handoff continuity.

Built as a React rebuild of an internal tool I shipped at United Airlines — the original ran on Palantir Foundry, Power Apps, and Power BI. I recreated the core workflow in a single deployable app.

**Live demo:** [warehouse-handoff-hub.lovable.app](https://warehouse-handoff-hub.lovable.app)

---

### Background

At United, ground crews and the C-suite (COO, VP of Logistics, Directors) needed different views of the same operational data — field workers needed real-time productivity tracking, executives needed data-driven goal-setting. No single tool served both.

I self-taught Palantir Foundry (Ontology, Workshop, Pipeline Builder) and built the data pipelines and dashboards from scratch. The pilot deployed to 100+ users across the logistics org, with Foundry pipelines integrated into Power BI for governance across a $3.5B inventory network.

This repo is a standalone rebuild of the core shift visibility and handoff workflow.

---

### Views

**Manager** — active crew, aircraft queue, avg turnaround, efficiency, SFO weather, active incidents, shift log, and handoff acknowledgment.

**Ground Ops** — scoped to current shift status, assigned gate, and active incidents. No logging, no metrics.

---

### Stack
React · TypeScript · Tailwind · shadcn/ui · Vite

Original: Palantir Foundry · Power Apps · Power BI
