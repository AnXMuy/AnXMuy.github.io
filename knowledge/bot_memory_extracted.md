# Bot Memory Extracted Knowledge (Refined)

Generated from PDF files under `../bot_memory`.
Extraction strategy: first pages + abstract-focused trimming.

## File Index
- 2508.18067v1.pdf
- 2509.25654v1.pdf
- 2604.09121v3.pdf
- 2604.11998v1.pdf
- Advances in open vocabulary perception for remote sensing images_NormalPdf.pdf
- CV.pdf

## 2508.18067v1.pdf
### Abstract or Early Summary
```text
Abstract—Semantic segmentation of remote sensing images is pivotal for comprehensive Earth observation, but the demand for
interpreting new object categories, coupled with the high expense of manual annotation, poses significant challenges. Although open-
vocabulary semantic segmentation (OVSS) offers a promising solution, existing frameworks designed for natural images are insufficient
for the unique complexities of remote sensing data. They struggle with vast scale variations and fine-grained details, and their adaptation
often relies on extensive, costly annotations. To address this critical gap, this paper introduces SegEarth-OV, the first framework for
annotation-free open-vocabulary segmentation of remote sensing images. Specifically, we propose SimFeatUp, a universal upsampler
that robustly restores high-resolution spatial details from coarse Vision-Language Model (VLM) features, correcting distorted target
shapes without any task-specific post-training. We also present a simple yet effective Global Bias Alleviation operation to subtract the
inherent global context from patch features, significantly enhancing local semantic fidelity. These components empower SegEarth-OV to
e
```

### Early Content Snippet
```text
1
Annotation-Free Open-Vocabulary Segmentation
for Remote-Sensing Images
Kaiyu Li, Xiangyong Cao†, Ruixun Liu, Shihong Wang, Zixuan Jiang, Zhi Wang, Deyu Meng
Abstract—Semantic segmentation of remote sensing images is pivotal for comprehensive Earth observation, but the demand for
interpreting new object categories, coupled with the high expense of manual annotation, poses significant challenges. Although open-
vocabulary semantic segmentation (OVSS) offers a promising solution, existing frameworks designed for natural images are insufficient
for the unique complexities of remote sensing data. They struggle with vast scale variations and fine-grained details, and their adaptation
often relies on extensive, costly annotations. To address this critical gap, this paper introduces SegEarth-OV, the first framework for
annotation-free open-vocabulary segmentation of remote sensing images. Specifically, we propose SimFeatUp, a universal upsampler
that robustly restores high-resolution spatial details from coarse Vision-Language Model (VLM) features, correcting distorted target
shapes without any task-specific post-training. We also present a simple yet effective Global Bias Alleviation op
```

## 2509.25654v1.pdf
### Abstract or Early Summary
```text
Abstract—Automated textual description of remote sensing
images is crucial for unlocking their full potential in diverse
applications, from environmental monitoring to urban planning
and disaster management. However, existing studies in remote
sensing image captioning primarily focus on the image level,
lacking object-level fine-grained interpretation, which prevents
the full utilization and transformation of the rich semantic and
structural information contained in remote sensing images. To
address this limitation, we propose Geo-DLC, a novel task of
object-level fine-grained image captioning for remote sensing.
To support this task, we construct DE-Dataset, a large-scale
dataset contains 25 categories and 261,806 annotated instances
with detailed descriptions of object attributes, relationships, and
contexts. Furthermore, we introduce DE-Benchmark, a LLM-
assisted question-answering based evaluation suite designed to
systematically measure model capabilities on the Geo-DLC task.
We also present DescribeEarth, a Multi-modal Large Language
Model (MLLM) architecture explicitly designed for Geo-DLC,
which integrates a scale-adaptive focal strategy and a domain-
guided fusion module l
```

### Early Content Snippet
```text
JOURNAL OF LATEX CLASS FILES, VOL. 14, NO. 8, AUGUST 2021 1
DescribeEarth: Describe Anything for Remote Sensing Images
Kaiyu Li*, Zixuan Jiang*, Xiangyong Cao †, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang
Abstract—Automated textual description of remote sensing
images is crucial for unlocking their full potential in diverse
applications, from environmental monitoring to urban planning
and disaster management. However, existing studies in remote
sensing image captioning primarily focus on the image level,
lacking object-level fine-grained interpretation, which prevents
the full utilization and transformation of the rich semantic and
structural information contained in remote sensing images. To
address this limitation, we propose Geo-DLC, a novel task of
object-level fine-grained image captioning for remote sensing.
To support this task, we construct DE-Dataset, a large-scale
dataset contains 25 categories and 261,806 annotated instances
with detailed descriptions of object attributes, relationships, and
contexts. Furthermore, we introduce DE-Benchmark, a LLM-
assisted question-answering based evaluation suite designed to
systematically measure model capabilities on the Geo-DLC tas
```

## 2604.09121v3.pdf
### Abstract or Early Summary
```text
Abstract
Recent years have witnessed remarkable progress in automatic
speech recognition (ASR), driven by advances in model archi-
tectures and large-scale training data. However, two important
aspects remain underexplored. First, Word Error Rate (WER),
the dominant evaluation metric for decades, treats all words
equally and often fails to reflect the semantic correctness of an
utterance at the sentence level. Second, interactive correction—
an essential component of human communication—has rarely
been systematically studied in ASR research. In this paper, we
integrate these two perspectives under an agentic framework for
interactive ASR. We propose leveraging LLM-as-a-Judge as a
semantic-aware evaluation metric to assess recognition quality
beyond token-level accuracy. Furthermore, we design an LLM-
driven agent framework to simulate human-like multi-turn in-
teraction, enabling iterative refinement of recognition outputs
through semantic feedback. Extensive experiments are con-
ducted on standard benchmarks, including GigaSpeech (En-
glish), WenetSpeech (Chinese), the ASRU 2019 code-switching
test set. Both objective and subjective evaluations demonstrate
the effectiveness of the
```

### Early Content Snippet
```text
Interactive ASR: Towards Human-Like Interaction and Semantic Coherence
Evaluation for Agentic Speech Recognition
Peng Wang2,∗, Yanqiao Zhu†1,∗, Zixuan Jiang 3,∗, Qinyuan Chen 4, Xingjian Zhao 4, Xipeng Qiu 4,
Wupeng Wang5, Zhifu Gao 5, Xiangang Li5, Kai Yu1, Xie Chen 1,∗∗
1 X-LANCE Lab, Shanghai Jiao Tong University 2 The Chinese University of Hong Kong, Shenzhen
3 Xi’an Jiaotong University 4 Fudan University
5 Tongyi Fun Team, Alibaba Group
pengwang0104@gmail.com, 1850432206@sjtu.edu.cn, andrewjiang@stu.xjtu.edu.cn,
chengqy21@m.fudan.edu.cn, zhaoxj24@m.fudan.edu.cn, xpqiu@fudan.edu.cn, wangwupeng.wwp@alibaba-inc.com,
zhifu.gzf@alibaba-inc.com, lixiangang.lxg@alibaba-inc.com, kai.yu@sjtu.edu.cn, chenxie95@sjtu.edu.cn
Abstract
Recent years have witnessed remarkable progress in automatic
speech recognition (ASR), driven by advances in model archi-
tectures and large-scale training data. However, two important
aspects remain underexplored. First, Word Error Rate (WER),
the dominant evaluation metric for decades, treats all words
equally and often fails to reflect the semantic correctness of an
utterance at the sentence level. Second, interactive correction—
an essential component of h
```

## 2604.11998v1.pdf
### Abstract or Early Summary
```text
Abstract
Cross-domain few-shot object detection (CD-FSOD) re-
mains a challenging problem for existing object detectors
and few-shot learning approaches, particularly when gen-
eralizing across distinct domains. As part of NTIRE 2026,
we hosted the second CD-FSOD Challenge to systemati-
cally evaluate and promote progress in detecting objects
in unseen target domains under limited annotation condi-
tions. The challenge received strong community interest,
with 128 registered participants and a total of 696 submis-
sions. Among them, 31 teams actively participated, and 19
teams submitted valid final results. Participants explored
a wide range of strategies, introducing innovative methods
that push the performance frontier under both open-source
and closed-source tracks. This report presents a detailed
overview of the NTIRE 2026 CD-FSOD Challenge, includ-
ing a summary of the submitted approaches and an analysis
of the final results across all participating teams.
*Xingyu Qiu, Yuqian Fu, Jiawei Geng, Bin Ren, Jiancheng Pan, Zong-
wei Wu, Hao Tang, Yanwei Fu, Radu Timofte, Nicu Sebe, and Mohamed
Elhoseiny are the NTIRE 2026 challenge organizers. The other authors are
participants in th
```

### Early Content Snippet
```text
The Second Challenge on Cross-Domain Few-Shot Object Detection
at NTIRE 2026: Methods and Results
Xingyu Qiu* Yuqian Fu* Jiawei Geng* Bin Ren* Jiancheng Pan* Zongwei Wu* Hao
Tang* Yanwei Fu* Radu Timofte* Nicu Sebe* Mohamed Elhoseiny* Lingyi Hong
Mingxi Cheng Xingqi He Runze Li Xingdong Sheng Wenqiang Zhang Jiacong Liu Shu
Luo Yikai Qin Yaze Zhao Yongwei Jiang Yixiong Zou Zhe Zhang Yang Yang Kaiyu
Li Bowen Fu Zixuan Jiang Ke Li Hui Qiao Xiangyong Cao Xuanlong Yu Youyang
Sha Longfei Liu Di Yang Xi Shen Kyeongryeol Go Taewoong Jang Saiprasad
Meesiyawar Ravi Kirasur Rakshita Kulkarni Bhoomi Deshpande Harsh Patil Uma
Mudenagudi Shuming Hu Chao Chen Tao Wang Wei Zhou Qi Xu Zhenzhao Xing
Dandan Zhao Hanzhe Xia Dongdong Lu Zhe Zhang Jingru Wang Guangwei Huang
Jiachen Tu Yaokun Shi Guoyi Xu Yaoxin Jiang Jiajia Liu Liwei Zhou Bei Dou Tao
Wu Zekang Fan Junjie Liu Adh ´emar de Senneville Flavien Armangeon Mengbers Yazhe
Lyu Zhimeng Xin Zijian Zhuang Hongchun Zhu Li Wang
Abstract
Cross-domain few-shot object detection (CD-FSOD) re-
mains a challenging problem for existing object detectors
and few-shot learning approaches, particularly when gen-
eralizing across distinct domains. As part of NTI
```

## Advances in open vocabulary perception for remote sensing images_NormalPdf.pdf
### Abstract or Early Summary
```text
Abstract ：  Remote sensing technology serves as the core mechanism for the observation of the Earth and the understanding
of surface environments .  It plays an irreplaceable role in critical fields such as natural disaster monitoring ，  urban plan ⁃
ning ，  resource exploration ，  and ecological protection .  Over the past decade ，  driven by the rapid advancement of deep
learning ，  the intelligent interpretation of remote sensing images has achieved breakthrough progress in fundamental vision
tasks .  However ，  the traditional deep learning paradigm is intrinsically built upon a closed - set assumption ，  meaning that
models can only recognize a predefined and human - annotated set of fixed categories during the inference stage .  When con ⁃
中图法分类号 ：   文献标识码 ：  A   文章编号 ：  1006 - 8961 （ XXXX ） XX - 0001 - 27
论文引用格式 ： Li Kaiyu ，  Cao Xiangyong ，  Jiang Zixuan ，  Meng Deyu .  Advances in open vocabulary perception for remote sensing images ［ J/OL ］ .  Jour ⁃
nal of Image and Graphics ，  XXXX ： 1 - 27 .  DOI ：  10 . 11834 /jig . 260163 . （ 李开宇 ，  曹相湧 ，  蒋梓轩 ，  孟德宇 .  遥感图像开放词汇感知进展 ［ J/OL ］ .
中国图象图形学报 ， XXXX ： 1 - 27 .  DOI ：  10 . 11834 /jig . 260163 . ）［ DOI ： 10 . 11834 /jig . 26
```

### Early Content Snippet
```text
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
中国图象图形学报版权所有
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
中国图象图形学报版权所有
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
中国图象图形学报版权所有
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
中国图象图形学报版权所有
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
JIG JIG JIG JIG JIG JIG JIG JIG
中国图象图形学报版权所有
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
JIG
```

## CV.pdf
### Abstract or Early Summary
```text
ZIXUAN JIANG
× (+86) 139-1355-0425 • ć andrewjiang@stu.xjtu.edu.cn • ç Personal W ebsite
Profile
I am an undergraduate student with a strong academic record, solid mathematical foundation, and programming
background. I am responsible, detail-oriented, and highly motivated to pursue research. My current research
interests focus on multimodal learning and multimodal large language models, especially exploring how traditional
tasks and interdisciplinary problems can be reformulated and advanced in the era of large models and intelligent
agents.
Education
Xi’an Jiaotong University Sep 2023 – Jun 2027
Artificial Intelligence Honors Program (AIH), Qian Xuesen Honors College Xi’an, China
Performance: GPA: 92.48/100 | Rank: 5/65, Top 10% | First five semesters
Honors: National Scholarship ; “Shuiyou” First-Class Scholarship; Outstanding Student Award (twice); Innovation and
Entrepreneurship Award; Academic Research/Competition Award of Qian Xuesen Honors College
Core Courses: Digital Signal Processing (99), Introduction to Artificial Intelligence (99), Natural Language Processing
(96), AI Systems (96), Computer Vision (95)
English: CET-6 (575)
Xi’an Jiaotong University Sep 2021 – Jun 2023

```

### Early Content Snippet
```text
ZIXUAN JIANG
× (+86) 139-1355-0425 • ć andrewjiang@stu.xjtu.edu.cn • ç Personal W ebsite
Profile
I am an undergraduate student with a strong academic record, solid mathematical foundation, and programming
background. I am responsible, detail-oriented, and highly motivated to pursue research. My current research
interests focus on multimodal learning and multimodal large language models, especially exploring how traditional
tasks and interdisciplinary problems can be reformulated and advanced in the era of large models and intelligent
agents.
Education
Xi’an Jiaotong University Sep 2023 – Jun 2027
Artificial Intelligence Honors Program (AIH), Qian Xuesen Honors College Xi’an, China
Performance: GPA: 92.48/100 | Rank: 5/65, Top 10% | First five semesters
Honors: National Scholarship ; “Shuiyou” First-Class Scholarship; Outstanding Student Award (twice); Innovation and
Entrepreneurship Award; Academic Research/Competition Award of Qian Xuesen Honors College
Core Courses: Digital Signal Processing (99), Introduction to Artificial Intelligence (99), Natural Language Processing
(96), AI Systems (96), Computer Vision (95)
English: CET-6 (575)
Xi’an Jiaotong University Sep 2021 – Jun 2023

```
