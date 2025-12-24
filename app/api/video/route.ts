import { NextRequest,NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    try {
        const prisma = getPrisma();
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" },
        });
        
        // Map database fields to frontend expected format
        const mappedVideos = videos.map((video) => ({
            id: video.id,
            title: video.title,
            description: video.description,
            publicId: video.publicId,
            originalSize: video.OrignalSize,
            compressedSize: video.CompressedSize,
            duration: video.duration,
            createdAt: video.createdAt,
            updatedAt: video.updatedAt,
        }));
        
        return NextResponse.json(mappedVideos);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: "Failed to fetch videos", details: message }, { status: 500 });
    }
}
