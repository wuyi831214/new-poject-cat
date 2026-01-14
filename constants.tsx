
import { Pet } from './types';

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    breed: '英国短毛猫',
    age: '2 岁',
    gender: '母',
    weight: '4.2 公斤',
    distance: '2.4 英里',
    location: '幸福市, 庇护所路 123 号',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQElfZ163cNv5M4ASt3Ag1vNqjVITvBIc4pxh8FQAQPQReBcbgImBSTS1IBoDu3hlQQ3N6z-JG1qCN-KXaaczhyhJwJ4q74xjSA7k-HLKdxjCsDaYqRsOwLlCQqe-urGqHIwrgouWPPnc7A6TYwnuU-GnxuFvmBBafh3yjdD2DBqRB8YSnk4zzHQYcjLQ6cnpeUMw75C6o8IHNKBh97qSQkLkRSNfPKD8xB-mmxXhTF4RLclhcXzYi0ykfxI5JfK8O8BCmTEznQc',
    tags: ['已接种疫苗', '已绝育', '习惯良好'],
    description: 'Luna 性格温顺，喜欢阳光充足的地方和安静的午后。刚开始她可能会有点害羞，但一旦熟悉起来，她会是你最忠诚的伙伴。她特别喜欢羽毛玩具和零食！',
    status: '待领养',
    price: 75
  },
  {
    id: '2',
    name: 'Max',
    breed: '金毛寻回犬',
    age: '2 岁',
    gender: '公',
    weight: '25 公斤',
    distance: '2.5 公里',
    location: '快乐社区 8 号',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9PvlVJ6g6egE-jXQBZ9XZQbyjvlac8pHr-X7MuFmI9b51cJo7zRDCOPX1VDoeyTf3-8ynSs9dL6RLNosZGIjztXZQw9h2JhP0ctMwlvsAsXbEZs4g89iWrDyt0CtXFDtl8oXg-f6ZFDkL66M8_3GnZyKhZ_2p-vRyzNmWKy-3GBRmahBCu95-pENot31AUZ-lbwxPFl1NswDEw4DVm8YeHjwk3PtcxILbLQoVV_C41dNmm_b7L6CcQg_attqPAV8CJ0koRl_h5DY',
    tags: ['活泼', '友善', '已培训'],
    description: 'Max 是一个精力充沛的男孩，他喜欢在草地上奔跑，对每一个人都很友好。',
    status: '待领养',
    price: 120
  },
  {
    id: '3',
    name: 'Charlie',
    breed: '串串',
    age: '4 个月',
    gender: '公',
    weight: '3 公斤',
    distance: '1.2 公里',
    location: '路边救助站',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6zUYYDB2OQ7mtOjhoz9YN2NHRb2kDJtwntQPvTCjt-aOv8F7jwlEx-s0-hUrsAvNmh_YM5pKfXk9GnfI7uVLGqeFBOnbWGUs5eCUhCmlCyO7yhD0BeSSrbIi9UlE_P3igqJlresA4jTHy6aQL6xufkZhGGoJHSwdgRieZCrhMYclbjtao1k0w9TMQTwokdwAR7QC7ilW8bnnUFYWP5rGSR1i1mJY6ukXGiOYkPUfuTgtbJbMg6mqQGfOyuLcq_nidu22Rn6M7-s',
    tags: ['幼犬', '乖巧'],
    description: 'Charlie 是个害羞但非常温柔的小家伙，正在寻找一个永远的家。',
    status: '待领养',
    price: 50
  }
];
