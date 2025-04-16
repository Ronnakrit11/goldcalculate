import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("http://www.thaigold.info/RealTimeDataV2/gtdata_.txt");
        const text = await response.text();
        
        // Parse the JSON data
        const goldDataArray = JSON.parse(text);
        
        // Find the gold price data
        const gold9999 = goldDataArray.find((item: any) => item.name === "99.99%");
        const gold965 = goldDataArray.find((item: any) => item.name === "สมาคมฯ"); // Updated to match the correct name

        if (!gold9999 && !gold965) {
            return NextResponse.json(
                { error: "Gold price data not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            gold9999: {
                bid: gold9999?.bid ? parseInt(gold9999.bid) : null,
                ask: gold9999?.ask ? parseInt(gold9999.ask) : null,
                diff: gold9999?.diff || null
            },
            gold965: {
                bid: gold965?.bid ? parseInt(gold965.bid) : null,
                ask: gold965?.ask ? parseInt(gold965.ask) : null,
                diff: gold965?.diff || null
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error("Error fetching gold price:", error);
        return NextResponse.json(
            { error: "Failed to fetch gold price" },
            { status: 500 }
        );
    }
}