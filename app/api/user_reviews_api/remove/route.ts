import { and, eq } from "drizzle-orm";
import { user_reviews } from "@/app/db/schema/user_reviews";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/db/db";

export async function POST(req: NextRequest) {
    try {
        const { user_email_id, area_name } = await req.json();
        const result = await db.update(user_reviews).set({ liked: 0 }).where(and(eq(user_reviews.user_email_id, user_email_id), eq(user_reviews.area_name, area_name)));
        return NextResponse.json({} , {status:200});
    }
    catch (e) {
        return NextResponse.json({}  , {status:500}); 
    }
}

