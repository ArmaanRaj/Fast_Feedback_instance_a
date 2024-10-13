import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { user_areas } from "@/app/db/schema/user_areas";
import { db } from "@/app/db/db";

export async function POST(req: NextRequest) {
    try {
        const { user_id } = await req.json();
        const response = await db.select().from(user_areas).where(eq(user_areas.user_id, user_id));
        return NextResponse.json({response} , {status:201}); 
    }
    catch (e) {
        return NextResponse.json({} , {status:500});
    }
}