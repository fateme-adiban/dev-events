import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Event from "@/database/event.model"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const formData = await req.formData()

    const event = Object.fromEntries(formData.entries())

    const image = formData.get("image")

    if (!image || typeof image !== "string") {
      return NextResponse.json({ message: "Image URL is required" }, { status: 400 })
    }

    event.image = image

    let tags = JSON.parse(formData.get("tags") as string)
    let agenda = JSON.parse(formData.get("agenda") as string)

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda
    })

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent
      },
      { status: 201 }
    )
  } catch (e) {
    console.error("POST ERROR:", e)

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : String(e)
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const events = await Event.find().sort({ createdAt: -1 })

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events
      },
      { status: 200 }
    )
  } catch (e) {
    console.error("GET ERROR:", e)

    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e instanceof Error ? e.message : String(e)
      },
      { status: 500 }
    )
  }
}
