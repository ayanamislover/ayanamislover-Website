const archiveBase = `${import.meta.env.BASE_URL}assets/archive`;

const archiveImage = (filename, width) => {
  const widths = [...new Set([
    Math.min(480, width),
    Math.min(720, width),
    Math.min(960, width),
  ])];
  const srcSet = (format) => widths
    .map((candidate) => `${archiveBase}/${filename}-${candidate}.${format} ${candidate}w`)
    .join(", ");

  return {
    src: `${archiveBase}/${filename}.webp`,
    sourceSet: [
      { type: "image/avif", srcSet: srcSet("avif") },
      { type: "image/webp", srcSet: srcSet("webp") },
    ],
  };
};

export const galleryItems = [
  {
    id: "water-light",
    ...archiveImage("ayanami0", 374),
    width: 374,
    height: 362,
    title: "水色的绫波",
    alt: "水珠环绕下穿白蓝制服的绫波",
    tone: "square",
  },
  {
    id: "quiet-night",
    ...archiveImage("ayanami1", 877),
    width: 877,
    height: 620,
    title: "夜色里的绫波",
    alt: "夜晚靠在窗边捧着杯子的绫波",
    tone: "landscape",
  },
  {
    id: "flower-season",
    ...archiveImage("ayanami2", 1000),
    width: 1000,
    height: 625,
    title: "花见",
    alt: "花瓣之间身穿白红服饰的绫波",
    tone: "landscape",
  },
  {
    id: "summer-festival",
    ...archiveImage("ayanami3", 627),
    width: 627,
    height: 887,
    title: "夏日祭",
    alt: "夕阳下身穿蓝色浴衣的绫波",
    tone: "portrait",
  },
  {
    id: "soft-embrace",
    ...archiveImage("ayanami4", 1000),
    width: 1000,
    height: 1244,
    title: "柔软时刻",
    alt: "抱着黄色玩偶露出温柔神情的绫波",
    tone: "portrait",
  },
  {
    id: "afternoon",
    ...archiveImage("ayanami5", 1000),
    width: 1000,
    height: 750,
    title: "港区的午后",
    alt: "明亮房间里和伙伴们相聚的绫波",
    tone: "landscape",
  },
  {
    id: "fireworks",
    ...archiveImage("ayanami6", 590),
    width: 590,
    height: 1075,
    title: "烟火之夜",
    alt: "烟火下与伙伴合影的绫波",
    tone: "portrait",
  },
  {
    id: "everyday-harbor",
    ...archiveImage("ayanami7", 1152),
    width: 1152,
    height: 648,
    title: "港区的一天",
    alt: "热闹港区中与伙伴们坐在一起的绫波",
    tone: "panorama",
  },
];

export const artists = [
  { name: "sironora", href: "https://www.pixiv.net/artworks/89333813" },
  { name: "太もも", href: "https://www.pixiv.net/artworks/67232472" },
  { name: "ここね", href: "https://www.pixiv.net/artworks/69443824" },
  { name: "ネコティー", href: "https://www.pixiv.net/artworks/71174547" },
  { name: "豊咲", href: "https://www.pixiv.net/artworks/70875410" },
  { name: "ひみつ", href: "https://www.pixiv.net/artworks/82036448" },
];
