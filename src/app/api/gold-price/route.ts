import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("http://www.thaigold.info/RealTimeDataV2/gtdata_.txt");
        const text = await response.text();
        
        // The data comes as a JSON array string, so we need to parse it
        const goldDataArray = JSON.parse(text);
        
        // Find the 99.99% gold price data
        const goldData = Array.isArray(goldDataArray) 
            ? goldDataArray.find(item => item?.name === "99.99%")
            : goldDataArray;

        if (goldData && typeof goldData.bid === 'number' && typeof goldData.ask === 'number') {
            return NextResponse.json({
                bid: goldData.bid,
                ask: goldData.ask,
                timestamp: new Date().toISOString()
            });
        }
        
        return NextResponse.json(
            { error: "Gold price data not found" },
            { status: 404 }
        );
    } catch (error) {
        console.error("Error fetching gold price:", error);
        return NextResponse.json(
            { error: "Failed to fetch gold price" },
            { status: 500 }
        );
    }
}