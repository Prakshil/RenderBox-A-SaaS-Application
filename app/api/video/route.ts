import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest) {
    try {
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
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
