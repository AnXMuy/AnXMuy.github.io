# Bot Memory Extracted Knowledge

Auto-generated from PDF files under ../bot_memory.

## 2508.18067v1.pdf
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
This bottleneck has catalysed a paradigm shift towards open-
• Kaiyu Li and Zhi Wang are with School of Software Engineering, Xi’an
Jiaotong University, Xi’an, 710049, China. (E-mail: likyoo.ai@gmail.com,
zhiwang@xjtu.edu.cn)
• Xiangyong Cao and Shihong Wang are with School of Computer Science
and Technology and Ministry of Education Key Laboratory of Intelligent
Networks and Network Security, Xi’an Jiaotong University, Xi’an, 710049,
China. (E-mail: caoxiangyong@mail.xjtu.edu.cn, jack3shihong@gmail.com)
• Ruixun Liu is with School of Automation, Xi’an Jiaotong University, Xi’an,
710049, China. (E-mail: liuruixun6343@gmail.com)
• Zixuan Jiang is with College of Artificial Intelligence, Xi’an Jiaotong
University, Xi’an, 710049, China. (E-mail: andrewjiang@stu.xjtu.edu.cn)
• Deyu Meng is with School of Mathematics and Statistics and Ministry
of Education Key Laboratory of Intelligent Networks and Network
Security, Xi’an Jiaotong University, Xi’an, 710049, China. (E-mail:
dymeng@mail.xjtu.edu.cn)
• Xiangyong Cao is the corresponding author.
(a) MaskCLIP (b) ClearCLIP
(c) SegEarth-OV (d) GT
Fig. 1. Limitations of state-of-the-art OVSS methods in remote sensing
images. The two predictions (a) and (b) present distorted target shapes
and ill-fitting boundaries (best viewed digitally with zoom, especially for
the object edges).
vocabulary semantic segmentation (OVSS), an emerging
setting that enables models to segment arbitrary object cate-
gories through textual descriptions, thereby fundamentally
resolving the annotation constraint.
However, the adaptation of generic OVSS frameworks,
especially those leveraging pre-trained Vision-Language
Models (VLMs) such as CLIP [6], to remote sensing images
encounters substantial challenges. Remote sensing images
inherently exhibit multi-scale characteristics, encompassing
arXiv:2508.18067v1  [cs.CV]  25 Aug 2025
2
objects spanning orders of magnitude, from vast land cover
to fine structures such as small buildings or vehicles. The
direct application of VLMs, particularly those employing
aggressive downsampling strategies ( e.g., 1/16th of the
original image resolution for ViT-based CLIP), inevitably
leads to irreversible loss of fine-grained spatial details. As
shown in Fig. 1 (a)(b), the resulting distorted target shapes
and imprecise boundaries compromise the segmentation
accuracy, thus undermining the effectiveness of dense pre-
diction. Moreover, VLMs like CLIP are pre-trained on large-
scale image-text pairs of natural images, where their [CLS]
tokens encode “global bias” [7]–[10]. While this bias aids
image-level classification, it inadvertently “leaks” into local
patch features, negatively impacting the precise pixel-level
understanding, which is essential for semantic segmentation.
To address these critical challenges, we introduced
SegEarth-OV [11], the first framework designed for
annotation-free OVSS of remote sensing images. To tackle
the issues of distorted shapes and imprecise boundaries,
we propose SimFeatUp, a universal upsampler that metic-
ulously reconstructs high-resolution spatial details from
low-resolution VLM features through a parameterized Joint
Bilateral Upsampling (JBU) mechanism, coupled with a
Content Retention Network (CRN) that ensures content
consistency. Crucially, after a one-time general training, Sim-
FeatUp operates without any task-specific post-training [12],
[13]. To enhance local semantic fidelity, we present Global
Bias Alleviation, a simple yet effective subtraction operation
that mitigates the global bias from VLM patch features,
enabling more precise pixel-level predictions. Proven by
extensive experimental analysis, SimFeatUp and Global Bias
Alleviation have empowered SegEarth-OV to achieve state-
of-the-art (SOTA) performance on diverse optical remote
sensing benchmarks, establishing a robust foundation for
annotation-free OVSS in this domain.
A comprehensive Earth observation system must handle
diverse data modalities beyond optical images. Synthetic
Aperture Radar (SAR) images, for instance, offer all-weather,
day-and-night operational capabilities, but extending open-
vocabulary methods to them is non-trivial [14]. The primary
reason is the sheer difficulty of creating the necessary training
data. Unlike optical images, SAR images are not visually
intuitive; their content is determined by surface backscatter
properties, speckle noise, and geometric effects that require
expert knowledge to interpret correctly. Consequently, it
is extremely difficult and costly to write the vast num-
ber of accurate, descriptive text captions needed for pre-
training. To solve this data scarcity issue, we introduce
AlignEarth. Our strategy offers a pragmatic alternative:
instead of attempting the difficult task of aligning SAR
images with text, AlignEarth uses knowledge distillation to
transfer semantic understanding from a pre-trained optical
VLM to an SAR image encoder. It achieves this by using
readily available, paired optical-SAR images, even when
these pairs exhibit imperfect spatial alignment or temporal
discrepancies, completely bypassing the need for any SAR-
specific text annotations. This design makes the trained SAR
encoder fully compatible with our SimFeatUp and Global
Bias Alleviation modules, thus establishing SegEarth-OV as
a versatile framework for diverse remote sensing modalities.
Our main contributions can be summarized as follows:
• We introduce SegEarth-OV , the first annotation-free
open-vocabulary segmentation framework specifi-
cally designed for remote sensing images, achieving
SOTA performance on various remote sensing seg-
mentation tasks.
• We introduce SimFeatUp, a universal feature upsam-
pling module that robustly restores the lost spatial
information from low-resolution VLM features with
no post-training requirements, rectifying the distorted
target shapes and imprecise boundaries in remote
sensing images.
• We propose Global Bias Alleviation, a simple yet
effective operation that subtracts the inherent global
bias from VLM patch features, thereby significantly
enhancing local semantic discriminability for pixel-
level predictions.
• We design AlignEarth, a novel knowledge distillation
strategy that transfers rich semantic knowledge from
optical VLM to a dedicated SAR encoder, bridging the
modality gap and unlocking annotation-free OVSS
for SAR images.
The remainder of this paper is organized as follows:
Section 2 reviews related work in VLM, semantic segmen-
tation and OVSS. Section 3 and Section 4 detail the core
methodology of SegEarth-OV and AlignEarth. Section 5
presents extensive experimental results on diverse remote
sensing datasets. Finally, Section 6 concludes the paper and
discusses future research directions.
2 R ELATED WORK
2.1 Vision-Language Model
Recent advances in foundation models, particularly VLMs,
have energized the field of computer vision, among which
the phenomenal contrastive language-vision pretraining,
i.e., CLIP [6] bridges the gap between images and natu-
ral language. More specifically, CLIP establishes a shared
embedding space through a contrastive learning objective
where image representations and text representations of the
corresponding captions are jointly optimized by enforcing
modality alignment on matching pairs while maintaining
separation between non-matching pairs. The resulting joint
embedding space enables powerful zero-shot transfer, allow-
ing CLIP to classify unseen objects by simply aligning visual
features with novel textual descriptions. This remarkable
capability is what makes open-vocabulary learning possible
across various downstream tasks [15], [16]. Subsequently,
related research has gradually emerged, exploring various
aspects from the data collection and curation strategies [17]–
[20], efficient pre-training methodologies [18], [21], [22], to
advancements in model architectures themselves [23], [24].
However, CLIP , despite its impressive zero-shot abilities,
primarily focuses on global [CLS] tokens for image-level
representation. Even though patch-level tokens can be gen-
erated, they are inevitably contaminated by this global bias
[7]–[9]. This global semantic information, while useful for
coarse classification, is often detrimental to dense prediction
tasks which demand fine-grained local fidelity. For instance,
the global context might incorrectly activate irrelevant local
regions, leading to imprecise segmentation.
3
In the context of remote sensing, specialized VLMs
have also emerged, adapting general VLMs or developing
new architectures to handle the unique characteristics of
aerial and satellite image. For example, RemoteCLIP [25],
RS5M [26] and SkyCLIP [27] adapt CLIP to remote sensing
by training it on a large dataset of remote sensing image-
text pairs, while H2RSVLM [28] focuses on building helpful
and honest remote sensing VLMs to address potential biases.
These works aim to bridge the domain gap between natural
and remote sensing images, and extract more meaningful
features for Earth observation tasks [29], [30]. Building
upon these efforts, our proposed SegEarth-OV extends open
vocabulary interpretation to the pixel level; our proposed
AlignEarth further distills an image encoder customized
for remote sensing images beyond optical images, with the
potential to achieve open vocabulary interpretation for full-
spectrum remote sensing.
2.2 Semantic Segmentation with Upsampler
Semantic segmentation aims to discriminate images at the
pixel level. The prediction head (aka decoder), as an essential
component of segmentation models, is able to upsample
low-resolution feature maps into high-resolution predictions.
Typical prediction heads leverage upsampling operators
(e.g., bilinear interpolation, JBU [31]) and high-resolution
encoder features (as guidance), e.g., UNet [32], UperNet [33],
Semantic FPN [34], MaskFormer [35], etc. Some works [36]–
[38] focus on dynamic, learnable upsampling operators that
make this process content-aware. For instance, Liu et.al. [36]
reconceptualized upsampling as a point sampling problem,
developing a lightweight and efficient operator that bypasses
computationally expensive dynamic convolutions. Building
on similarity-based paradigms, Zhou et.al. [38] introduced
ReSFU, which systematically enhances the guidance-based
upsampling pipeline, including explicit query-key alignment
and a flexible similarity measure.
FeatUp [39] proposes a model-agnostic framework for
producing high-resolution deep features. It leverages multi-
view consistency, akin to NeRF [40], to reconstruct lost spatial
information. This approach significantly enhances spatial
resolution and improves performance for downstream dense
prediction tasks like semantic segmentation, serving as a
drop-in feature replacement for existing decoders. However,
FeatUp primarily showcases its utility and benchmarks
its performance within supervised or transfer learning
settings, where explicit ground-truth labels are required.
Inspired by FeatUp’s success in producing semantically
rich, high-resolution feature representations, the SimFeatUp
proposed in this work extends this powerful paradigm to
significantly enhance OVSS in an entirely annotation-free
manner, thus tackling the challenge of generalization to novel
categories without requiring any human annotations.
2.3 Semantic Segmentation in Remote Sensing
Remote sensing image semantic segmentation aims to assign
a predefined semantic category ( e.g., building, road, water
body) to each pixel in an image, serving as a basic task in
land cover mapping, environmental monitoring, etc. To tackle
the unique challenges of remote sensing images, such as vast
scale variations and complex object distributions, numerous
specialized supervised models have been proposed [4], [41]–
[45]. For instance, FarSeg [41] introduced a foreground-aware
relation network to address the foreground-background im-
balance and the high intra-class variance of the background,
a concept further refined in FarSeg++ [4].
Despite these architectural advances, these methods
operate under a supervised, closed-set paradigm, which
leads to two major bottlenecks: (1) They heavily rely on
large-scale, pixel-level annotated datasets. Annotating remote
sensing images is not only costly and time-consuming but
also requires professional geographical expertise, severely
limiting the scalability and applicability of the models.
(2) Models trained under a closed-set assumption cannot
recognize or segment new categories not present in the
training set, a significant limitation in dynamic Earth scenar-
ios. To overcome these constraints, researchers have begun
exploring new paradigms such as weakly-supervised [1],
[46], few-shot learning [47], [48], and the focus of this paper,
OVSS, which aims to break the reliance on dense annotations
and closed category sets.
2.4 Open-Vocabulary Semantic Segmentation
As VLMs have shown remarkable zero-shot inference in
image classification [6], which naturally extends to semantic
segmentation. They empower the segmentation pipeline to
recognize seen and unseen categories, and users can segment
almost any category in an image using prompt vocabulary
[15], [16]. We divide current CLIP-based OVSS methods into
two groups: annotation-required and annotation-free. The
former allows models to be trained on some base classes in
a supervised or weakly supervised manner. Typically, some
works [7], [8], [49]–[51] try to train a localization-aware CLIP
which can naturally make dense predictions, while others
[52]–[57] select a subset of the CLIP’s pre-trained parameters
and/or introduce a limited number of trainable parameters
into the frozen CLIP , i.e., fine-tuning the CLIP to adapt to
dense prediction on base classes. For instance, CAT-Seg [56]
proposes a cost aggregation framework that fine-tunes CLIP’s
encoders by aggregating the multi-modal cosine similarity
scores between image and text embeddings, thereby adapting
CLIP to pixel-level tasks for both seen and unseen classes
while mitigating overfitting.
Still, annotation-free OVSS methods emphasize tapping
into CLIP’s inherent localization capabilities with limited
surgery of features or structures. MaskCLIP [58] pioneers the
removal of query and key projections at the attention pooling
layer of CLIP’s image encoder. Following it, subsequent
studies [9], [59]–[61] adequately explore self-self attention
(i.e., q-q, k-k or v-v self-attention), and these modifications
somewhat mitigate noisy activations and spatial invariant
perception of CLIP . Another stream [62]–[65] is the two-
stage method, which first generates category-agnostic mask
proposals and then classifies the masks. Besides, some other
foundation models (e.g. SAM [66], Stable Diffusion [67]) can
be introduced to enhance the localization ability of CLIP , and
these explorations also make sense [12], [65], [68], [69].
Different from previous methods, our SegEarth-OV specif-
ically addresses the inherent characteristics of remote sensing
images. Contemporaneous remote sensing OVSS works [70]–
[72] are annotation-required, while our framework provides
4
an effective solution for annotation-free OVSS. Our SimFea-
tUp is designed as a universal upsampler; its initial training
on a small dataset of images is separate from the OVSS task
itself, allowing its weights to be directly applied to features
from any remote sensing data for pixel-level refinement. For
remote sensing images of other modalities (e.g. SAR images),
our AlignEarth strategy further extends this annotation-
free paradigm. AlignEarth enables a SAR image encoder
to acquire semantic understanding from optical VLMs by
leveraging readily available paired optical-SAR images [73]–
[76]. This strategy ensures that SegEarth-OV can universally
perform OVSS across diverse remote sensing modalities,
from optical to SAR, all in an annotation-free manner.
3 S EGEARTH -OV: OVSS FOR REMOTE SENSING
This section details the comprehensive SegEarth-OV , which is
designed to address the unique challenges of OVSS across the
remote sensing image. As highlighted in Section 1, existing
VLM-based OVSS methods, primarily developed for natural
images, suffer from loss of fine-grained spatial details due
to aggressive downsampling and inherent global biases that
degrade pixel-level accuracy in remote sensing contexts. To
overcome these limitations, SegEarth-OV introduces two
core modules: SimFeatUp, which meticulously restores lost
spatial information from low-resolution VLM features, and
Global Bias Alleviation, designed to effectively mitigate
CLIP’s inherent global biases. We first provide essential
preliminaries on CLIP [6] and FeatUp [39] for context.
3.1 Preliminaries
3.1.1 CLIP: A Foundation for OV Understanding
VLMs have emerged as powerful tools for bridging the
semantic gap between visual and textual modalities, enabling
unprecedented open-vocabulary capabilities. Among these,
CLIP [6] stands out as a pivotal architecture due to its
effective contrastive pre-training on a massive dataset of
image-text pairs. CLIP comprises an image encoder and a
text encoder, jointly trained to embed semantically related
image-text pairs close to each other in a shared latent space.
For its image encoding, CLIP often leverages a Vision
Transformer (ViT) architecture. In a ViT-based CLIP model,
the image encoder processes an input image by dividing it
into a sequence of fixed-size patches, which are then linearly
embedded and combined with positional embeddings. A
special learnable [CLS] token is prepended to this sequence,
serving as a global representation for the entire image. This
sequence of tokens is then fed through a series of Transformer
blocks. Let X = [xcls, x1, ..., xh×w]T ∈ R(hw+1,d) denote the
input to the last Transformer block, where h and w represent
the height and width of the feature map derived from the
input image patches, and d is the dimension of each token.
The [CLS] token, xcls, captures holistic image semantics,
while x1, ..., xh×w represent local features corresponding to
different image patches. The forward process of the last
Transformer block can be formulated as follows:
q = Embq(X), k = Embk(X), v = Embv(X),
y = X + SA (q, k, v) ,
z = y + FFN(LN(y)),
(1)
where q, k, and v denote the Query, Key, and Value
matrices, respectively. Emb represents an embedding block
typically composed of a Layer Normalization (LN) layer
followed by a linear layer. SA signifies the standard multi-
head self-attention module, mathematically expressed as
SA(q, k, v) = softmax( q·kT
√
d ) · v. The term
√
d is a scaling
factor to prevent large dot products. After the self-attention
mechanism, the output y undergoes a feed-forward network
(FFN) operation. Finally, a projection layer maps the refined
token representations z to a multi-modal embedding space:
O = Proj(z), (2)
where O = [ocls, o1, ..., oh×w]T ∈ R(hw+1,c) denotes the final
output of the image encoder. Here, c is the token dimension
after the projection layer, and typically c < d . In the original
CLIP training, the global [CLS] token output, ocls, is primar-
ily used for image-level learning objectives ( e.g., image-text
matching). However, for downstream dense prediction tasks
like OVSS, the local patch tokens, O[1 : hw + 1], are crucial
for computing pixel-wise similarities with text embeddings.
3.1.2 FeatUp: Model-Agnostic Feature Upsampling
Dense prediction tasks, such as semantic segmentation, inher-
ently require high-resolution outputs to accurately delineate
object boundaries and fine-grained structures. However,
modern VLMs like CLIP [6] and DINO [77], [78], often
operate on downsampled image features for computational
efficiency. This necessitates an effective upsampling to bridge
the resolution gap between the VLM’s internal features
and the desired high-resolution output. FeatUp [39] is a
notable model-agnostic upsampler designed to address this
requirement by training a universal upsampling module that
can be applied to features from various frozen backbones.
FeatUp involves performing an upsampling operation on
low-resolution features, denoted as O[1 : hw + 1] (from
a frozen backbone), using a learnable upsampler σ↑. To
ensure that the upsampled high-resolution features maintain
consistency with the original low-resolution input, FeatUp
also employs a learnable downsampler σ↓ to reconstruct the
low-resolution features from the upsampled high-resolution
output. The core training objective for FeatUp is to minimise
the discrepancy between the original low-resolution features
and their reconstructed version, defined by the following
loss:
Lrec = ∥O[1 : hw + 1] − σ↓(σ↑(O[1 : hw + 1]))∥2
2 . (3)
FeatUp instantiates σ↑ using stacked parameterized JBU
operators [31]. JBU is a non-linear filter that estimates high-
resolution pixels by weighting neighboring low-
```

## 2509.25654v1.pdf
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
Key Lab For Intelligent Networks and Network Security, Xi’an Jiao-
tong University, Xi’an 710049, China (email: caoxiangyong@xjtu.edu.cn,
2234112262@stu.xjtu.edu.cn, 3283879@qq.com)
Deyu Meng is with School of Mathematics and Statistics and Ministry of
Education Key Lab of Intelligent Networks and Network Security, Xi’an Jiao-
tong University, Xi’an, Shaanxi, China, and Pazhou Laboratory (Huangpu),
Guangzhou, Guangdong, China. (email: dymeng@mail.xjtu.edu.cn).
Image Encoder
LSTM / RNN
Image Encoder Attention Blocks
(a) CNN-RNN-based Image Captioning
LLM
category: ship,
ship-visibility: partially,
ship-purpose: commercial,
ship-motion: stationary,
… …
This object belongs to the “Motorboat”
category. Its “ship-visibility” is
“partially visible”, “ship-purpose”
is “commercial”, {} is {}, ……
Detector
OR
User Interaction
LLM
The object within the specified polygon bounding box is an
airplane, …… The aircraft has a white fuselage with a dark-colored
tail section, consistent with typical commercial or general
aviation designs. Its wings extend outward from the main body, ……
Global & Focal
Feature Extractor
several buildings are around an oval building.
a red church is near some green trees and meadows.
(b) Transformer-based Image Captioning
Detector
(c) Object-level Attribute Understanding
(d) DescribeEarth
(Geo-spatial Detailed Localized Captioning)
Fig. 1. Some methods proposed to resolve remote sensing image description
related tasks. (a) and (b) are typical image captioning frameworks [8], [11].
(c) is a recent object description model [12], but it can only generate
template-based descriptions across a limited number of categories and does
not support interactive descriptions. (d) is our DescribeEarth model, which
can generate detailed, open-ended and localized descriptions based on off-
the-shelf detectors or user interactions.
these images is crucial for unlocking their full potential,
enabling more efficient analysis, rapid decision-making, and
broader accessibility for both domain experts and the pub-
lic [8]–[10].
Historically, the task of image description, often referred to
as image captioning, primarily focused on generating a single,
arXiv:2509.25654v1  [cs.CV]  30 Sep 2025
JOURNAL OF LATEX CLASS FILES, VOL. 14, NO. 8, AUGUST 2021 2
The ship within the specified polygon bounding box
appears to be a small vessel, likely a recreational boat or
yacht, given its size and shape. It is situated among other
similar-sized vessels in an organized marina setting. The
ship has a light-colored hull, possibly white or light gray,
and features a distinct cabin structure near the center. Its
orientation suggests it is docked parallel to adjacent ships,
indicating a structured docking arrangement typical of
marinas. The surrounding environment includes multiple
rows of similarly sized boats, all aligned neatly along
designated slips, reinforcing the context of a marina.
There are no visible signs of activity around this particular
ship, such as people or movement, suggesting it is
stationary at the time of capture. The overall appearance
and context strongly indicate that this object is indeed a
ship, specifically a recreational vessel.
DescribeEarth
The object within the bounding box defined by the
coordinates appears to be a boat docked at a marina. The
image shows multiple rows of boats moored along piers.
GPT-4o
This is an aerial, top-down view of a white boat docked in
a slip at a marina. The boat is positioned vertically in the
frame, moored alongside a finger pier. It is one of many
similar boats arranged in a long, neat row in the dark
water of the harbor.
Gemini-2.5-pro
A white, oval-shaped lightbulb with a visible filament
structure and a metallic screw base ……
DAM
Please describe the object in the bounding box in the <image>, where the bounding box is defined by the coordinates:
(<x_left_top>, <y_left_top>, <x_right_top>, <y_right_top>, <x_right_bottom>, <y_right_bottom>, <x_left_bottom>, <y_left_bottom>).
Fig. 2. Comparison of DescribeEarth, DAM [13], and other general MLLMs [14], [15] in describing remote sensing images. Green rendering represents
intrinsic features of the target, yellow denotes spatial features, blue indicates contextual features, and red signifies incorrect descriptions. DescribeEarth delivers
the most detailed and accurate object descriptions.
holistic sentence or paragraph for an entire image [16], [17].
Many methods have been proposed to solve this challenge, and
some typical methods are presented in Fig. 1. Early approaches
relied on architectures like CNN-RNN encoders [18]–[20] or
attention-based mechanisms [21]–[23], often trained on small
datasets and producing brief, coarse-grained sentences. With
the advent of Multi-modal Large Language Models (MLLMs),
these capabilities have significantly advanced, allowing for
more coherent and contextually rich descriptions for gen-
eral images [24]–[28]. In the remote sensing domain, early
attempts at image captioning also focused on scene-level
descriptions, often adapting general vision-language models
(VLMs) to classify and provide coarse summaries of entire
remote sensing images [29]–[32]. More recently, some efforts
have moved towards generating region-specific descriptions.
For instance, EagleVision [12] proposed an object-level at-
tribute MLLM specifically for remote sensing, aiming to
provide attribute-rich descriptions for detected objects. While
EagleVision represents a step towards localized understanding
in remote sensing, it often produces descriptions that are
constrained by predefined attributes or templates, limiting the
richness and open-ended detail necessary for comprehensive
analysis. Moreover, the few training categories and non-
interactive operations further limit its practicality.
The recent introduction of the Describe Anything Model
(DAM) [33] marks a significant leap in Detailed Localized
Captioning (DLC) for natural images and videos. DAM,
through its focal prompt and localized vision backbone,
adeptly balances local detail with global context, generating
meticulously detailed descriptions for user-specified regions.
Some recent work follows it and has also made significant con-
tributions to this task [13], [34], [35]. While DAM and some
MLLMs excel in the natural image domain, its direct applica-
tion to remote sensing images reveals substantial performance
gaps. As shown in Fig. 2, we present the description results
of DAM and several general MLLMs on a remote sensing
image. GPT-4o [14] and Gemini-2.5-pro [15] can only provide
brief descriptions, lacking details of object attributes, spatial
relationships, and contextual information. DAM has difficulty
defining categories and providing precise descriptions for
some remote sensing instances. This is primarily due to the
differences between natural and remote sensing visual data,
including unique perspectives (e.g., nadir views), vast scale
variations of objects, and the distinct semantic contexts rel-
evant to geographical analysis. Consequently, general models
like DAM, trained on natural image characteristics, struggle to
accurately identify and provide detailed descriptions of objects
and phenomena observed from remote sensing perspectives.
To bridge this critical gap and enable DLC for remote sens-
ing images, a task we formally define as Geo-DLC, we need to
address some challenges. Based on our analysis and building
upon the inherent difficulties of localized captioning [33], we
identify three obstacles for Geo-DLC:
•The development of Geo-DLC models is constrained by
the lack of dedicated datasets. Existing remote sens-
ing datasets typically offer labels for classification [36],
bounding boxes for detection [37], masks for segmen-
tation [38], or coarse descriptions for the entire image
captioning [8], [9], [21], [39], but rarely provide the
instance-level textual descriptions required for Geo-DLC.
Manually creating such a dataset is impractical, requiring
substantial resources and specialized geospatial expertise
to accurately describe complex details and features.
•General VLMs, trained on natural images, possess limited
recognition capabilities for remote sensing targets [40]–
[43]. Objects in remote sensing images appear from
unique perspectives, exhibit vast scale variations, and
contain a significant number of small targets [44]. This
makes them different from objects in natural images.
Consequently, general models struggle to accurately iden-
tify and interpret even common objects when viewed
from these specialized remote sensing perspectives, let
alone capture their intricate details.
•Beyond training data, there is a lack of an evaluation
JOURNAL OF LATEX CLASS FILES, VOL. 14, NO. 8, AUGUST 2021 3
benchmark specifically designed for Geo-DLC. As stated
in [33], traditional language metrics [45]–[47] and current
LLM-based judgments [48] unfairly penalize models for
generating correct details not present in an often incom-
plete reference caption.
To address these limitations and unlock the potential of
detailed localized understanding in remote sensing, this pa-
per introduces a comprehensive practice for Geo-DLC. Our
contributions are summarized as follow:
•We introduce DE-Dataset, the first dataset for Geo-DLC.
This dataset contains oriented bounding boxes (OBBs)
for a diverse range of geographical objects, paired with
instance-level detailed textual descriptions. DE-Dataset is
constructed through a well designed data pipeline that
leverages MLLMs and existing remote sensing object
detection datasets, assisted by human verification. This
enables efficient scaling of annotation to vast amounts of
remote sensing images.
•We present DescribeEarth, a MLLM architecture explic-
itly designed for Geo-DLC task. To address the limited
recognition capability of general models for remote sens-
ing targets, DescribeEarth utilizes RemoteCLIP’s features
as a guiding prior [40] and integrates a novel visual
feature fusion mechanism to effectively encode high-
resolution details and remote sensing category prior of
target regions while maintaining global context, leading
to highly detailed and context-aware localized captions.
•We propose a high-quality benchmark, DE-Benchmark,
specifically tailored for Geo-DLC. Following the rig-
orous attribute-based evaluation methodology of DAM,
we meticulously design an evaluation dataset that moves
beyond traditional reference-based metrics. This ensures
models are appropriately rewarded for providing rich,
accurate details pertinent to the remote sensing context
and penalized for factual errors or irrelevant descriptions,
thereby enabling comprehensive and fair assessment.
II. RELATEDWORK
A. Image Captioning
Image Captioning is a fundamental and critical research
problem in the multi-modal field, which has attracted a lot
of research due to its complexity. Early works were mainly
inspired by natural language processing tasks such as machine
translation [49], and adopted attention-based Encoder-Decoder
architecture as the mainstream scheme [50]–[55]. These meth-
ods usually use region-based CNN (e.g., ResNet [56]) or
Transformer-based backbone [57] as the Encoder to extract
local region features. Then RNN or LSTM is used as Decoder
to generate natural language description. At this stage, a large
number of studies focus on multi-scale attention and feature
modeling in order to improve the understanding of images.
However, limited by the expressive power of convolution
operations, the model still has shortcomings in capturing
the relationship between high-attention regions. Subsequently,
several works noticed the advantages of graph structure in
modeling element relationships and semantic dependencies
[58]–[62] and began to try to construct scene graphs from
images [63]–[69] or text [70], [71]. It is introduced into the
Encoder-Decoder framework [72] to enhance the semantic
alignment of image-text. These methods have made some
progress in improving the accuracy of descriptions, but their
generalization ability is still limited due to their reliance on
small-scale fully supervised training.
With the rise of large-scale pre-trained models [73], re-
searchers have begun to explore the introduction of pre-
training paradigms into image captioning tasks [74]–[76].
Typical representatives such as ClipCap [77] significantly
improved the generalization of the model by mapping the
embeddings extracted by CLIP into the generative network.
Since then, more works have focused on how to better
align pre-trained visual features with text generation tasks
to further improve the performance. At the same time, there
are also studies that try to apply reinforcement learning and
unsupervised learning methods to this task [78]–[80], focusing
on image feature modeling and cross-modal alignment, but
the completeness and length of the generated text are still
limited by the Decoder architecture. In recent years, with
the rapid development of MLLMs, the research paradigm of
image captioning has further evolved. Some works directly
leverage MLLMs to improve the richness and fluency of
natural language output. For example, DLC task and DAM
enable fine-grained natural language descriptions at the object
level [33], but the performance of DAM is not ideal in remote
sensing image scenes, and the detailed language representation
at the object level still faces great challenges. In the field of
remote sensing, EagleVision introduces object-level attribute-
guided formatting descriptions. However, its templated output
and limited categories constrain its ability to describe details
and its generalizability [12].
B. Vision Language Foundation Models for Remote Sensing
With the rapid advancement of multimodal learning, VLMs
have emerged as a critical paradigm for supporting diverse
downstream tasks. Remote sensing, as a highly application-
driven domain, has also witnessed a growing body of re-
search leveraging VLMs. Within the contrastive learning
framework represented by CLIP [73], numerous studies have
sought to adapt the model to remote sensing scenarios.
RemoteCLIP [40], GeoRSCLIP [81] and Git-RSCLIP [82]
construct large-scale image–text datasets and fine-tune CLIP
to enhance performance across multiple tasks. CRSR [83]
and APPLeNet [84] introduce feature integration modules to
strengthen cross-modal alignment, while ProGEO [85] and
GRAFT [86] incorporate auxiliary information to improve
both image encoding and modality interaction. S-CLIP [87]
and RS-CLIP [88] further refine CLIP’s domain adaptation
through improved pseudo-labeling strategies and loss designs.
Although these contrastive learning approaches achieve sub-
stantial performance gains, their scope remains confined to
image–text matching, lacking the capability for natural lan-
guage generation.
To address this limitation, recent studies have extended
remote sensing applications to large-scale conversational VLM
architectures. RS-LLaV A [89] builds upon CLIP as the vision
JOURNAL OF LATEX CLASS FILES, VOL. 14, NO. 8, AUGUST 2021 4
1024px
1024px
System Prompt:
You are a professional remote sensing analyst. Your task is to examine objects
marked by polygon bounding boxes in high-resolution remote sensing images.
Write a clear, coherent paragraph that objectively describes each object’s
visible characteristics. Avoid lists, guesses, or speculative language.
… …
User Prompt:
Category: {instance[class]}; Polygon bounding box: {[…]}
Prompt
Sub-images
for each instance
MLLM
The object within the
specified polygon bound-
ing box is an aircraft,
identifiable as a comer-
cial jet due to its dis-
tinct features. The air-
craft … …
Raw Description
Manual Sampling
&
Inspection
DE-Dataset
Eliminated
Sub-images
incomplete object no object
… …
… …
18,417 images
261,806 instances
25 categories
(a) Image and OBB collection (b) Generation of detailed localized descriptions
Fig. 3. The production pipeline of our DE-Dataset. (a) is the tiling strategy used in dataset preprocessing. (b) is the generation process of localized description.
encoder and adapts the LLaV A [24] framework through in-
struction tuning, enabling dialog-based remote sensing VLMs.
EarthGPT [90] and EarthMarker [91] optimize vision encoders
to enhance multi-scale object representation, while VHM [32]
and SkySenseGPT [92] mitigate CLIP’s limited spatial aware-
ness by constructing higher-quality image–text pairs. In par-
allel, several works such as RSGPT [93], LHRS-Bot [30],
TEOChat [31], and UniRS [94] explore Vision–LLM connec-
tor architectures to improve multimodal perception. Beyond
architectural advances, some methods have been proposed
to address specific challenges of remote sensing VLMs. For
instance, chain-of-thought reasoning and data augmentation
strategies have been introduced to improve reasoning and
generalization capabilities, as demonstrated in CPSeg [95],
MGeo [96], and SpectralGPT [97].
C. Remote Sensing Datasets
Currently, most existing remote sensing VLMs are data-
driven, and in general, different tasks rely on their specific
datasets. For remote sensing visual question answering, Earth-
VQA [98] and CRSVQA [99] adopt manual annotation to
ensure high-quality supervision. For object detection, datasets
such as FAIR1M [100], DOTA [37], and DIOR [101] have
been developed, while classification tasks are supported by
AID [36], NWPU-RESISC45 [102], and UCM [103], and
semantic segmentation relies on pixel-level datasets such
as iSAID [104]. Building on these resources, several ex-
tended datasets have been proposed by combining or re-
annotating existing ones to address new challenges, including
RSVGD [105], RefSegRS [106], and SkyEye-968K [107].
Although these datasets cover fundamental tasks and some
emerging applications, the demand for large-scale remote
sensing vision-language datasets is growing rapidly with the
development of MLLMs. To address this, researchers have
explored automated annotation pipelines supported by gen-
eral foundation models. GeoChat [29] designs system-level
prompts to interact with Vicuna [108] for generating multi-turn
question–answer pairs. HqDC-1.4M [32] employs Gemini-
1.0-pro-vision to produce textual descriptions for large-scale
remote sensing images, yielding extensive image–text pairs.
FIT-RS [92] leverages TinyLLaV A-3.1B [109] to generate
background descriptions of remote sensing images and inte-
grates GPT-4 or GPT-3.5 for high-quality annotation. Despite
these advances, high-quality fine-grained object-level datasets
remain scarce, and current pipelines for generating object-level
descriptions are still immature.
III. TASK, DATASET ANDBENCHMARK
This section formally defines the Geo-DLC task, details
the construction of DE-Dataset, and introduces the DE-
Benchmark. These address the challenges in Section I.
A. Task Formulation
Following the framework of DLC as established in [33],
the Geo-DLC task extends this concept to the remote sensing
image. Unlike general image captioning which provides a
holistic summary, Geo-DLC focuses on generating precise,
comprehensive textual descriptions for specific geographical
regions or objects within remote sensing images. Formally,
given an input imageIand a user-specified geographical
Region of Interest (ROI)RwithinI(typically represented
by various localization cues such as a bounding box, point,
or binary mask), the objective is to generate a detailed textual
descriptionTcentered on the instance. Such descriptions are
required to cover both intrinsic object features and contextual
environmental attributes, ensuring logical consistency and in-
formativeness. This task can be formulated as:
T=Model(I, R) (1)
The Geo-DLC task is challenging due to the inherent
differences in object appearance from an aerial viewpoint, the
vast scale variations, and the complex background contexts
prevalent in remote sensing images. It demands a model to not
only recognize objects under these unique conditions but also
to elaborate on their fine-grained attributes and relationships,
which existing general MLLMs often fail to achieve.
JOURNAL OF LATEX CLASS FILES, VOL. 14, NO. 8, AUGUST 2021 5
/uni00000059/uni00000048/uni0000004b/uni0000004c/uni00000046/uni0000004f/uni00000048
/uni00000056/uni0000004b/uni0000004c/uni00000053
/uni00000044/uni0000004c/uni00000055/uni00000053/uni0000004f/uni00000044/uni00000051/uni00000048
/uni00000056/uni00000057/uni00000052/uni00000055/uni00000044/uni0000004a/uni00000048/uni00000057/uni00000044/uni00000051/uni0000004e
/uni0000004b/uni00000044/uni00000055/uni00000045/uni00000052/uni00000055
/uni00000057/uni00000048/uni00000051/uni00000051/uni0000004c/uni00000056/uni00000046/uni00000052/uni00000058/uni00000055/uni00000057
/uni00000045/uni00000055/uni0000004c/uni00000047/uni0000004a/uni00000048
/uni00000045/uni00000044/uni00000056/uni00000048/uni00000045/uni00000044/uni0000004f/uni0000004
```

## 2604.09121v3.pdf
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
No ! Call Sarah Night !
ASR
Traditional ASR Paradigm
Hi Siri, call Sarah Knight
Hi Siri, call Sarah Night
No, her last name starts with a K
Hi Siri, call Sarah Knight
User [Input]
Interactive ASR Paradigm
User   [Correct]
Task Succeed✓
Interactive ASR
[Mode: Transcribe]
Interactive ASR
[Mode: Correct]
Figure 1: Traditional vs. Interactive ASR paradigms. (Top) Tra-
ditional systems struggle with named entities (e.g., ”Night” vs.
”Knight”); (Bottom), our proposed Interactive ASR can take
user’s spoken language instructions (e.g., ”starts with a K”) as
the feedback to update and correct ASR results.
However, despite the rapid progress in ASR, several impor-
tant aspects remain underexplored. The first concerns the eval-
uation metrics used for ASR systems. For decades, Word Er-
ror Rate (WER) has been widely adopted to measure the dis-
crepancy between recognition hypotheses and reference tran-
scriptions by aligning words in the two sequences. Despite its
simplicity and objectivity, this de facto metric has several well-
known limitations. In particular, WER treats all words equally
and assigns the same penalty to each recognition error, while dif-
ferent types of words may affect sentence semantics differently
[15]. For example, errors in function words often have limited
impact, whereas misrecognition of critical content words such
as named entities can significantly alter the intended meaning.
As a result, WER may fail to adequately reflect the semantic
impact of recognition errors. Meanwhile, large language mod-
els (LLMs) have demonstrated strong semantic understanding
arXiv:2604.09121v3  [cs.CL]  14 Apr 2026
capabilities and can often infer or correct minor recognition er-
rors during interaction[ 16]. This suggests that future evaluation
of ASR systems should move beyond word-level accuracy and
focus more on errors that may mislead downstream language un-
derstanding.
The second issue lies in the integration of user feedback.
In human communication, clarification and correction through
interaction are common when key information is ambiguous or
misunderstood. However, such interactive correction has been
largely overlooked in human–computer interaction. Most cur-
rent ASR systems cannot revise their recognition outputs once
errors occur, even when users explicitly point them out, which
may significantly degrade user experience, particularly in on-
screen scenarios. Moreover, the inherent ambiguity of spoken
language—such as homonyms in names or recognition errors
caused by accents or background noise—further motivates the
development of ASR systems that can interact with users to clar-
ify and correct recognition results.
To address these challenges and adapt ASR systems to the
LLM era, we propose Interactive ASR , a framework that in-
tegrates semantic-aware evaluation and user interaction. First,
we revisit LLM-as-a-Judge[17] for ASR evaluation and demon-
strate that modern LLMs can achieve strong agreement with
human judgments when assessing the semantic consistency be-
tween ASR outputs and reference transcriptions. This motivates
our proposed Sentence-level Semantic Error Rate ( 𝑆2ER) as
a complementary metric to WER to evaluate semantic coher-
ence. In addition, we design an LLM-driven agentic framework
that enables ASR systems to interact with users and leverage
feedback for iteratively correcting recognition errors. Our key
contributions are summarized as follows:
• New ASR Semantic Metric ( 𝑆2𝐸 𝑅): We propose 𝑆2𝐸 𝑅,
a novel evaluation metric that leverages LLMs as judges to
assess ASR semantic success. Through human evaluation,
we demonstrate a strong correlation between LLM judgments
and human preferences in terms of semantic consistency.
• Agentic Correction Framework: We develop an LLM-
simulated interactive correction framework to iteratively im-
prove ASR performance.
• Robust Generalization and Validation: Extensive exper-
imental validation across diverse linguistic standard bench-
marks, demonstrates the framework’s broad applicability.
2. Related Works
While WER has long served as the standard metric for ASR eval-
uation, its inherent design of assigning equal weight to all words
fails to capture critical semantic errors. To address this, several
semantic-aware metrics have been proposed. Semantic WER
[15] introduced dynamic weighting, which utilizes Named En-
tity Recognition to extract keywords, assigning higher weights to
critical entities and lower weights to filler words during error cal-
culation. Moving to embedding-based evaluation, SemDist [18]
utilized RoBERTa-based sentence embeddings to measure se-
mantic similarity beyond literal overlap. Most recently, LASER
[19] leveraged LLMs to assign graded penalties based on er-
ror severity (e.g., ignoring colloquial variations while penalizing
meaning changes). Unlike these continuous scoring metrics, our
LLM-as-a-Judge adopts a binary functional criterion, acting as
a strict gatekeeper to determine if the user’s intent is executable.
Regarding error correction based on human feedback, tradi-
tional ASR systems have explored several approaches, but they
often rely on rigid interactions. Early methods utilized Multi-
Intent RouterPrevious
Transcript
ASR
User Speech
� �
� �−1
new
Utterance
Corrective intent
ASR Result
Locate Reason Replace
Reasoning Corrector
I�
Figure 2: Overview of the Interactive ASR framework. An LLM
Intent Router classifies the base ASR hypothesis ( 𝐻𝑡 ) using the
previous transcript ( 𝑌𝑡 −1). New utterances bypass correction
and are output directly, while corrective instructions trigger an
LLM Reasoning Corrector to refine 𝑌𝑡 −1 via a three-step CoT
process (Locate, Reason, Surgical Replacement).
modal Interfaces [20], requiring users to manually select alter-
natives from an N-best list via a GUI or keyboard, which disrupts
the hands-free nature of voice interactions. Another approach is
Acoustic Respeaking [21], where users simply repeat the mis-
recognized utterance, which is highly inefficient. In contrast,
the NLP community has successfully leveraged natural language
feedback for error resolution. For instance, agentic frameworks
like ReAct [22] enable LLMs to iteratively reason and refine
their outputs based on human or environmental feedback. In-
spired by these advancements, our work introduces this inter-
active paradigm to ASR. Instead of relying on manual edits or
rigid repetition, our framework allows users to correct recogni-
tion errors using natural, spoken instructions.
3. Proposed Paradigm
Let 𝐼 denote the user speech and𝑌 the output transcript. Existing
ASR systems operate under a single-pass decoding paradigm:
𝑌 = ASR(𝐼) (1)
This formulation is static: once a transcription is produced, the
system has no mechanism to incorporate subsequent user feed-
back.
To address this limitation, we propose the Interactive ASR
framework (illustrated in Figure 2). It cascades a base ASR
model with an LLM-based reasoning module, enabling the sys-
tem to refine its output based on user feedback.
At turn 𝑡, the user provides an input speech 𝐼𝑡 , which is first
transcribed by the base ASR model into a text hypothesis 𝐻𝑡 .
The text hypothesis, together with the previous transcript 𝑌𝑡 −1,
is passed to an LLM-based Intent Router, which analyzes the se-
mantic relationship between them to dynamically route the pro-
cessing pipeline. If 𝐻𝑡 does not express any corrective intent
toward 𝑌𝑡 −1, 𝐻𝑡 is classified as a new utterance and is directly
adopted as the final ASR result 𝑌𝑡 . Otherwise, if 𝐻𝑡 carries a
Corrective Intent targeting 𝑌𝑡 −1, an LLM-based Reasoning Cor-
rector is invoked to update the hypothesis:
𝑌𝑡 = ReasoningCorrector(𝑌𝑡 −1, 𝐻 𝑡 ; Prefine) (2)
Guided by a structured prompt P𝑟 𝑒 𝑓 𝑖𝑛𝑒, the Reasoning Correc-
tor employs a Chain-of-Thought (CoT) [23] approach to system-
atically refine the transcription through three specific steps: (1)
Locate errors in 𝑌𝑡 −1 via instruction 𝐻𝑡 ; (2) Reason the intended
correction using phonetic or lexical constraints; and (3) Surgi-
cal Replacement of erroneous segments while preserving the
rest of the sentence.
4. Automated Simulation Framework
Large-scale human evaluation of interactive ASR in continuous
scenarios is expensive and limits reproducibility. To address this
and systematically evaluate the corrective capability of our sys-
tem (the right branch in Figure 2), we design an automated sim-
ulation framework tailored for single-utterance iterative correc-
tion. As illustrated in Figure 3, it comprises a User Simulator,
the interactive correction modules of our ASR system, and a se-
mantic evaluation module.
LLM
Correction Generator
TTS Vocalizer
User Simulator
LLM
Reasoning Corrector
ASR Model
Interactive ASR
Semantic Match
（LLM-as-a-judge）
️ User Speech
ASR Model
Ground Truth
Hypothesis Succeed✓
Yes
No
Update Hypothesis
❶ Stage 1
❷ Stage 2
❸ Stage 3
❹ Stage 4
Figure 3: Overview of the Automated Simulation Framework.
An LLM-as-a-judge first evaluates the semantic coherence of the
initial ASR hypothesis. Upon detecting an error, the User Simu-
lator generates a spoken correction instruction via an LLM and
TTS. The Interactive ASR then processes this feedback to rea-
son and update the hypothesis, forming an automated correction
process.
4.1. User Simulator
The User Simulator acts as an oracle to emulate human correc-
tive behavior. Given a ground-truth transcript 𝑌𝐺𝑇 , the simu-
lator evaluates the hypothesis 𝑌𝑡 −1 from the previous turn and
generates feedback:
• Correction Generator: If a semantic mismatch exists be-
tween 𝑌𝑡 −1 and 𝑌𝐺𝑇 , the simulator generates a natural lan-
guage correction 𝐶𝑡 conditioned on given prompt 𝑃𝑢𝑠𝑒𝑟 :
𝐶𝑡 = LLM𝑢𝑠𝑒𝑟 (𝑌𝐺𝑇 , 𝑌𝑡 −1; P𝑢𝑠𝑒𝑟 ) (3)
To ensure the interaction mirrors real-world behavior, Puser
contains diverse human-like strategies, including phonetic
spelling, contextual clarification, and direct negation.
• TTS Vocalizer: To maintain speaker consistency across
turns, we employ a zero-shot voice-cloning TTS model. By
utilizing the original source audio 𝐼0 as an acoustic reference,
the correction text 𝐶𝑡 is synthesized into a speech instruction
𝐼𝑡 :
𝐼𝑡 = TTS(𝐶𝑡 , 𝐼0) (4)
4.2. Interactive ASR System
In this simulation context, the Interactive ASR system operates
as an iterative state-updating engine for a single utterance. The
process is initialized at 𝑡 = 0, where the base ASR model de-
codes the original user speech 𝐼0 into the initial hypothesis 𝑌0.
For each subsequent turn 𝑡 > 0, the system receives a corrective
speech 𝐼𝑡 from the user simulator. Since the input is strictly a
correction in this testing setup, the Intent Router is bypassed.
The corrective speech is firstly transcribed by the base ASR
model into a text hypothesis 𝐻𝑡 . Subsequently, the Reasoning
Corrector , directly processes the previous state 𝑌𝑡 −1 alongside
𝐻𝑡 . By leveraging the same Chain-of-Thought (CoT) reason-
ing described in Section 3, it identifies erroneous segments and
performs surgical edits to produce the updated state 𝑌𝑡 :
𝑌𝑡 = ReasoningCorrector(𝑌𝑡 −1, 𝐻𝑡 ; P𝑟 𝑒 𝑓 𝑖𝑛𝑒) (5)
This iterative refinement loop continues until the Semantic
Judge verifies the transcript against the ground truth or a pre-
defined maximum turn limit is reached.
4.3. Sentence-level Semantic Error Rate ( 𝑆2𝐸 𝑅)
To precisely quantify task-oriented success, we define 𝑆2𝐸 𝑅 as
the average semantic mismatch rate across 𝑁 utterances:
𝑆2𝐸 𝑅 = 1
𝑁
𝑁∑
𝑖=1
( 1 − LLM 𝑗𝑢𝑑𝑔𝑒 (𝑌𝑖, 𝑌𝐺𝑇 ,𝑖; P 𝑗𝑢𝑑𝑔𝑒 )) (6)
where LLM 𝑗𝑢𝑑𝑔𝑒 (·) ∈ { 0, 1} outputs 1 for semantic equiva-
lence. To ensure 𝑆2𝐸 𝑅 reflects functional correctness, P 𝑗𝑢𝑑𝑔𝑒
instructs the judge to prioritize core intent and critical enti-
ties, ignoring minor surface-level variations (e.g., filler words
or punctuation).
5. Experiments
In this section, we comprehensively evaluate the proposed Inter-
active ASR framework. We first outline the experimental setup
in Section 5.1, detailing the diverse benchmarks and the foun-
dational models. Before analyzing the system performance, we
conduct a Human-AI Alignment Study in Section 5.2 to es-
tablish the credibility of 𝑆2𝐸 𝑅 by demonstrating its consistency
with human intuition. Subsequently, we present the Main Re-
sults of the interactive framework in Section 5.3, utilizing a
combination of performance tables, trend curves, and case stud-
ies to provide a holistic demonstration of the system’s corrective
capabilities.
5.1. Experiments Setup
To comprehensively evaluate the robustness and generalization
of our Interactive ASR framework across diverse and challeng-
ing scenarios, we conduct experiments on three representative
benchmarks: ASRU2019 Test [24], a 20-hour test set target-
ing complex intra-sentential Mandarin-English code-switching;
GigaSpeech Test [25], a 40-hour multi-domain English subset
from podcasts and Y ouT ube representing diverse acoustic en-
vironments; and WenetSpeech Net [26], a 23-hour Mandarin
test split of internet-sourced spontaneous speech. In our exper-
iments, we employ Qwen3-ASR-1.7B [14] as the foundational
ASR model to generate initial text hypotheses across English,
Mandarin, and code-switching scenarios. For cognitive process-
ing, Qwen3-32B [27] powers both the Correction Generator
module within the User Simulator, the Reasoning Corrector in
the Interactive ASR, and the Semantic Judge. Finally, Index-
TTS-1.5 [28] serves as theTTS Vocalizerin the User Simulator,
utilizing the original speech as an acoustic prompt to maintain
timbre consistency across multi-turn interactions.
5.2. Human-AI Alignment Study
To validate 𝑆2𝐸 𝑅 as a reliable ASR metric, we investigate its
alignment with human perception. Drawing inspiration from
established testing paradigms in Spoken Language Assessment
[29], we curated a balanced evaluation subset of 120 ASR
hypothesis-ground truth pairs from the three datasets detailed
in Section 5.1 (40 pairs per dataset, evenly split between se-
mantically equivalent and non-equivalent instances based on ini-
tial LLM predictions). 23 nonprofessional annotators and 5 in-
domain experts performed binary judgments (1 for semantically
equivalent, 0 for non-equivalent) on these pairs and the averaged
rating are served as the human consensus. We then utilized the
Pearson correlation coefficient ( 𝑟)[30] to quantify how closely
the automated LLM judge and individual domain experts align
with the human consensus.
Table 1: Pearson correlation coeﬀicients of LLM and Expert
judgments against the Human Ground Truth. Bold values indi-
cate the higher correlation in each row.
Dataset LLM (𝑟) Expert ( 𝑟)
GigaSpeech 0.8730 0.8345
WenetSpeech 0.7873 0.7351
ASRU2019 0.8556 0.8613
Overall 0.8281 0.8104
The comparative alignment results are presented in Ta-
ble 1. Both the LLM and expert evaluations demonstrate ro-
bust consistency with overall human judgment. Notably, the
LLM judge achieves an overall Pearson coefficient of 0.8281,
effectively surpassing the average alignment of domain experts
(𝑟 = 0.8104). These findings explicitly confirm that our LLM-
based evaluator exhibits a high degree of fidelity to human se-
mantic perception, firmly establishing its validity as the scoring
engine for 𝑆2𝐸 𝑅.
5.3. Main results: Multi-turn iteractive performance
Table 2 and Figure 4 present the performance of our Interactive
ASR framework across three datasets, tracking traditional met-
rics alongside our proposed 𝑆2𝐸 𝑅. Specifically, Table 2 reports
the exact metric values at key discrete stages (loops 0, 1, 2, 3,
and 10), while Figure 4 illustrates the continuous performance
trajectory across all 10 interaction loops.
Crucially, the trend curves reveal a steep improvement con-
centrated within the initial turns. After just a single interaction
loop, 𝑆2𝐸 𝑅 experiences a dramatic drop: from 14.12% to 6.03%
on GigaSpeech Test, 15.56% to 6.26% on WenetSpeech Net,
and 26.89% to 8.10% on ASRU2019 Test. By the second loop,
𝑆2𝐸 𝑅 further decrease to 3.66%, 3.81%, and 4.59%, respec-
tively. In natural human-computer interaction, user patience de-
grades sharply with repeated failures. By resolving core ambi-
guities in just 1–2 turns, our framework mirrors natural conver-
sational repair, ensuring a frictionless user experience.
Beyond the second turn, the system continues to yield steady
improvements. Although the reduction margin naturally nar-
rows compared to the massive drops in the first two loops, the
ongoing gains are still substantial. We report the 10-turn limits
(achieving final 𝑆2𝐸 𝑅s of 1.08%, 1.11%, and 0.82%, respec-
Table 2: Performance evolution of the proposed sentence-level
semantic error rate ( 𝑆2ER) versus conventional metrics (WER,
CER, MER, SER) across iterative interaction rounds on three
datasets.
Loop GigaSpeech WenetSpeech ASRU2019
WER SER 𝑆2𝐸 𝑅 CER SER 𝑆2𝐸 𝑅 MER SER 𝑆2𝐸 𝑅
0 12.25 61.17 14.12 6.89 35.24 15.56 6.60 38.85 26.89
1 11.08 58.56 6.03 4.59 28.59 6.26 3.59 25.22 8.10
2 10.82 58.03 3.66 4.07 26.97 3.81 3.21 23.04 4.59
3 10.68 57.80 2.67 3.82 26.30 2.71 3.09 22.08 3.06
10 10.53 57.59 1.08 3.51 25.32 1.11 2.88 20.88 0.82
Note: All values are percentages. CER = Character Error Rate; WER =
Word Error Rate; MER = Mixture error rate, which considers
Mandarin characters and English words as the tokens in the edit
distance calculation. SER = Sentence Error Rate; 𝑆2𝐸 𝑅 =
Sentence-level Semantic Error Rate (proposed).
0 1 2 3 4 5 6 7 8 9 10
0
10
20
30S2ER (%)
GigaSpeech T est WenetSpeech Net ASRU2019 T est
0 1 2 3 4 5 6 7 8 9 10
Interaction Loop
0
5
10
15CER/WER/MER (%)
Figure 4: Comparison of 𝑆2𝐸 𝑅 (top) and CER/WER/MER (bot-
tom) reduction trends across three datasets.
tively) not as practical operational targets, but to establish the
system’s theoretical upper bound. By this 10th loop, our system
achieves near-perfect performance. Qualitative analysis reveals
that the very few bad cases at this stage primarily stem from cas-
cading ASR errors during the interaction. When the base ASR
repeatedly misrecognizes the user’s corrective instructions, the
LLM loses the reliable anchors required for surgical replace-
ment, ultimately causing the correction loop to stall.
6. Conclusion
In this work, we addressed two critical limitations in traditional
ASR: semantic-blind evaluation and the absence of interactive
correction mechanisms. We introduced 𝑆2𝐸 𝑅, a novel met-
ric that leverages LLMs as judges to prioritize sentence-level
semantic coherence. Furthermore, we proposed an Interactive
ASR framework that employs CoT reasoning to iteratively re-
fine transcripts via spoken feedback.
Our experiments establish 𝑆2𝐸 𝑅 as a reliable ASR met-
ric, demonstrating a strong correlation with ground-truth seman-
tics that surpasses average human performance. Additionally,
our framework proved highly effective across diverse and chal-
lenging scenarios, including English, Mandarin, and Mandarin-
English code-switching.
While this study highlights the potential of interactive ASR,
our current simulations rely on large models to establish an up-
per performance bound. Future work will explore deploying
these frameworks on smaller, constrained architectures, aiming
to perfectly balance high-level cognitive reasoning with compu-
tational efficiency.
7. References
[1] A. Graves, S. Fernández, F. Gomez, and J. Schmidhuber, “Con-
nectionist temporal classification: labelling unsegmented se-
quence data with recurrent neural networks,” in Proceedings of
the 23rd international conference on Machine learning , 2006, pp.
369–376.
[2] A. Graves, “Sequence transduction with recurrent neural net-
works,” arXiv preprint arXiv:1211.3711, 2012.
[3] W . Chan, N. Jaitly, Q. Le, and O. Vinyals, “Listen, attend and
spell: A neural network for large vocabulary conversational speech
recognition,” in 2016 IEEE international conference on acoustics,
speech and signal processing (ICASSP) . IEEE, 2016, pp. 4960–
4964.
[4] A. Radford, J. W. Kim, T. Xu, G. Brockman, C. McLeavey,
and I. Sutskever, “Robust speech recognition via large-scale weak
supervision,” in International conference on machine learning .
PMLR, 2023, pp. 28 492–28 518.
[5] J. Wu, Y . Gaur, Z. Chen, L. Zhou, Y . Zhu, T. Wang, J. Li, S. Liu,
B. Ren, L. Liu et al. , “On decoder-only architecture for speech-
to-text and large language model integration,” in 2023 IEEE au-
tomatic speech recognition and understanding workshop (ASRU) .
IEEE, 2023, pp. 1–8.
[6] M. Wang, W. Han, I. Shafran, Z. Wu, C.-C. Chiu, Y . Cao, N. Chen,
Y . Zhang, H. Soltau, P . K. Rubenstein et al. , “Slm: Bridge the
thin gap between speech and text foundation models,” in 2023
IEEE Automatic Speech Recognition and Understanding Work-
shop (ASRU). IEEE, 2023, pp. 1–8.
[7] C. Tang, W. Yu, G. Sun, X. Chen, T. Tan, W. Li, L. Lu, Z. Ma, and
C. Zhang, “Salmonn: Towards generic hearing abilities for large
language models,” arXiv preprint arXiv:2310.13289,
```

## 2604.11998v1.pdf
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
cation [24–26, 33, 55, 84, 102, 105, 123, 124, 129–131],
its extension to object detection, namely cross-domain few-
shot object detection (CD-FSOD), remains relatively under-
explored with few exceptions. Typically, CD-ViTO [27]
first formally defines this task, and constructs a comprehen-
sive CD-FSOD benchmark which takes COCO as source
data and six novel datasets (ArTaxOr, Clipart1k, DIOR,
DeepFish, NEU-DET, UODD) as targets. Following CD-
ViTO, newly proposed methods include CDFormer [69],
StyleProto [120], ETS [74], Domain-RAG [58], LMP [112],
tackling CD-FSOD from various perspectives.
Though with the emergence of few methods, the CD-
FSOD task is still brand new and also challenging. Thus,
we are motivated to host the challenge to further promote
arXiv:2604.11998v1  [cs.CV]  13 Apr 2026
the advances on CD-FSOD task. Specifically, we expand
the evaluation to three additional unseen target domains,
namely RUOD [13], CARPK [36], and CarDD [114], to
further assess the generalization capability of CD-FSOD
models. Consistent with the findings of CD-ViTO, these
datasets exhibit substantial domain discrepancies with re-
spect to the source data, characterized by variations in vi-
sual style, inter-class variance (ICV), and ambiguous cat-
egory boundaries (IB). As for the specific task settings,
following the 1st CD-FSOD challenge [28], we keep two
sub settings:closed-source CD-FSODtask andopen-source
CD-FSODtask, supporting systematically studying of mod-
els. Particularly, theclosed-source CD-FSODrefers the
one initiall proposed in CD-ViTO protocol, which training
data is strictly restricted to the predefined source domain
(e.g., MS-COCO); while the more flexibleopen-source CD-
FSODtask is proposed for lifting this constraint, allowing
participants to exploit additional data sources, prior knowl-
edge, and large-scale foundation models, thereby exploring
the upper-bound performance on the target domains.
Formally, organized as part of the 2026 New Trends in
Image Restoration and Enhancement (NTIRE 2026) Work-
shop, which emphasizes robustness under varying condi-
tions, the second CD-FSOD Challenge is introduced to
advance research in this area. The challenge consists of
two tracks: an open-source CD-FSOD track as the primary
track, and a closed-source CD-FSOD track as a supplemen-
tary track. In the closed-source setting, MS-COCO is used
as the exclusive source domain for training. The validation
phase follows the protocol of CD-ViTO and includes six
predefined target domains. In addition, three newly intro-
duced domains are reserved for the final evaluation in both
tracks. Performance is assessed using mean Average Pre-
cision (mAP) as the official ranking metric. We anticipate
that this challenge will stimulate further progress in CD-
FSOD and encourage the development of more robust and
generalizable detection approaches.
This challenge is one of the challenges associated with
the NTIRE 2026 Workshop 1 on: deepfake detection [35],
high-resolution depth [122], multi-exposure image fu-
sion [80], AI flash portrait [30], professional image qual-
ity assessment [78], light field super-resolution [115], 3D
content super-resolution [110], bitstream-corrupted video
restoration [133], X-AIGC quality assessment [66], shadow
removal [107], ambient lighting normalization [106], con-
trollable Bokeh rendering [90], rip current detection and
segmentation [19], low light image enhancement [15],
high FPS video frame interpolation [16], Night-time de-
hazing [1, 2], learned ISP with unpaired data [76],
short-form UGC video restoration [56], raindrop re-
moval for dual-focused images [57], image super-resolution
(x4) [12], photography retouching transfer [20], mobile
1https://www.cvlai.net/ntire/2026/
real-word super-resolution [51], remote sensing infrared
super-resolution [62], AI-Generated image detection [34],
cross-domain few-shot object detection [79], financial re-
ceipt restoration and reasoning [29], real-world face restora-
tion [109], reflection removal [6], anomaly detection of face
enhancement [128], video saliency prediction [70], efficient
super-resolution [85], 3d restoration and reconstruction in
adverse conditions [65], image denoising [99], blind com-
putational aberration correction [101], event-based image
deblurring [100], efficient burst HDR and restoration [75],
low-light enhancement: ‘twilight cowboy’ [42], and effi-
cient low light image enhancement [119].
2. NTIRE 2026 CD-FSOD Challenge
2.1. Challenge Overview
Our challenge aims to advanceCross-Domain Few-Shot
Object Detection (CD-FSOD)—detecting objects across
domain shifts with limited labeled data. We use six pre-
viously published target domains [27] as validation sets and
introduce three newly constructed datasets for final test-
ing. In addition to these dataset updates, we proposeopen-
source CD-FSOD, allowing participants to freely select
source datasets and pre-trained models to improve gener-
alization. Fig. 1 presents both the predefined closed-source
CD-FSOD setting and the open-source CD-FSOD setting,
together with the newly introduced target domains.
2.2. Task Formulations
Closed-Source CD-FSOD.Given a source datasetD S and
a novel target datasetD T , the closed-source CD-FSOD
track assumes that the source class setC S and the target
class setC T are completely disjoint, i.e.,C S ∩ CT =∅. Ad-
ditionally, the distributions of the source domainD S and
the target domainD T are not identical. Participants are re-
quired to train models onD S and test them onD T , where
each class inC T has only a few labeled examples. Usually,
DS is a single dataset, as in CD-ViTO [27]. We refer to this
setting as closed-source CD-FSOD to differentiate it from
the open-source variant.
Open-Source CD-FSOD.In contrast to the closed-source
setting where training data is strictly limited, the open-
source CD-FSOD track is designed to leverage the capa-
bilities of foundation models. Since these models are pre-
trained on large-scale and diverse datasets, it is practically
hard to trace all the knowledge embedded within them.
Hence, we refer to this setting asopen-source. While the re-
laxed constraints on source data make it difficult to strictly
ensure non-overlapping classes between the source and tar-
get data, the track still focuses on addressing the core chal-
lenges of domain shift and few-shot object detection. We
believe this setting will significantly accelerate the develop-
ment of CD-FSOD methods for real-world applications.
Figure 1. Illustration of the challenge settings, including the closed-source and open-source CD-FSOD tracks. The three newly introduced
target datasets used in the final testing phase are also shown.
In this challenge, the open-source CD-FSOD is des-
ignated as the main track, with awards presented to the
top three teams. The closed-source CD-FSOD serves as
the special track, with a single award granted to the top-
performing team.
N-wayK-shot Protocol.We adopt theN-wayK-shot
evaluation protocol. For each novel class in the target class
setC T ,Klabeled instances are provided, forming the sup-
port setS. The remaining unlabeled instances constitute
the query setQ. Instances contained in the support setS
are used to assist the model in recognizing and detecting
the objects inQ.
2.3. Challenge Phases and Datasets
This challenge involves one development stage and one test-
ing stage. The source dataD S for both stages is the same,
i.e., MS-COCO [59] for the closed-source track and unlim-
ited data for the open-source track. While the testing data
DT is different.
Development Stage:Datasets proposed in the CD-ViTO,
including ArTaxOr [18], Clipart1K [38], DIOR [52], Deep-
Fish [89], NEU-DET [97], and UODD [39] are taken as
targetsD T during development stage.
Testing Stage.Three previously unseen datasets
(RUOD [13], Carpk [36], and CarDD [114]) are introduced
and used as the targetsD T for the final testing phase. Note
that the ground truth annotations for these query sets are
held exclusively by the challenge organizers.
2.4. CD-ViTO Baseline Model
We take CD-ViTO [27] as the baseline for the closed-source
track. Briefly, CD-ViTO is built upon DE-ViT [125] and
fine-tuned using the support set. As in Fig. 2, modules in
blue are inherited from DE-ViT, while modules in orange
are newly proposed. New improvements includelearnable
instance features,instance reweighting,domain prompter,
andfinetuning.
golffield
ship
airplane
Query
Image
Support Images
Region
Proposal
Netwrok
Pretrained
DINOv2 ViT
Pretrained
DINOv2 ViT
ROI
Align
One-vs-Rest
ClassificationHead
DetectionHead
Boxes
golf field
ship
airplane
………
golffieldshipairplane background
…
prototypes
Instance
Reweighting
prototypes
average on objects
🔥
🔥
🔥
🔥
🔥
🔥
🔥
🔥
🔥
🔥
existing modules
🔥our improvements
…
…
…
🔥
🔥
🔥
🔥
🔥
🔥
(a) Framework of Proposed Method
ℒ!"#
ℒ#!$
Domain
Prompter
🔥ℒ%&
InstanceReweighting
a(1 )a-
Avg
Instances
…D
K
…
…
…
N×K×D
D
D
…
N×D
MLP
Weight
Scores
N×K
Weighted
Instances
FC
Å…
N×D
prototypes
Domain Prompter
domains
🔥
🔥
🔥
🔥
domain
diversity ℒ%"'()*
+
ℒ&+","
+
+ +
prototype
consistency
(b)NetworkModules
LearnableInstance Features
…
…
N×K×D N!"# $%&	×D
Figure 2. Overall framework of CD-ViTO baseline method.
Intuitively, the learnable instance feature module is de-
signed to enhance inter-class variance (ICV) among dif-
ferent target classes by making the initially fixed instance
features learnable and optimizing them through supervised
few-shot detection tasks on the target support set. The
instance reweighting module further improves prototype
quality by assigning higher weights to high-quality object
instances—e.g., those with minimal indefinable boundary
(IB). These weights are learned via a lightweight MLP
and fully connected layer, as illustrated in the upper part
of Fig. 2(b). The domain prompter module introduces
learnable domain perturbations to simulate varying domain
styles. These perturbations are applied to object proto-
types, followed by a prototype consistency loss to ensure
that the introduced perturbations do not affect the seman-
tic category of the prototypes. Simultaneously, a domain
diversity loss encourages the generated domains to be suf-
ficiently diverse. The lower part of Fig. 2(b) illustrates this
mechanism. By injecting virtual domains and enforcing
robustness against the induced perturbations, this strategy
enhances the model’s generalization under domain shifts.
Finetuning is applied to the modules highlighted with fire
icons in Fig. 2.
Domain-Aware Background RetrievalDomain-GuidedBackground GenerationForeground-Background Composition
Database
ReduxPROMPTEmbedPROMPT Embed
FLUX
11
1
1
ImageMask
FLUXFILL
Redux
PROMPT Embed
3
3
3
3
2
2
3
InitialBackground
Target Image
Generated Image
RetrievedBackground
GeneratedBackground
32 2InpaintingModel
Training-FreeFixForegroundAdaptBackground+
Figure 3.Overview of Domain-RAG.Domain-RAG consists of
three stages: (1) Domain-aware background retrieval, (2) Domain-
guided background generation, and (3) Foreground-background
composition. The whole pipeline is training-free and follows the
principle offix foreground, adapt background.
2.5. Domain-RAG Baseline Model
We take Domain-RAG [58], the current state-of-the-art
(SOTA) method, as the baseline for the open-source track.
Domain-RAG is a retrieval-guided compositional image
generation framework proposed for cross-domain few-shot
object detection (CD-FSOD). The key idea is to enhance
training samples with domain-consistent synthetic back-
grounds without introducing extra supervision or additional
model training.
As shown in Fig. 3, Domain-RAG first retrieves domain-
relevant background candidates from large-scale image cor-
pora, then generates target-domain-aligned backgrounds
conditioned on the retrieved context, and finally composes
them with the original foreground objects to form realistic
augmented samples. This design preserves foreground se-
mantics while narrowing the domain gap at the background
level, thereby improving the detector’s robustness and gen-
eralization ability in low-shot cross-domain scenarios. No-
tably, as a data augmentation method, in principle, Domain-
RAG could be adapted into any base methods.
2.6. Evaluation Protocol
The final score is measured based on the model’s per-
formance on the three datasets of the testing stage. For
each dataset, we validate the models on three different
few-shot settings: 1-shot, 5-shot, and 10-shot. This re-
sults in a total of nine mean Average Precision (mAP)
scores:D1 1shot,D1 5shot,D1 10shot;D2 1shot,
D2 5shot,D2 10shot; andD3 1shot,D3 5shot,
D3 10shot. TheD1, D2, D3denote the Deep-Fruits,
Carpk, and CarDD, respectively.
The final ranking score is computed as a weighted aver-
ageavg()of these scores:
Score= 2∗avg(D1 1shot,D2 1shot,D3 1shot)
+ 1∗avg(D1 5shot,D2 5shot,D3 5shot)
+ 1∗avg(D1 10shot,D2 10shot,D3 10shot)
Rationale for Weighted Scoring.We assign a higher
weight (×2) to the 1-shot setting for two primary reasons:
(1) Performance in the 1-shot scenario is generally lower
than in the 5-shot and 10-shot settings due to the limited
availability of labeled examples for adaptation; and (2) em-
phasizing 1-shot performance encourages the development
of models that are more robust and effective in extremely
low-data conditions.
3. Challenge Results
Among the 128 registered participants, 15 and 4 teams have
participated the final testing stage and submitted their re-
sults, codes, and factsheets. Table. 1 summarizes the results
of these methods. Detailed descriptions of the participants’
solutions are provided in Sec.4 and Sec.5, each correspond-
ing to a different track.
Open-Source Track Results.In the open-source track,
nearly all participating teams achieved strong performance
with clear improvements over the provided CD-ViTO base-
line. This highlights not only the effectiveness of their pro-
posed methods but also the significance of introducing this
task setting. As observed, relaxing the strict limitation on
the source data offers a substantial advantage in tackling
the CD-FSOD task.
Specifically, the teams FDUROILab Lenovo, CDis-
cover, and NJUST-KMG emerged as the top performers in
this track, achieving scores of 217.21, 192.79, and 191.38,
respectively—significantly outperforming the baseline and
the other competing teams in the same track.
Closed-Source Track Results.The performance achieved
by the closed-source track teams is generally lower than that
of the open-source track. This is quite understandable con-
sidering that the closed-source track enforces stricter con-
straints. Nevertheless, the participants managed to improve
the baseline method clearly.
In particular, the FewShotEverything team stands out
with a final score of 134.31, significantly outperforming the
other competitors in the Special Closed-Source Track. As
shown in Fig. 19, the framework first uses an image gen-
eration model to synthesize underwater images from text
prompts, and then employs a vision-language model to pro-
duce pseudo labels for the generated samples. The strong
results suggest that such a pipeline, which combines data
generation with automatic annotation, can effectively en-
rich the training data and improve detection performance
under the cross-domain few-shot setting. Other teams in
this track also delivered meaningful improvements, demon-
strating the promise of closed-source large models for data
augmentation.
Table 1. Open-source and closed-source results on CD-FSOD (2026). D1, D2, and D3 represent RUOD, CARPK, and CarDD, respectively.
Mean Average Precision (mAP) on 1-shot, 5-shot, and 10-shot are reported. Teams achieving top results are highlighted.
Main Open-Source Track (2026)
Rank Team Name Score D11shot D15shot D110shot D21shot D25shot D210shot D31shot D35shot D310shot
1 FDUROILabLenovo 217.21 57.04 57.15 58.08 59.23 59.23 59.23 45.23 46.17 48.77
2 CDiscover 192.79 34.61 41.14 42.06 63.26 63.00 61.29 39.71 47.43 48.30
3 NJUST-KMG 191.38 35.62 47.51 46.22 60.41 60.51 61.12 40.09 42.01 44.54
4 earth-insights 190.09 38.20 44.95 46.59 58.73 62.78 63.63 33.95 40.10 50.48
5 IntellindustAILab 188.05 39.61 43.05 45.25 53.42 53.60 53.29 44.86 45.82 47.37
6 SAIDA 161.08 30.49 39.38 37.14 56.28 56.80 55.94 30.92 27.95 30.67
7 KLETech-CEVI 159.83 22.11 23.04 21.63 61.86 60.46 60.30 32.24 39.00 42.64
8 Manifold 159.41 29.31 33.91 33.40 58.26 58.26 58.26 21.78 35.09 40.60
9 QiFans 155.41 23.42 23.42 23.42 57.06 57.06 57.06 36.08 36.08 36.08
10 AIRCASMILab 150.61 21.30 30.82 34.14 57.11 55.35 59.66 18.36 37.06 41.23
11 J Gteam 149.95 26.71 38.47 34.86 57.99 57.94 57.51 18.01 26.78 28.87
12 NTR 149.76 26.89 38.23 35.03 58.84 58.71 58.23 17.29 25.82 27.22
13 WRC 139.74 15.63 31.44 27.59 53.20 54.75 54.21 21.92 33.32 36.42
14 NUDT-RSIP 131.41 13.40 17.36 21.64 53.00 54.45 55.04 23.82 30.71 34.60
15 French Borelli 118.05 21.25 25.89 29.29 35.87 41.14 51.55 16.10 26.93 32.91
Special Closed-Source Track (2026)
Rank Team Name Score D11shot D15shot D110shot D21shot D25shot D210shot D31shot D35shot D310shot
1 FewShotEverything134.31 23.02 29.48 31.09 41.53 46.65 51.89 21.78 34.82 36.32
2 Fusion-Few 108.48 24.48 33.29 33.49 27.94 27.82 27.90 15.94 31.77 34.44
3 nudt0110Dplter 73.71 12.06 17.52 21.07 6.49 14.79 25.45 21.48 29.14 33.10
4 freav 69.82 13.31 17.44 18.76 8.41 20.26 16.55 15.92 28.65 32.54
4. Main Open-Source Track Methods
4.1. FDUROILab Lenovo
4.1.1. Proposed Method
To significantly enhance the model’s adaptability in com-
plex cross-domain scenarios, the team proposes an efficient
fine-tuning strategy tailored for the open-vocabulary detec-
tion model. Their approach leverages diverse data augmen-
tation techniques to expand the limited training set and im-
prove the model’s ability to recognize novel objects in the
target domain using the provided k-shot annotated samples.
Figure 4. Overview of their efficient tuning and inference.
Given a k-shot setting, where k represents the number
of provided object samples, they employ a structured fine-
tuning pipeline, which is shown in Figure 4. (1)Object
Cropping and Augmentation.Using the provided bound-
ing boxes of k-shot examples, they first crop the target ob-
jects from the original images. The cropped objects are then
subjected to various data augmentation techniques, includ-
ing flipping, rotation, grayscale conversion, and other trans-
formations, to introduce diversity and improve generaliza-
tion. (2)Object Rescaling and Random Pasting.They
randomly rescale the augmented objects to different sizes
and paste these transformed objects onto the original images
at different locations. This step simulates new object place-
ments and enhances the model’s robustness to variations in
object appearance and context. (3)Fine-Tuning with Aug-
mented Data.They finetune the open-vocabulary detec-
tion model with the augmented images. This enables the
vision components of the detector to better adapt to objects
in the target domain, even with minimal labeled examples.
Additionally, the augmented data effectively increases the
number of training samples, mitigating the few-shot learn-
ing limitation and improving overall detection performance.
Since their approach utilizes the open-vocabulary detec-
tion model, which fundamentally relies on vision-language
alignment, it requires access to accurate target category la-
bels during inference, as shown in Figure 4. To obtain these
context-rich labels, they utilize Qwen3-VL [4] to generate
descriptive textual representations of the target categories.
The retrieved target labels from Qwen3-VL are then used
as textual input to guide the detection process. Finally, they
adopt the detection model to identify and classify objects in
the test images based on these enhanced text-based prompts.
Although modern vision-language detectors possess
strong generalization capabilities, their performance on the
challenging cross-domain test set remains suboptimal in
certain cases. Upon further analysis, they found that while
the detector can successfully localize most objects, its pri-
mary weakness lies in classification errors rather than detec-
tion failures. This indicates that the detector still struggles
with fine-grained classification when adapting to objects in
a new domain. To address this issue, they introduce Qwen3-
VL as an auxiliary classifier to refine the final predictions,
which is illustrated in Figure 5.
Specifically, for each test image, they construct a multi-
modal prompt comprising the target scene and a set of rep-
resentative example images for all candidate categories. By
leveraging these example images as visual prompts, they
instruct Qwen3-VL to describe the objects present in the
scene and output a refined list of categories that are likely
to appear. After that, they refine the output of the detec-
tion mode
```

## Advances in open vocabulary perception for remote sensing images_NormalPdf.pdf
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
National Natural Science Foundation of China （ 62272375 ） ；  Tianyuan Fund for Mathematics of the National Natural Science Foundation of China
（ 12426105 ）
1
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
fronted with highly complex surface environments in real - world Earth observation scenarios ，  dynamic object morphologies ，
and rare ground objects with long - tail distributions ，  this traditional paradigm not only incurs prohibitive costs for the con ⁃
struction of massive pixel - level annotated datasets but also easily falls into the trap of domain - specific overfitting .  Conse ⁃
quently ，  the generalization and response capabilities of this paradigm are severely challenged by unseen categories or sud ⁃
den events ，  making it inadequate to meet the highly dynamic interpretation demands of the open world .  In recent years ，
the rapid development of vision - language models has catalyzed a paradigm shift in artificial intelligence from task - specific
models to general - purpose perception models .  By mapping visual representations and natural language into a unified fea ⁃
ture space through contrastive learning on massive image - text pairs ，  these models have broken the constraints of discrete
labels .  This enables a direct response to arbitrary natural language prompts ，  a capability known as open vocabulary percep ⁃
tion .  While this technology has demonstrated remarkable zero - shot generalization and cross - modal reasoning capabilities in
the natural image domain ，  the direct application of these general vision - language models to the remote sensing domain
encounters a severe domain gap .  The uniqueness of remote sensing data poses multiple challenges to the adaptability of
existing models .  First ，  the distinct overhead imaging perspective causes drastic variations in object scale and complex
background textures .  Second ，  Earth observation tasks rely on multi - source heterogeneous data from SAR ，  multispectral or
hyperspectral ，  and thermal infrared sensors .  The underlying physical mechanisms of these sensors exceed the inherent
inductive biases of models pre - trained solely on natural RGB images .  Third ，  remote sensing objects often possess strong
geospatial attributes and complex topological associations .  To address these critical challenges ，  this paper provides a com ⁃
prehensive and systematic review of recent advancements in open vocabulary perception for remote sensing images .  We
first delve into the foundational aspect of this field ：  vision - language pre - training for remote sensing .  We extensively review
the evolution of construction strategies for large - scale datasets .  We highlight the transition from limited ，  human - annotated
image - text pairs to massive datasets generated via heuristic rules ，  the integration of geographic metadata ，  and advanced
multi - modal large language models .  This includes innovative approaches that leverage OpenStreetMap ，  geographical coor ⁃
dinates ，  etc . ，  to produce fine - grained ，  physics - aware descriptions across multiple modalities .  Concurrently ，  we systemati ⁃
cally summarize the progression of pre - training methodologies .  While early approaches primarily focused on simple domain
adaptation through continuous pre - training ，  recent state - of - the - art frameworks emphasize physics - aware encoding ，  fine -
grained multi - level consistency learning ，  and geography - enhanced architectures .  These frameworks better capture the intri ⁃
cate spatial relationships and modality diversities inherent in Earth observation data .  Subsequently ，  this review conducts
an in - depth analysis of the adaptation and optimization of open vocabulary perception techniques across a wide spectrum of
crucial downstream tasks .  For zero - shot scene classification and cross - modal retrieval ，  we discuss advanced strategies
designed to mitigate the high intra - class similarity and complex inter - class variances typical in remote sensing .  We empha ⁃
size the shift towards fine - grained local - global alignment ，  hard negative mining ，  dynamic soft - labeling ，  and prompt engi ⁃
neering .  In the realm of open vocabulary image segmentation ，  we categorize the existing literature into training - based meth ⁃
ods and training - free or annotation - free paradigms .  Training - based methods leverage base categories to adapt models while
preventing catastrophic forgetting through pseudo - label distillation and knowledge retention mechanisms .  Training - free
paradigms synergize foundational models ，  such as CLIP and the Segment Anything Model ，  to extract structural masks and
align semantics without the updating of network weights .  For open vocabulary object detection and remote sensing visual
grounding ，  we explore the approaches of researchers to tackle extreme scale variations ，  arbitrary orientations ，  and dense
object distributions .  These approaches include innovative frameworks for pseudo - label generation ，  multi - scale feature
alignment ，  cross - modality context modeling ，  and interactive grounding mechanisms .  Furthermore ，  we examine open
vocabulary change detection ，  where recent studies employ either combinations of pre - trained vision - language models or gen ⁃
erative models to generate large - scale data .  These approaches aim to identify arbitrary ，  text - specified surface transitions
and simulate complex spatiotemporal changes without reliance on massive and costly bi - temporal pixel - level annotations .
We also briefly touch upon emerging open vocabulary applications in three - dimensional urban point clouds and cross -
domain archaeological remote sensing ，  illustrating the expanding horizon of this technology .  Despite remarkable progress ，
the field of open vocabulary perception for remote sensing remains in a crucial developmental stage and faces several criti ⁃
cal bottlenecks .  This paper critically identifies the limitations of current research ，  including the severe scarcity of high -
2
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
李开宇 ， 曹相湧 ， 蒋梓轩 ， 孟德宇
遥感图像开放词汇感知进展
quality and geographically balanced training data .  This scarcity leads to geographic biases and performance degradation in
data - poor regions .  Additionally ，  there is a prominent absence of genuinely fine - grained and long - tailed open vocabulary
evaluation benchmarks that can accurately reflect the performance of a model in extreme or unknown real - world scenarios .
The inadequate physical understanding of heterogeneous modalities and the inherent black - box unreliability of current large
models in high - stakes decision - making scenarios further constrain practical deployments .  To chart the course for future
research ，  we outline several promising and essential trajectories .  First ，  we anticipate a paradigm shift towards generative
perception driven by multi - modal large language models .  This shift unifies various spatial localization tasks into the direct
generation of coordinate sequences or geometric property tokens to fully exploit the logical reasoning capabilities of founda ⁃
tional models .  Second ，  we strongly advocate for the construction of rigorous ，  real - world ，  and fine - grained evaluation sys ⁃
tems that incorporate complex spatiotemporal logic ，  diverse geographic conditions ，  and comprehensive evaluation metrics .
Third ，  the development of omni - modal foundation models that explicitly integrate physical priors and deep learning is
deemed crucial for the achievement of all - weather and all - spectrum Earth observation ，  moving beyond pure data - driven
approaches .  Furthermore ，  we highlight the necessity to extend perception from static spatial analysis to dynamic spatiotem ⁃
poral causal reasoning to decode the evolutionary processes of the Earth .  Finally ，  addressing the severe conflict between
the massive parameter scale of foundation models and the limited computing power of aerospace edge devices requires
focused research into efficient ，  trustworthy ，  and safe edge - cloud collaborative computing architectures .  By systematically
synthesizing these advancements and challenges ，  this comprehensive review aims to serve as a foundational roadmap for
researchers and practitioners .  It accelerates the transition of the intelligent interpretation of remote sensing from isolated ，
closed - set recognition toward artificial general intelligence capable of highly reliable ，  dynamic ，  and open - world perception .
Key words ：  remote sensing images ；  open vocabulary perception ；  vision - language models ；  zero - shot learning ；  intelligent
interpretation
0 　 引  言
遥感技术作为人类观测地球和认知地表环境的
核心手段 ， 在自然灾害监测 、 城市规划 、 资源勘查及
生态保护等国家重大需求领域发挥着不可替代的作
用 （ Yang 等 ， 2013 ； Zhao 等 ， 2019 ； Li 等 ， 2020 ） 。 过去
十余年 ， 得益于深度学习技术的飞速发展 ， 遥感图像
智能解译在场景分类 、 目标检测与图像分割等基础
视觉任务上取得了突破性进展 （ Zhang 等 ， 2023 b ； Li
等 ， 2025 e ） 。 然而 ， 传统深度学习范式本质上建立在
封闭集 （ closed - set ） 假设之上 ， 即模型在推理阶段仅
能识别训练集中预先定义且人工标注过的固定类
别 。 面对真实地球观测场景中高度复杂的地表环
境 、 多变的目标形态以及长尾分布的罕见地物 ， 传统
范式不仅需要耗费巨大成本构建海量像素级标注数
据集 ， 且极易陷入特定领域的过拟合困境 。 一旦面
对未知类别 （ unseen categories ） 或突发事件 （ 如新型
军事设施 、 罕见自然灾害 ） ， 封闭集模型的泛化面临
严峻挑战 ， 难以满足真实开放世界中高度动态的解
译需求 。
近年来 ， 随着视觉—语言模型 （ vision - language
model ） 的快速发展 ， 人工智能领域的范式逐渐从面
向特定任务的模型向通用感知模型转变 （ Radford
等 ， 2021 ； Cherti 等 ， 2023 ） 。 该范式通过在大规模图
像—文本对上进行对比学习训练 ， 将视觉表征与自
然语言映射至统一的特征度量空间 ， 其打破了传统
离散标签的束缚 ， 使模型具备了直接响应任意自然
语言提示的能力 ， 即开放词汇感知 （ open vocabulary
perception ） 。 目前 ， 基于视觉语言模型的开放词汇
感知已在自然图像领域的图像分类 、 目标检测 （ Li
等 ， 2022 ； Liu 等 ， 2024 c ； Cheng 等 ， 2024 ） ， 以及图像分
割 （ Zhou 等 ， 2022 ； Cho 等 ， 2024 ； Kombol 等 ， 2025 ） 等
任 务 中 展 现 出 强 大 的 零 样 本 泛 化 与 跨 模 态 推 理
能力 。
然而 ， 将通用自然图像领域的视觉语言模型直
接应用于遥感领域 ， 仍面临着严峻的领域鸿沟 。 遥
感数据的独特性对现有 VLM 的适应性构成了多重
挑战 ： 首先 ， 遥感影像独特的俯视成像视角导致了剧
烈的目标尺度变化与复杂的背景纹理 ， 这与自然图
像以物为中心 （ object - centric ） 的表征分布存在显著
差异 。 其次 ， 真实的地球观测任务不仅依赖光学
RGB 图像 ， 更深度耦合合成孔径雷达 （ synthetic aper ⁃
ture radar ， SAR ） 、 多光谱 / 高光谱以及热红外等全天
3
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
候 、 全谱段的多源异构数据 ， 其内在的物理机理超出
了以自然图像预训练的视觉—语言模型的固有归纳
偏置 （ Zhu 等 ， 2017 ） 。 此外 ， 遥感目标往往具有强烈
的地理空间属性与复杂的拓扑关联 ， 对细粒度属性
的辨识要求高于常规自然图像 。 因此 ， 如何克服上
述挑战 ， 构建契合遥感数据特性与物理机理的开放
词汇感知框架 ， 已成为当前地球视觉感知领域的重
要命题 。
鉴于该领域正处在快速发展的关键阶段 ， 系统
性地梳理其研究脉络与技术演进 ， 对推动该领域的
理 论 创 新 与 应 用 落 地 具 有 重 要 的 学 术 与 实 践 价
值 。  为此 ， 本文全面回顾并总结了近年来遥感图像
开放词汇感知领域的最新研究进展 。 本文将首先阐
述遥感视觉—语言预训练的数据集构建与核心方
法 ； 其次 ， 系统梳理该技术在分类 、 检测 、 分割 、 变化
检测等关键下游任务中的应用范式 ； 最后 ， 总结当前
研究面临的核心挑战 ， 并对未来发展方向进行展望 。
1 　 遥感视觉—语言预训练
遥感视觉—语言预训练通过在大规模图文对数
据上进行对比学习或生成式训练 ， 将视觉表征与自
然语言映射至统一的特征空间 ， 从而赋予模型在无
监督或零样本条件下处理开放世界概念的能力 。
（ Zhi 等 ， 2025 ） 这一范式突破了传统遥感智能解译受
限于封闭集预定义类别的瓶颈 ， 已成为实现遥感开
放词汇感知的基础 。 当前 ， 遥感视觉—语言预训练
研究正经历从通用模型适配向领域专用基础模型构
建的转变 。 其发展逻辑在于化解两大根本矛盾 ： 一
是遥感领域高质量图像与文本配对数据的稀缺与基
础模型对海量训练数据需求之间的矛盾 ； 二是遥感
多模态数据 （ 如 SAR 、 多光谱等 ） 物理属性的复杂性
与现有模型架构多局限于 RGB 模态之间的矛盾 。
针对上述问题 ， 本章围绕预训练数据集的构建与预
训练方法两个维度 ， 阐述该领域的研究进展及面临
的挑战 。
1 . 1 　 遥感预训练数据集
数据规模 、 语义多样性与文本质量是决定视觉
—语言预训练模型性能上限的核心要素 。 有别于自
然图像领域动辄十亿级别的图文对数据 ， 遥感图像
受限于成像视角与专家知识壁垒 ， 面临高质量配对
数据匮乏的困境 。 如表 1 所示 ， 早期遥感图文数据
集主要依赖人工标注 ， 规模普遍较小 ， 代表性数据集
如 UCM - Captions 、 Sydney - Captions （ Qu 等 ， 2016 ） 与
RSICD （ Lu 等 ， 2017 ） 等 ， 仅包含数千至数万张图像 。
这类数据不仅规模受限 ， 且描述多侧重于简单的场
景分类或单一目标 ， 缺乏对复杂空间关系和上下文
的刻画 。 为打破数据量级的限制 ， 研究者开
始利用互联网公开数据与启发式规则构建数据
集 。 例如 ， RS 5 M （ Zhang 等 ， 2024 b ） 通过关键词过滤
通用数据集并结合 BLIP - 2 （ Li 等 ， 2023 a ） 伪标签生
成 ， 构建了五百万量级的图文对 。 但由于数据源于
网页和基础模型 ， 文本存在明显的噪声与语义贫乏
问题 。 随后 ， SkyScript （ Wang 等 ， 2024 c ） 利用地理坐
标将谷歌地球引擎影像与 OpenStreetMap （ OSM ） 的
语义标签强关联 ， 构建了二百六十万规模的数据集 ，
虽在一定程度上丰富了物体属性信息 ， 但基于模板
规则拼接的文本仍缺乏自然语言的流畅性与内在
逻辑 。
随着大语言模型 （ large language model ， LLM ） 与
多 模 态 大 语 言 模 型 （ multi - modal large language
model ， MLLM ） 的快速演进 ， 利用先进大模型重写或
直接生成文本已成为构建高质量遥感数据集的主流
范式 ， 此类策略可显著提升文本的细粒度 、 词汇丰富
度及物理真实性 。 在基于地理元数据的生成方面 ，
RSTeller （ Ge 等 ， 2025 ） 提取了 OSM 中的精细矢量属
性 ， 并利用 Mixtral 模型生成和润色出高度复杂的场
景描述 ； 为满足多分辨率生成任务的需求 ， Git - 10 M
（ Liu 等 ， 2025 a ） 利用 GPT - 4 o 结合 OSM 数据 ， 显式地
将空间分辨率与地理信息融入千万级文本描述中 ；
RS - Landmarks （ Barzilai 等 ， 2025 ） 则将谷歌地图的地
标信息与影像对齐 ， 利用 Gemini 生成了包含一千八
百万个带有明确地标指向的高质量图文对 。 在基于
现有视觉标签的语义转化方面 ， 为充分利用现有的
检测与分割数据集 ， RSM - ITD （ He 等 ， 2024 ） 设计了
标注到描述与标注到指令算法 ， 引导 Kosmos - 2（ Peng
等 ， 2023 ） 将边界框或掩码转化为自然语言 ； HQRS -
IT - 210 K （ He 等 ， 2025 b ） 提出多视角生成与融合的两
阶段流水线 ， 首阶段利用 Kosmos - 2 与 LLaVA - 1 . 6 生
成多视角初始描述 ， 次阶段通过 LLaMA - 3 进行融合
与消除幻觉 ， 大幅提升了信息密度 ； DGTRSD （ Chen
等 ， 2025 a ） 则利用 Qwen 2 . 5 - VL 基于现有的短文本生
成详细的长文本 ， 构建了双粒度数据集 ， 以解决长尾
分布与注意力分配不均的问题 。 为解决通用大模型
4
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
李开宇 ， 曹相湧 ， 蒋梓轩 ， 孟德宇
遥感图像开放词汇感知进展
缺乏遥感物理先验的问题 ， GAIA （ Zavras 等 ， 2025 b ）
结合专家知识 ， 从权威遥感科学网站抓取带文本的
图像 ， 并利用 GPT - 4 o 生成严谨的合成描述 ， 保障了
地球观测任务所需的科学准确性 。
除光学 RGB 图像外 ， 遥感全天候 、 全谱段的特
性催生了对 SAR 及多光谱数据的多模态对齐需求 。
然而 ， SAR 图像的相干斑噪声与非直观性使得文本
标注极度困难 。 针对 SAR 模态 ， 研究者探索了不同
的转化策略 。 MMSAR （ Wang 等 ， 2025 d ） 提出检测到
描述算法 ， 将异构的 SAR 目标检测框直接转化为多
类别文本描述 ； SARVLM - 1 M （ Ma 等 ， 2025 ） 基于领域
知识和空间模板综合生成了一百七十万对 SAR 图
文数据 。 更进一步 ， SAR - TEXT （ He 等 ， 2025 a ） 利用
配对的光学与 SAR 图像作为中介 ， 其首先由 MLLM
生成光学图像的高质量描述 ， 随后通过精心设计的
提示词与上下文学习机制 ， 引导 DeepSeek - V 3 模型
将光学描述改写为符合 SAR 散射特征的文本 ， 从而
实现了零标注成本下的跨模态知识迁移 。 在多光谱
与高维数据方面 ， Llama 3 - SSL 4 EO - S 12 （ Marimo 等 ，
2025 ） 结合 Overture Maps 标签与 Llama 3 - LLaVA - Next
```

## CV.pdf
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
Speech Interaction and Speech Multimodality Shanghai Jiao Tong University
Cross-media Language Intelligence Laboratory (X-LANCE) Advisor: Prof. Xie Chen
• Interactive ASR: Towards Human-Like Interaction and Semantic Coherence Evaluation for
Agentic Speech Recognition In submission
Peng Wang*, Yanqiao Zhu*, Zixuan Jiang* , Qinyuan Chen, Xingjian Zhao, Xipeng Qiu, Wupeng Wang,
Zhifu Gao, Xiangang Li, Kai Yu, Xie Chen†
• Proposed the Interactive ASR task, extending conventional one-pass ASR into an interactive system that
supports user feedback and semantic correction.
• Proposed the semantic coherence evaluation metric S2ER and an automatic simulation framework for eval-
uating interactive ASR systems.
Project Experience
MotionPilotX: A Gesture-Based Intelligent UA V Control System Team Leader
Undergraduate Innovation and Entrepreneurship Project Advisor: Prof. Longjun Liu
Keywords: Object Detection, Gesture Regression, UA V Control, Hardware-Software Co-design
• Designed a real-time object detection and gesture regression model based on YOLOv11, and deployed it on the
Orange Pi RK3588 embedded platform for on-device UA V perception and control.
• Achievement: Awarded the Bronze Medal in the Entrepreneurship Track of the “Tengfei Cup” Innovation
and Entrepreneurship Competition at Xi’an Jiaotong University.
Leadership & Service
• Head of the Scientist Spirit Drama Club, Student Union of Qian Xuesen Honors College, Xi’an Jiaotong
University 2025
• Member of the AI Study Group, Qian Xuesen Honors College; shared and discussed large language model
technologies at the “Starting a New Journey with Intelligence, Embracing the Future with AI” DeepSeek Youth
Exchange Seminar .
ᢍ࿄
(+86) 13913550425 · andrewjiang@stu.xjtu.edu.cn · anxmuy.github.io
ඍ
Ⴊྮ ,Ӧ໗ ,ᄳ ,പ ,ྛ॓࿹ฐ෬b
ଆ෿࿐
৯đླ౰ა็ᅞb
ࣟ
๙ն࿐, ഒ୍ϫ, ఫ࿐೦඀ჽ 2021.9 - 2023.6
ஆ଀ 17/234(భ 8%),ࣁ
๙ն࿐,൫ဒϫ (AIH), ఫ࿐೦඀ჽ 2023.9 - 2027.6
GPA: 92.48/100đஆ଀: 5/65čభ 10%ࣁ, ࣁ4 ದ), Ⴊྮ࿐ള (2
Ց),ࢂ,඀ჽ࿐ඌ॓࿹/ࢂ
ᇶေज़ӱ:ԩ৘ (99),ં (99),NLP(96),AI-System(96),CV(95) | ႇე: CET-6(575)
ࢂࠆ
•೗ğMeritorious Winnerč2024Ď đHonorable Mentionč2023Ď
•೗ğࢂ֩č2023a2024a2025Ď
• ICPC೗೻༆സ೗ğࢂč2025č2024Ď
•༅ն೗ğࢂ֩ؽč2025Ď
•ջ AI+߃࠹AI໸č2024Ď
॓࿹/৥
๙ն࿐ |൱ज़ีቆ,ၲ Mentor: ңཌྷ㦶
• DescribeEarth: Describe Anything for Remote Sensing Images , Kaiyu Li*, Zixuan Jiang*, Xiangyong Cao†,
Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang (In submission) (၂ቔᆀ)
–໙ีđ໡ૌิԛਔ Geo-DLC໾
ࠢDE-Datasetሙ DE-Benchb
– ໡ૌิԛਔ DescribeEarthଆ෿նଆ྘,ݖscale-adaptive focal strategyބdomain guided
fusion module,ၲđѩᄝ DE-Benchਔ SOTA, ཁᇷิശਔ
ି৯b
• Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images , Kaiyu Li, Xiangyong Cao†,
Ruixun Liu, Shihong Wang, Zixuan Jiang, Zhi Wang, Deyu Meng (In submission)
•ᅚ, Kaiyu Li, Xiangyong Cao†, Zixuan Jiang, Deyu Meng, Journal of Image and
Graphics 2026
๙ն࿐ | ॴૂุე࿽ᇆିൌဒ൩ (X-LANCE),ଆ෿ Mentor: ӧཾ
• Interactive ASR: Towards Human-Like Interaction and Semantic Coherence Evaluation for Agentic Speech
Recognition, Peng Wang*, Y anqiao Zhu*, Zixuan Jiang*, Qinyuan Chen, Xingjian Zhao, Xipeng Qiu, Wu-
peng Wang, Zhifu Gao, Xiangang Li, Kai Yu, Xie Chen￿ (In submission)
–ൔ ASRԮ๤၂Ցྟ ASRൔ༢๤b
–ᆷѓ S2ERൔ ASR ಩ༀb
৥
• MotionPilotX -༢๤ | ն࿐ളԷྍԷြཛଢ Mentor: ਾ੃फ
ٺ:ᄳದ |Ս:݂߭,॥ᇅ,ླྀ๝
–Ⴟ YOLOv11ଆ྘đѩ҆ඇᇀཐӭஊ RK3588 ళೆൔ௜෻đൌགྷ
ᆩა॥ᇅb
– ಴უ:ࠆ֡ࢂ
࡬| ಩ᆯაః෰
•ख๶๶Ӊ (2025)
•๙ն࿐ఫ࿐೦඀ჽ AI ࿐ቆӮჴđ ᄻᄝoᇆఓྍӱđ ି႒ໃটpDeepSeek߶ཚa
ඌb
```
