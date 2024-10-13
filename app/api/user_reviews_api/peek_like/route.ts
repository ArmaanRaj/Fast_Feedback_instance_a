import { and, eq } from "drizzle-orm";
import { db } from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";
import { user_reviews } from "@/app/db/schema/user_reviews";

export async function POST(req: NextRequest) {
    try {
        const { area_name } = await req.json();
        const b = 1;;
        const result = await db.select().from(user_reviews).where(and(eq(user_reviews.area_name, area_name) , eq(user_reviews.liked, b)));
        return NextResponse.json({ result }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({}, { status: 500 });
    }
}