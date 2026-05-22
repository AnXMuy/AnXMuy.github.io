---
title: "Interactive ASR: What Changed After the First Release"
date: 2026-05-18
category: "Research Log"
summary: "A practical retrospective on data iteration, model behavior, and evaluation signals that mattered most in real interactive settings."
image: "/images/interactiveasr_interspeech.png"
cta: "Read Article"
---

The first public version of Interactive ASR made one thing obvious: raw word error rate did not fully explain whether a conversation actually felt successful. In multi-turn correction settings, users cared more about whether the system recovered intent quickly than whether every intermediate transcript was perfectly clean.

After the first release, I focused on three kinds of changes. The first was data iteration: I added more examples where the speaker reformulates naturally instead of repeating the same phrase verbatim. The second was error analysis: I grouped failures by misunderstanding source, such as acoustic confusion, entity drift, or overconfident semantic completion. The third was evaluation: I paid more attention to signals that tracked interaction quality instead of only final transcript overlap.

The practical lesson was that an interactive speech system needs to optimize for recovery behavior. If the model makes a mistake, it must still leave the conversation in a state where the next user turn can fix the problem with minimal friction. That requirement changed how I read logs, design prompts, and interpret benchmark results.
