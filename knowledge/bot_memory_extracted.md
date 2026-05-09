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
effectively harness the rich semantics of pre-trained VLMs, making OVSS possible in optical remote sensing contexts. Furthermore, to
extend the framework’s universality to other challenging remote sensing modalities like Synthetic Aperture Radar (SAR) images, where
large-scale pre-trained VLMs (e.g. SAR-CLIP) are unavailable and prohibitively expensive to create, we introduce AlignEarth, which is a
distillation-based strategy and can efficiently transfer semantic knowledge from an optical VLM encoder to an SAR encoder, bypassing
the need to build SAR foundation models from scratch and enabling universal OVSS across diverse sensor types. Extensive experiments
on both optical and SAR datasets validate that our proposed SegEarth-OV can achieve dramatic improvements over the state-of-the-art
methods, establishing a robust foundation for annotation-free and open-world Earth observation. All codes and models will be released at
https://github.com/earth-insights/SegEarth-OV-2.

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
shapes without any task-specific post-training. We also present a simple yet effective Global Bias Alleviation operation to subtract the
inherent global context from patch features, significantly enhancing local semantic fidelity. These components empower SegEarth-OV to
effectively harness the rich semantics of pre-trained VLMs, making OVSS possible in optical remote sensing contexts. Furthermore, to
extend the framework’s universality to other challenging remote sensing modalities like Synthetic Aperture Radar (SAR) images, where
large-scale pre-trained VLMs (e.g. SAR-CLIP) are unavailable and prohibitively expensive to create, we introduce AlignEarth, which is a
distillation-based strategy and can efficiently transfer semantic knowledge from an optical VLM encoder to an SAR encoder, bypassing
the need to build SAR foundation models from scratch and enabling universal OVSS across diverse sensor types. Extensive experiments
on both optical and SAR datasets validate that our proposed SegEarth-OV can achieve dramatic improvements over the state-of-the-art
methods, establishing a robust foundation for annotation-free and open-world Earth observation. All codes and models will be released at
https://github.com/earth-insights/SegEarth-OV-2.
Index Terms—Semantic segmentation, Open-vocabulary, Remote sensing image, Vision-language model
✦
1 I NTRODUCTION
Remote sensing image analysis has become increasingly
pivotal for planetary understanding and monitoring, pro-
viding unparalleled insights into environmental dynamics,
urban expansion, disaster mitigation, and sustainable re-
source management [1]–[3]. Traditionally, semantic segmen-
tation of remote sensing images predominantly depends
on supervised learning approaches, which require large-
scale datasets with pixel-level annotations [4], [5]. Despite
significant advancements, this paradigm is subject to inherent
limitations: the prohibitive cost and time investment for
dense annotation, and its inability to recognise novel or
unseen object categories in dynamic real-world scenarios.
This bottleneck has catalysed a paradigm shift t
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
guided fusion module leveraging remote sensing vision-language
model features to encode high-resolution details and remote
sensing category priors while maintaining global context. Our De-
scribeEarth model consistently outperforms state-of-the-art gen-
eral MLLMs on DE-Benchmark, demonstrating superior factual
accuracy, descriptive richness, and grammatical soundness, par-
ticularly in capturing intrinsic object features and surrounding
environmental attributes across simple, complex, and even out-of-
distribution remote sensing scenarios. All data, code and weights
are released at https://github.com/earth-insights/DescribeEarth.

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
systematically measure model capabilities on the Geo-DLC task.
We also present DescribeEarth, a Multi-modal Large Language
Model (MLLM) architecture explicitly designed for Geo-DLC,
which integrates a scale-adaptive focal strategy and a domain-
guided fusion module leveraging remote sensing vision-language
model features to encode high-resolution details and remote
sensing category priors while maintaining global context. Our De-
scribeEarth model consistently outperforms state-of-the-art gen-
eral MLLMs on DE-Benchmark, demonstrating superior factual
accuracy, descriptive richness, and grammatical soundness, par-
ticularly in capturing intrinsic object features and surrounding
environmental attributes across simple, complex, and even out-of-
distribution remote sensing scenarios. All data, code and weights
are released at https://github.com/earth-insights/DescribeEarth.
Index Terms—Image captioning, Remote sensing image, Mul-
timodel model
I. INTRODUCTION
R
EMOTE sensing images, continuously acquired from
satellites, aerial platforms, and drones, provide an in-
dispensable tool for monitoring and understanding the Earth.
Its applications span environmental science [1], [2], urban
planning [3], [4], disaster management [5], agriculture [6],
and defense [7]. Automatically generating precise and detailed
textual descriptions for specific features or phenomena within
This work is partially supported by the National Key R&D Program of
China (2021ZD0112902), and China NSFC projects under contract 62272375,
12226004.(Corresponding author: Xiangyong Cao)
Kaiyu Li and Zhi Wang are with School of Software Engineering, Xi’an
Jiaotong University, Xi’an 710049, China (email: likyoo.ai@gmail.com, zhi-
wang@xjtu.edu.cn)
Zixuan Jiang is with College of Artificial Intelligence, Xi’an Jiaotong
University, Xi’an 710049, China (email: andrewjiang@stu.xjtu.edu.cn)
Xiangyong Cao, Jiayu Wang, and Yuchen Xiao are with School
of Computer Science and Technology and Ministry of Education
Key Lab For Intelligent Networks and Network Security, Xi’an Ji
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
the effectiveness of the proposed framework in improving se-
mantic fidelity and interactive correction capability. We will
release the code to facilitate future research in interactive and
agentic ASR.

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
the effectiveness of the proposed framework in improving se-
mantic fidelity and interactive correction capability. We will
release the code to facilitate future research in interactive and
agentic ASR.
Index Terms: speech recognition, human-computer interac-
tion, LLM agent
1. Introduction
Automatic speech recognition (ASR) plays a pivotal role in
human–computer interaction by enabling computers to under-
stand users’ intent through speech. In recent years, ASR tech-
nologies have achieved remarkable progress, driven by advances
in both model architectures and large-scale training data. Ex-
tensive research has explored a variety of modeling paradigms,
ranging from end-to-end approaches [ 1, 2, 3, 4], to more recent
large language model (LLM)-based frameworks [ 5, 6, 7, 8, 9,
10]. Meanwhile, scaling laws in both model capacity and train-
ing data have proven highly effective in further advancing ASR
performance [11, 12, 13, 14].
Project page: https://interactiveasr.github.io/. Live
demo: https://i-asr.sjtuxlance.com/
*These authors contributed equally.
**indicates the corresponding author.
†This work was conducted during an internship at Tongyi Fun Team,
Alibaba Group.
×
User
ASR
Hi Siri, call Sarah Knight
Hi Siri, call Sarah Night
Task Failed
User
No ! Call Sarah Knight !
No
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
participants in this challenge.
Appendix A contains the authors’ team names and affiliations.
NTIRE2026 webpage: https://cvlai.net/ntire/2026/.
Challenge Codes: https://github.com/ohMargin/NTIRE2026 CDFSOD.

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
participants in this challenge.
Appendix A contains the authors’ team names and affiliations.
NTIRE2026 webpage: https://cvlai.net/ntire/2026/.
Challenge Codes: https://github.com/ohMargin/NTIRE2026 CDFSOD.
1. Introduction
Few-shot object detection (FSOD) [43] aims to enable
models to recognize and localize novel object categories
from only a handful of labeled examples. Despite notable
progress [77, 91, 92, 98, 113, 125], most existing FSOD
approaches assume that the training (source) and testing
(target) data are drawn from the same domain. However,
such an assumption is often violated in real-world scenar-
ios, where models must generalize across substantial do-
main shifts. For example, detectors trained on natural image
datasets such as MS-COCO [59] may struggle when applied
to domains with significantly different characteristics, such
as remote sensing imagery [31, 50, 67, 73].
While cross-domain few-shot learning (CD-FSL) has
been extensively studied in the context of image classifi-
cation [24–26, 33, 55, 84, 102, 105, 1
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
中国图象图形学报 ， XXXX ： 1 - 27 .  DOI ：  10 . 11834 /jig . 260163 . ）［ DOI ： 10 . 11834 /jig . 260163 ］
收稿日期 ： 2026 - 03 - 30 ； 修回日期 ： 2026 - 04 - 05
* 通信作者 ： 曹相湧  caoxiangyong@mail . xjtu . edu . cn
基金项目 ： 教育部学科先导计划项目 （ JYB 2025 XDXM 101 ） ； 国家自然科学基金项目 （ 62272375 ） ； 国家自然科学基金数学天元基金项目
（ 12426105 ）
Supported by ： Fundamental and Interdisciplinary Disciplines Breakthrough Plan of the Ministry of Education of China （ JYB 2025 XDXM 101 ） ；
National Natural Science Foundation of China （ 62272375 ）
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
遥感图像开放词汇感知进展
李开宇 ， 曹相湧
*
， 蒋梓轩 ， 孟德宇
西安交通大学 ， 西安  710049
摘  要 ：  传统的遥感图像智能解译技术大多建立在封闭集假设之上 ， 高度依赖海量的人工标注数据 ， 且在推理阶段
仅能识别训练集中预先定义的固定类别 。 面对真实地球观测场景中复杂多变的地表环境 、 尺度剧烈变化的目标以
及长尾分布的罕见地物 ， 传统范式泛化能力受限 ， 难以满足高度动态的开放世界解译需求 。 近年来 ， 得益于视觉—
语言基础模型的快速发展 ， 开放词汇感知技术应运而生 。 该技术通过跨模态语义对齐打破了传统离散标签的束缚 ，
在零样本与少样本场景下展现出强大的泛化潜力 。 然而 ， 遥感影像独特的俯视成像视角 、 复杂的拓扑关联以及多源
异构的物理模态 ， 致使自然图像领域的通用大模型在向遥感垂直领域迁移时面临显著的领域鸿沟 。 为此 ， 本文系统
梳理并总结了遥感图像开放词汇感知领域的最新研究进展 。 首先 ， 从数据和方法两个维度 ， 阐述了遥感视觉—语言
预训练数据集的构建策略 ， 以及预训练架构从基础域适配向异构数据感知与地理先验增强的演进脉络 ； 其次 ， 全面
剖析了开放词汇感知在零样本场景分类 、 跨模态检索 、 图像分割 、 目标检测与定位 、 变化检测以及三维点云理解等关
键下游任务中的应用范式 ； 最后 ， 深入探讨了当前该领域在高质量训练数据匮乏 、 细粒度评测基准缺失 、 多源异构模
态深层对齐不足及模型可靠性等方面面临的核心挑战 ， 并从多模态大语言模型驱动的生成式感知 、 全模态基础模型
演进 、 时空因果推演及星地协同计算等方向对未来发展趋势进行了系统展望 ， 以期为推动遥感智能解译迈向真实开
放世界提供详实的理论参考 。
关键词 ：  遥感图像 ； 开放词汇感知 ； 视觉—语言模型 ； 零样本学习 ； 智能解译
Advances in open vocabulary perception for remote sensing images
Li 　Kaiyu ，  Cao 　Xiangyong
*
，  Jiang 　Zixuan ，  Meng 　Deyu
Xi ’ an Jiaotong University ，  Xi ’ an 710049 ，  China
Abstract ：  Remote sensing technology serves as the core mechanism for the observation of the Earth and the understanding
of surface environments .  It plays an irreplaceable role in critical fields such as natural disaster monitoring ，  urban plan ⁃
ning ，  resource exploration ，  and ecological protection .  Over the past decade ，  driven by the rapid advancement of deep
learning ，  the intelligent interpretation of remote sensing images has achieved breakthrough progress in fundamental vision
tasks .  H
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
Young Gifted Program, Qian Xuesen Honors College Xi’an, China
Performance: Rank: 17/234, Top 8%
Honor: Third-Class Scholarship, Xi’an Jiaotong University
Honors & Awards
• Meritorious Winner , Mathematical Contest in Modeling (MCM/ICM) 2024
• Honorable Mention , Mathematical Contest in Modeling (MCM/ICM) 2023
• First Prize , China Undergraduate Mathematical Contest in Modeling, Shaanxi Province 2023–2025, 3 times
• Silver Medal , ICPC Shaanxi Provincial Programming Contest 2025
• Bronze Medal , ICPC Shaanxi Provincial Programming Contest 2024
• Second Prize , Urban Road Lane Line Extraction and Vectorization Track, The 9th National LiDAR Confer-
ence Point Cloud Intelligent Analysis Competition 2025
• Third Prize, AI Technology Track, M-Zone AI+ College Innovation Program; sole finalist team from Northwest
China 2024
Research & Internship Experience
Remote Sensing Multimodal Interpretation Xi’an Jiaotong University
Research Group of Prof. Xiangyong Cao Advisor: Prof. Xiangyong Cao
• DescribeEarth: Describe Anything for Remote Sensing Images In submission
Kaiyu Li*, Zixuan Jiang* , Xiangyong Cao†, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang Co-First
Author
• Proposed the object-level fine-grained remote sensing interpretation task, Geo-DLC, to address the coarse-
grained nature of existing remote sensing image interpretation.
• Constructed the first object-level fine-grained interpretation dataset, DE-Dataset, and the corresponding
evaluation benchmark, DE-Bench.
• Proposed DescribeEarth, a multimodal large language model for fine-grained object-level interpretation of
remote sensing images.
• Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images In submission
Kaiyu Li, Xiangyong Cao†, Ruixun Liu, Shihong Wang, Zixuan Jiang , Zhi Wang, Deyu Meng
• Advances in Open-Vocabulary Perception for Remote Sensing Images Journal of Image and
Graphics, 2026
Kaiyu Li, Xiangyong Cao†, Zixuan Jiang , Deyu Meng
Speech Interaction and Speech Multimodality Shanghai 
```
