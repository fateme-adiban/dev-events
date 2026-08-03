"use server"

import Event from "@/database/event.model"
import connectDB from "@/lib/mongodb"

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB()

    const event = await Event.findOne({ slug })

    if (!event) {
      return []
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags }
    }).lean()

    console.log(similarEvents)
    console.log("slug:", slug)
    console.log("event:", event)
    console.log("tags:", event?.tags)

    return JSON.parse(JSON.stringify(similarEvents))
  } catch (error) {
    console.log(error)
    return []
  }
}
