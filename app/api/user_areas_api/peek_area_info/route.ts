import { db } from "@/app/db/db";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { user_areas } from "@/app/db/schema/user_areas";

export async function POST(req: NextRequest) {
    try {
        const { site_name } = await req.json();
        const result = await db.select().from(user_areas).where(eq(user_areas.site_name, site_name));
        if (result.length > 0) {
            return NextResponse.json({result} , {status:201}); 
        }
        else throw result; 
    }
    catch (e) {
        return NextResponse.json({} , {status:500}); 
    }
}