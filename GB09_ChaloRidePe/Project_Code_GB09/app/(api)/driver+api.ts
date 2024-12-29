import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(
      "postgresql://chaloridepe_owner:JB9zkfpK1XtZ@ep-curly-resonance-a19wn5oh.ap-southeast-1.aws.neon.tech/chaloridepe?sslmode=require"
    );

    const response = await sql(`SELECT * FROM drivers;`);

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
