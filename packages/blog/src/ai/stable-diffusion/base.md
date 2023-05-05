---
title: 基础
icon: pic
category: ai
tag:
  - stable diffusion
---

## 资料

https://space.bilibili.com/1640056/video

https://space.bilibili.com/250989068/video

https://space.bilibili.com/435304165/video

## 后缀

1. ckpt
2. pt
3. pth
4. safetensors
5. webui 特殊模型保存方法：PNG、WEBP 图片格式

### 大模型

常见格式为 **ckpt**，一个字，大。

大小在 GB 级别，常见有 2G、4G、7G 模型。

在 models/stable-diffsuion/

### 小模型

#### embedding 模型

常见格式为 **pt**、png 图片、webp 图片。大小一般在 KB 级别。

在 embeddings/

可训练：画风 √ 人物 √ | 推荐训练：**人物**

配置要求：显存 6GB 以上。

训练速度：中等 | 训练难度：中等

综合评价：☆☆☆

评价：比较基础的一种，局限性较大，但是可以用

#### hypernetwork

常见格式为 **pt**。大小一般在几十兆到几百兆不等。由于这种模型可以自定义的参数非常之多，一些离谱的 Hypernetwork 模型可以达到 GB 级别。

在 hypernetworks/

可训练：画风 √ 人物 √ | 推荐训练：**画风**

配置要求：显存 6GB 以上。

训练速度：中等 | 训练难度：难

综合评价：☆☆

评价：非常强大的一种模型，但是想训练好很难，不推荐训练。

#### LoRA

常见格式为 **pt**、**ckpt**。大小一般在 8mb~144mb 不等。

在 models/lora/

可训练：画风? 人物 √ 概念 √ | 推荐训练：**人物**

配置要求：显存 8GB 以上。

训练速度：快 | 训练难度：简单

综合评价：☆☆☆☆

评价：非常好训练 好出效果的人物训练，配置要求低，图要求少。

备注：LoRA 本身也应该归类到 Dreambooth，但是这里还是分开讲。

#### VAE 模型

常见格式为 **pt**

在 models/VAE/

#### Dreambooth / Native Train

可训练：画风 √ 人物 √ 概念 √ | 推荐训练：Dreambooth 推荐人物，Native Train 推荐画风

配置要求：显存 12GB 以上。

训练速度：慢 | 训练难度：可以简单可以很难

综合评价：☆☆☆☆☆

评价：微调大模型，非常强大的训练方式，但是使用上会不那么灵活，推荐训练画风用，人物使用 LoRA 训练。
