import PocketBase from "pocketbase";
const adminUsername = "dawitabrham0021@gmail.com";
const adminPassword = "Dawit0945557307";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function POST(req: Request) {
  const body = await req.json();
  let records: any = "";
  const { username, password } = body;
  await pb.admins.authWithPassword(adminUsername, adminPassword);
  const sql = `email="${username}"`;
  try {
    records = await pb.collection("file_uploader").getFirstListItem(sql);
  } catch (error) {
    records = "";
  }

  if (records) {
    if (records.password === password) {
      return new Response(JSON.stringify(records));
    } else {
      return new Response(JSON.stringify({ status: "fail" }));
    }
  } else {
    return new Response(JSON.stringify({ status: "fail" }));
  }
}
