export type EventItem = {
  image: string
  title: string
  slug: string
  location: string
  date: string
  time: string
}

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US",
    slug: "react-summit-us",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM"
  },
  {
    image: "/images/event2.png",
    title: "KubeCon + CloudNativeCon",
    slug: "kubecon-cloudnativecon-europe",
    location: "Vienna, Austria",
    date: "2026-03-18",
    time: "10:00 AM"
  },
  {
    image: "/images/event3.png",
    title: "AWS re:Invent",
    slug: "aws-re-invent",
    location: "Las Vegas, NV, USA",
    date: "2025-12-01",
    time: "08:30 AM"
  },
  {
    image: "/images/event4.png",
    title: "Next.js Conf",
    slug: "next-js-conf",
    location: "Los Angeles, CA, USA (Hybrid)",
    date: "2025-11-07",
    time: "09:00 AM"
  },
  {
    image: "/images/event5.png",
    title: "Google Cloud Next",
    slug: "google-cloud-next",
    location: "San Jose, CA, USA",
    date: "2026-04-07",
    time: "09:00 AM"
  },
  {
    image: "/images/event6.png",
    title: "ETHGlobal Hackathon",
    slug: "ethglobal-hackathon",
    location: "Paris, France",
    date: "2026-07-10",
    time: "10:00 AM"
  },
  {
    image: "/images/event-full.png",
    title: "Open Source Summit",
    slug: "oss",
    location: "Vancouver, Canada",
    date: "2026-06-22",
    time: "10:00 AM"
  }
]
