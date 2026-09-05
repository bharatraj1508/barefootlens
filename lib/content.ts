export const site = {
  name: "Barefoot Lens",
  tagline: "Stories without borders.",
  email: "Barefootlens@pm.me",
  location: "Arizona, U.S.",
  logo: "/logo/barefoot-logo.png",
  intro:
    "Barefoot Lens is an independent film production company based in Arizona, USA, bringing together filmmakers and creative practitioners across India and the United States.",
};

export const about = {
  heading: "About",
  lead: site.intro,
  paragraphs: [
    "We are passionate about stories rooted in culture, human experience and the complexities of everyday life. Our work draws from filmmaking, theatre, writing and visual storytelling to create films that are emotionally honest, visually distinctive and connected to contemporary audiences.",
    "At Barefoot Lens, we believe that powerful stories can emerge from any place and connect with people everywhere. We focus on authentic characters, meaningful narratives and a strong visual language, bringing together diverse creative voices through a collaborative filmmaking process.",
  ],
  pillars: [
    {
      title: "Culture-rooted",
      body: "Stories drawn from culture, human experience and the complexities of everyday life.",
    },
    {
      title: "Emotionally honest",
      body: "Authentic characters and meaningful narratives built on a strong visual language.",
    },
    {
      title: "Collaborative",
      body: "Diverse creative voices across India and the United States, working as one crew.",
    },
  ],
};

export type Credit = { role: string; name: string };

export type Project = {
  slug: string;
  title: string;
  translatedTitle?: string;
  status: "Released" | "In Development";
  year?: string;
  language?: string;
  runtime?: string;
  logline: string;
  poster: string;
  cover: string;
  tagline?: string;
  synopsis: string[];
  credits: Credit[];
  gallery?: string[];
  trailer?: string;
  distribution?: string;
};

export const projects: Project[] = [
  {
    slug: "antraal",
    title: "Antraal",
    status: "Released",
    logline: "Human. Demon. God. Who draws the line?",
    poster: "/projects/antraal/poster.jpg",
    cover: "/projects/antraal/gallery/still-4.png",
    tagline: "“Human. Demon. God. Who draws the line?”",
    synopsis: [
      "Antraal is a feature film exploring the fragile boundaries between the human, the monstrous and the divine — and who gets to decide where one ends and the next begins.",
      "Distribution rights reserved by Barefoot Lens.",
    ],
    credits: [
      { role: "A Film By", name: "Rahul Shukla" },
      { role: "Written By", name: "Pankaj Nautiyal" },
      { role: "Cast", name: "Subal Sharma, Apurva Thakur, Deepak Jhaa" },
      { role: "Director of Photography", name: "Nannii Gill" },
      { role: "Art Direction", name: "Harry Maahi" },
      { role: "Editor", name: "R.S. Mehra" },
      { role: "Music", name: "Hardaat Singh" },
      { role: "Line Producer", name: "Karamjit Singh" },
      { role: "Produced By", name: "Saurabh Mehra, Nirmal Jeena & Pankaj Kharkwal" },
    ],
    gallery: [
      "/projects/antraal/gallery/still-1.png",
      "/projects/antraal/gallery/still-2.png",
      "/projects/antraal/gallery/still-3.png",
      "/projects/antraal/gallery/still-4.png",
      "/projects/antraal/gallery/still-5.png",
      "/projects/antraal/gallery/still-6.png",
      "/projects/antraal/gallery/still-7.png",
      "/projects/antraal/gallery/still-8.png",
    ],
    trailer: "/projects/antraal/video/antraal-trailer.mp4",
    distribution: "Distribution rights reserved by Barefoot Lens.",
  },
  {
    slug: "main-v-kise-di-dhee-aa",
    title: "Main V Kise Di Dhee Aa",
    translatedTitle: "I Am Also Someone's Daughter",
    status: "In Development",
    language: "Punjabi",
    runtime: "1h 45m",
    logline:
      "A woman stands up for her dignity, love and identity — and for a family that must learn respect is built by humanity, not by blood, wealth or status.",
    poster: "/projects/antraal/gallery/still-1.png",
    cover: "/projects/antraal/gallery/still-1.png",
    synopsis: [
      "Rajjo, a simple and barely literate girl, comes from a family where life is more about struggle than comfort. Her simplicity, appearance, family background and social standing always make her seem lesser in the eyes of those who measure a person’s worth by their face, wealth and status.",
      "Manjeet, an educated young man connected to the arts, holds a way of thinking different from that of his family. Through circumstances and an unusual turn of marriage, Rajjo becomes a part of his life. But as soon as she steps into her new home, she realizes that this household does not see her as a daughter-in-law, but rather as a stranger.",
      "Her relationship with Manjeet gradually transforms into love, and Rajjo begins to carve a place in the hearts of the family through her simplicity, understanding and warmth. However, her lack of formal education and unfamiliarity with the rapidly changing digital world often become sources of embarrassment and difficulty for her.",
      "One day, a small misunderstanding puts her honor into question in front of everyone. Rajjo comes to realize that if she is to take charge of her own life decisions and protect her dignity, she must make herself stronger.",
      "She begins to learn, understand and keep pace with the new times. But this very effort later becomes the tool of a conspiracy against her. By twisting a relationship out of context, questions are raised about her intentions and character, and the very home she had begun to call her own casts her out.",
      "Now the question is not just whether Rajjo will be reunited with her home. The question is whether a woman’s worth will always be determined by her looks, caste, family, education and status — or by her being a human being.",
    ],
    credits: [
      { role: "Directed By", name: "Aljinder Mangat" },
      { role: "Written By", name: "Rahul Shukla" },
      { role: "Music By", name: "Vaneet Raj" },
      { role: "Language", name: "Punjabi" },
      { role: "Runtime", name: "1h 45m" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export type Member = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  email?: string;
  instagram?: string;
};

export const team: Member[] = [
  {
    name: "Aljinder Mangat",
    role: "Founder · Filmmaker",
    bio: "Aljinder Mangat is a filmmaker and director with formal training from the Tisch School of the Arts. His work is rooted in visual storytelling, character-driven narratives and an interest in bringing culturally relevant stories to the screen. As the director at Barefoot Lens, he leads the creative vision of the company’s film projects, including the upcoming Punjabi feature Main V Kise Di Dhee Aa.",
    photo: "/team/aljinder-mangat.jpg",
  },
  {
    name: "Rahul Shukla",
    role: "Writer · Creative Development",
    bio: "Rahul Shukla is a theatre practitioner and filmmaker who has been actively involved in theatre since 2015. His creative practice spans writing, filmmaking, adaptation, performance and story development. At Barefoot Lens, he works across screenwriting, creative development, pre-production and casting, with a focus on developing emotionally grounded and socially relevant stories. He is currently the writer of Main V Kise Di Dhee Aa.",
    photo: "/team/rahul-shukla.jpg",
    email: "Rahulshuklachemistry@gmail.com",
    instagram: "raahulgraphite",
  },
  {
    name: "Vaneet",
    role: "Visual Graphics · Music Director · Lyricist",
    bio: "Vaneet is a visual creative with a background in Film Graphics, having completed his graduation in Mumbai. His work brings together visual design and filmmaking, with an emphasis on creating strong visual identities for screen projects. At Barefoot Lens, he contributes to visual graphics, handles social media and initial location scouting for Main V Kise Di Dhee Aa.",
    photo: "/team/vaneet.jpg",
    email: "vaneet.raj10@gmail.com",
    instagram: "vaneet.raj",
  },
  {
    name: "Bikramjeet Singh",
    role: "Production · Finance Manager",
    bio: "Bikram is part of the production and business team at Barefoot Lens, contributing to the practical and organizational side of the company’s projects. His role focuses on supporting production planning, coordination and the business aspects involved in bringing independent film projects from development toward production.",
    email: "vickymangat608@gmail.com",
    instagram: "imbikramjeet",
  },
];
