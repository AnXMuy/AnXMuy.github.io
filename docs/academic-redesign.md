# Academic homepage refinement

## Goal and agreed direction

Use the compact academic hierarchy of yutaoling.github.io: a narrow identity column and a readable, denser main column. Keep a small personal brand mark and a restrained blue accent. Replace oversized decorative sections, the illustrated footer and motivational slogans with clear academic information.

The user's confirmed research focus is Audio-Visual Intelligence: how audio-visual systems understand and represent the world and interact and collaborate with people. Frame research interests around multimodal understanding / representation and human interaction / collaboration, without inferring video projects or results. Current speech work remains in publications and research experience. Remote sensing is earlier research experience. Use a smaller portrait (180px on desktop) to keep the sidebar restrained. Display 蒋梓轩 / Zixuan Jiang and Andrew. Admission to Shanghai Innovation Institute and Shanghai Jiao Tong University, starting September 2027 with Xie Chen, is confirmed; do not present it as current PhD enrollment.

Publications remain on their own page, with no paper list on the homepage. Research experience shows institutions, dates, mentors and broad research areas, without individual responsibilities. Include an invitation for relevant research collaborations and internships. Preserve both confirmed email addresses and existing news, archive, bilingual switching, CV links and independent pages. The user confirmed music and piano as personal interests; add one natural sentence without inferring proficiency or repertoire.

Keep the original compact contact language: location, Email, Scholar, ORCID and RedNote with icons. The Email button reveals Gmail (preferred) and university email on hover or click, rather than displaying addresses in the sidebar. Preserve keyboard dismissal, outside-click dismissal, mobile tapping and the confirmed Scholar profile. GitHub and CV remain in the header.

## Implementation scope

1. Replace the homepage hero with a compact identity sidebar and reorganize the main content into About, Research Interests, News, Education and Research Experience.
2. Extract existing news into its own component; preserve factual content and simplify presentation. Reuse existing publication data and move speech research ahead of earlier remote sensing work on the independent publications page.
3. Replace the existing editorial style layer with a restrained academic style; retain responsive navigation, accessibility and useful reading / image controls.
4. Simplify the footer, fix the timeline item keys, and align metadata with the confirmed research focus.

## Verification

Run `npm run lint`, `npm run build` and `git diff --check`. Inspect desktop and mobile layouts, English / Chinese copy, navigation, email copying, news expansion and publication tabs in the browser. No dependencies, résumé changes, commits or deployment are in scope.
