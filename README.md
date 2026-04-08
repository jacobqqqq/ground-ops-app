# Ground Ops

Role-based airport ground operations app for shift visibility, handoff continuity, and worker safety briefings.

**Live demo:** [warehouse-handoff-hub.lovable.app](https://warehouse-handoff-hub.lovable.app)

---

## Background

React rebuild of an internal tool I shipped during a technical operations internship at United Airlines. The original ran on Palantir Foundry, Power Apps, and Power BI.

Ground crews and the C-suite (COO, VP of Logistics, Directors) needed different views of the same operational data — field workers needed real-time productivity tracking, executives needed data-driven goal-setting tools. No single tool served both. Shift handoffs happened through verbal briefings and paper logs, and safety communications were fragmented across notice boards and email.

This repo is a standalone rebuild of the core workflow — shift visibility, handoff continuity, and contextual safety briefings — in a single deployable app.

---

## Features

### Manager view
- Live shift status with active crew count, aircraft queue, avg turnaround, and efficiency metrics
- SFO weather conditions with delay risk indicator
- Active incidents list
- Post Safety Briefings — push categorized announcements (Weather, Incident, General) to ground worker view in real time
- Shift log with handoff notes — flag action items for the incoming shift (e.g., delayed flights, gate reassignments)
- Shift history and metrics tabs

### Ground Ops view
- Incoming shift briefing banner — surfaces the most recent handoff note from the outgoing manager
- Current shift status and assigned gate
- Active incidents
- Safety Briefing panel — contextual safety tips derived from recent incidents (PII abstracted) and management announcements, color-coded by category

Safety briefing design was developed in alignment with United's safety training board guidelines and shift briefing protocols.

---

## Stack

**This repo:** React · TypeScript · Tailwind · shadcn/ui · Vite · Lovable

**Original (United Airlines):** Palantir Foundry · Power Apps · Power BI
