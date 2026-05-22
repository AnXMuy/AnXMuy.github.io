---
title: "Open-Vocabulary Remote Sensing: Failure Modes"
date: 2026-03-06
category: "Vision"
summary: "A compact taxonomy of common failure patterns and which diagnostics typically reveal root causes early."
image: "/images/describeearth.png"
cta: "Read Article"
---

Open-vocabulary perception for remote sensing looks flexible on paper, but failure cases accumulate quickly once scenes become dense, long-range, or semantically ambiguous. Small objects, uncommon land-use categories, and subtle spatial relations can all break otherwise strong models.

I usually separate these errors into a few buckets. Some come from vocabulary mismatch, where the concept exists but the model does not anchor it reliably in remote sensing imagery. Some come from localization drift, especially when background textures are repetitive. Others come from scale confusion, where large geographic context and local visual evidence pull the prediction in different directions.

This taxonomy matters because each bucket suggests a different intervention. Better text supervision does not solve everything, and stronger image encoders do not automatically fix semantic grounding. The earlier I classify the failure correctly, the less time I waste optimizing the wrong component.
